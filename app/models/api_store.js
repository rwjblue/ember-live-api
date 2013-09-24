/**
 * Author: Stefan Penner
 * Secondary Author: Robert Jackson
 *
 * Original fully functional YUIDoc parser was written by Stefan Penner
 * any mistakes, errors, or complete butchering are attributed to Robert Jackson.
 */

import ApiClass from 'appkit/models/api_class';
import ajax from 'appkit/utils/ajax';

var FILE_MATCH, CLASS_MATCH, MODULE_MATCH, CLASS_ITEMS_MATCH, NOTHING;

NOTHING = /!^$/;
FILE_MATCH = /\w*(\/[^\s^#]+)/g;
CLASS_MATCH = /\b([A-Z][^\s^#]*)/g;
MODULE_MATCH = /::([^\s]+)/g;
CLASS_ITEMS_MATCH = /(:?!#)[^#^\s]+|\b[a-z][^#^\s/]+/g;

var isArray = $.isArray;
var isObject = $.isPlainObject;
var keys = Object.keys;

function makeArray(array){
  if (isArray(array)) {
    return array;
  } else {
    return [];
  }
}

function match(regex) {
  return function(value) {
    return regex.test(value);
  };
}

function extract(regex, string) {
  return (string.match(regex) || []).compact();
}

function splitOnWords(words) {
  var splits = words.match(/(:?[a-z]+)?[A-Z][a-z\#\d]+/g);

  if (splits) {
    return splits;
  } else {
    return [words];
  }
}

function compileParsedQuery(parsed) {
  var result, entry, regex, stringifiedEntry;

  result = {};

  for (var key in parsed) {
    if (parsed.hasOwnProperty(key)) {
      entry = parsed[key];

      if (entry) {

        stringifiedEntry = entry.map(function(entry){
          return splitOnWords(entry).join('.*');
        }).join('|');

        if (stringifiedEntry.length > 0) {
          regex = new RegExp(stringifiedEntry, 'i');
        } else {
          regex = NOTHING;
        }

      } else {
        regex = NOTHING;
      }

      result[key] = regex;
    }
  }

  return result;
}

function filter(index, collection, query) {
  return makeArray(index).
    filter(match(query)).
    map(function(className) {
      return collection[className];
  });
}

function filterClassItems(index, query){
  return makeArray(index).filter(function(classItem) {
    return query.test(classItem.name);
  });
}

function parseQuery(query) {
  var result, 
      files = [],
      classes = [],
      classitems = [],
      modules = [];

  if (query) {
    files = files.concat(extract(FILE_MATCH, query));
    query = query.replace(FILE_MATCH, ''); // remove files

    modules = modules.concat(extract(MODULE_MATCH, query));
    query = query.replace(MODULE_MATCH, ''); // remove modules

    classes = classes.concat(extract(CLASS_MATCH, query));

    classitems = classitems.concat(extract(CLASS_ITEMS_MATCH, query));
  }

  result = {
    files: files,
    modules: modules,
    classes: classes,
    classitems: classitems
  };

  return result;
}

var ApiStore = Ember.Object.extend({
  dataUrl: Ember.required(),
  isLoaded: false,

  init: function(){
    var self = this,
        url  = this.get('dataUrl'),
        data = this.get('data');

    if (!data && url)
      data = ajax(url, { dataType: 'json' })
                 .then(function(data){ self.calculateIndex(data); return data; })
                 .fail(Ember.RSVP.rethrow);

    this.set('data', data);
  },

  calculateIndex: function(data){
    var classes = this.getKeys(data, 'classes');

    this.set('modules', this.getKeys(data, 'modules'));
    this.set('files', this.getKeys(data, 'files'));

    this.set('classes', classes.filter(function(item){ return item.static === undefined; }));
    this.set('namespaces', classes.filter(function(item){ return item.static !== undefined; }));
  },

  getKeys: function(data, type){
    return Object.keys(data[type]).sort();
  },

  search: function(query) {
    var parsedQuery, compiledQuery, result, index, promises;

    result = {};

    if (!query) { return result; }

    parsedQuery = parseQuery(query);
    compiledQuery = compileParsedQuery(parsedQuery);

    promises = { data:     this.get('data'),
                 files:    this.get('files'),
                 modules:  this.get('modules'),
                 classes:  this.get('classes')};

    return Ember.RSVP.hash(promises).then(function(results){
      var classitems = results.data['classitems'];

      // TODO: merge the results
      result.files      = filter(results.files,   results.data.files,   compiledQuery.files     ).slice(0,10);
      result.modules    = filter(results.modules, results.data.modules, compiledQuery.modules   ).slice(0,10);
      result.classes    = filter(results.classes, results.data.classes, compiledQuery.classes   ).slice(0,10);
      result.classItems = filterClassItems(classitems,  compiledQuery.classitems).slice(0,30);

      return result;
    });
  },

  findItem: function(type, name) {
    var self = this,
        data = this.get('data');

    return data.then(function(data){
       return Ember.Object.create(data[type][name]);
    });
  },

  findClass: function(className){
    var self  = this,
        promises = {data: this.get('data'),
                    object: this.findItem('classes', className)};

    return Ember.RSVP.hash(promises).then(function(results){
      var classitems = results.data['classitems'].filterBy('class', className);

      results.object.set('classitems', classitems);

      return ApiClass.create({data: results.object, apiStore: self});
    });
  },

  findModule: function(moduleName){
    return this.findItem('modules', moduleName);
  },

  findNamespace: function(namespaceName){
    return this.findClass(namespaceName);
  }
});

export default ApiStore;

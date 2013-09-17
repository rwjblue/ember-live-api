/**
 * Author: Stefan Penner
 * Secondary Author: Robert Jackson
 *
 * Original fully functional YUIDoc parser was written by Stefan Penner
 * any mistakes, errors, or complete butchering are attributed to Robert Jackson.
 */

import ApiClass from 'appkit/models/api_class';

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
        promise;

    promise = Ember.$.getJSON(url).then(function(data){
      self.set('data', data);
      self.set('isLoaded', true);

      return data;
    });

    this.set('loading', promise);

    return promise;
  },

  getKeys: function(type){
    var data = this.get('data');

    return Object.keys(data[type]);
  },

  getValues: function(type){
    var keys = this.getKeys(type),
        data = this.get('data');

    return keys.map(function(item){
      return data[type][item];
    });
  },

  classitems: function(){
    return this.get('data')['classitems'];
  }.property('data'),


  files: function(){
    return this.getKeys('files').sort();
  }.property('data'),

  classes: function(){
    var classes = this.getValues('classes');

    classes = classes.filter(function(item){
      return item.static === undefined;
    });

    return classes.mapBy('name').sort();
  }.property('data'),

  modules: function(){
    return this.getKeys('modules').sort();
  }.property('data'),

  namespaces: function(){
    var classes = this.getValues('classes');

    classes = classes.filter(function(item){
      return item.static === 1;
    });

    return classes.mapBy('name').sort();
  }.property('data'),

  search: function(query) {
    var parsedQuery, compiledQuery, result, data, index;

    result = {};

    if (!query) { return result; }

    parsedQuery = parseQuery(query);
    compiledQuery = compileParsedQuery(parsedQuery);

    data = this.get('data');

    // TODO: merge the results
    result.files      = filter(this.files,   data.files,   compiledQuery.files     ).slice(0,10);
    result.modules    = filter(this.modules, data.modules, compiledQuery.modules   ).slice(0,10);
    result.classes    = filter(this.classes, data.classes, compiledQuery.classes   ).slice(0,10);
    result.classItems = filterClassItems(this.classitems,  compiledQuery.classitems).slice(0,30);

    return result;
  },

  findItem: function(type, name) {
    var self = this;
    return this.get('loading').then(function(){
      return self.get('data')[type][name];
    });
  },

  findClass: function(className){
    var self = this;

    return this.findItem('classes', className).then(function(klass){
      klass.classitems = self.get('classitems').filterBy('class',className);

      return ApiClass.create({data: klass, apiStore: self});
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

/**
 * Author: Stefan Penner
 * Secondary Author: Robert Jackson
 *
 * Original fully functional YUIDoc parser was written by Stefan Penner
 * any mistakes, errors, or complete butchering are attributed to Robert Jackson.
 */

var FILE_MATCH, CLASS_MATCH, MODULE_MATCH, CLASS_ITEMS_MATCH, NOTHING;

NOTHING = /!^$/;
FILE_MATCH = /\w*(\/[^\s^#]+)/gi;
CLASS_MATCH = /\b([A-Z][^\s^#]*)/gi;
MODULE_MATCH = /::([^\s]+)/gi;
CLASS_ITEMS_MATCH = /(:?!#)[^#^\s]+|\b[a-z][^#^\s/]+/gi;

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

        /* jshint -W083 */
        stringifiedEntry = entry.map(function(entry){
          return splitOnWords(entry).join('.*');
        }).join('|');
        /* jshint +W083 */

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

export default Ember.Object.extend({
  
  load: function(data) {
    this.calculateIndex(data);
    this.set('data', data);
  },

  calculateIndex: function(data){
    var classes = [],
        namespaces = [],
        classNames = this.getKeys(data, 'classes');

    this.set('files',   this.getKeys(data, 'files'));
    this.set('modules', this.getKeys(data, 'modules'));

    classNames.forEach(function(name){
      var item = data['classes'][name];

      if (item.static === undefined)
        classes.pushObject(name);
      else
        namespaces.pushObject(name);
    });

    this.set('classes', classes);
    this.set('namespaces', namespaces);
  },

  getKeys: function(data, type){
    return Object.keys(data[type]).sort();
  },

  search: function(query) {
    var self = this,
        parsedQuery, compiledQuery, result, index, promises;

    result = {};

    if (!query) { return result; }

    parsedQuery = parseQuery(query);
    compiledQuery = compileParsedQuery(parsedQuery);

    var results = { data:     this.get('data'),
                    files:    this.get('files'),
                    modules:  this.get('modules'),
                    classes:  this.get('classes') };

    
      var classitems = results.data['classitems'];

      // TODO: merge the results
      result.files      = filter(results.files,   results.data.files,   compiledQuery.files     ).slice(0,10);
      result.modules    = filter(results.modules, results.data.modules, compiledQuery.modules   ).slice(0,10);
      result.classes    = filter(results.classes, results.data.classes, compiledQuery.classes   ).slice(0,10);
      result.classItems = filterClassItems(classitems,  compiledQuery.classitems).slice(0,30);

      self.set('searchResults', result);

      return result;
  },

  buildItem: function(type, name, data) {
    var fullName = 'model:' + type.singularize();
    var model = this.container.lookup(fullName);
    return model.setProperties({ store: this, data: data });
  },

  // Finder Methods

  findItem: function(type, name) {
    if (!name) return;
    var itemData = this.get('data')[type][name];
    return this.buildItem(type, name, itemData);
  },

  findClass: function(className) {
    return this.findItem('classes', className);
  },

  findOwnClassitems: function(className) {
    var store = this,
        data = this.get('data');

    return data.classitems.filterBy('class', className).map(function(classitemData) {
      var classitemFullName = className + '#' + classitemData.name;
      return store.buildItem('classitems', classitemFullName, classitemData);
    });
  },

  findModule: function(moduleName){
    return this.findItem('modules', moduleName);
  },

  findNamespace: function(namespaceName){
    return this.findClass(namespaceName);
  }
});

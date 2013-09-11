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

var ApiSearch = Ember.Object.extend({
  dataUrl: null,
  load: function(){
    var self = this;

    Ember.$.getJSON(this.get('dataUrl'), function(data){
      self.set('data', data);
    });
  }.observes('dataUrl').on('init'),

  index: function() {
    var result = {}, 
        data   = this.get('data'),
        entry;

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        entry = data[key];

        if (isArray(entry)) {
          result[key] = entry;
        } else if (isObject(entry)) {
          result[key] = keys(entry);
        } else {

        }
      }
    }

    return result;
  }.property('data'),
  search: function(query) {
    var parsedQuery, compiledQuery, result, data, index;

    result = {};

    if (!query) { return result; }

    parsedQuery = parseQuery(query);
    compiledQuery = compileParsedQuery(parsedQuery);

    data = this.get('data');
    index = this.get('index');

    // TODO: merge the results
    result.files      = filter(index.files,   data.files,   compiledQuery.files     ).slice(0,10);
    result.modules    = filter(index.modules, data.modules, compiledQuery.modules   ).slice(0,10);
    result.classes    = filter(index.classes, data.classes, compiledQuery.classes   ).slice(0,10);
    result.classItems = filterClassItems(index.classitems,  compiledQuery.classitems).slice(0,30);

    return result;
  }
});

export default ApiSearch;

/* Sample class from YUIDoc output.
 *
        "Ember.ControllerMixin": {
            "name": "Ember.ControllerMixin",
            "shortname": "Ember.ControllerMixin",
            "classitems": [],
            "plugins": [],
            "extensions": [],
            "plugin_for": [],
            "extension_for": [
                "Ember.ArrayController",
                "Ember.Controller",
                "Ember.ObjectController"
            ],
            "module": "ember",
            "submodule": "ember-views",
            "namespace": "Ember",
            "file": "../packages/ember-views/lib/system/controller.js",
            "line": 11,
            "description": "Additional methods for the ControllerMixin"
        }
*/
var ApiClass = Ember.Object.extend({
  name:           Em.computed.alias('data.name'),
  shortname:      Em.computed.alias('data.shortname'),
  classitems:     Em.computed.alias('data.classitems'),
  plugins:        Em.computed.alias('data.plugins'),
  extensions:     Em.computed.alias('data.extensions'),
  extension_for:  Em.computed.alias('data.extension_for'),
  module:         Em.computed.alias('data.module'),
  submodule:      Em.computed.alias('data.submodule'),
  namespace:      Em.computed.alias('data.namespace'),
  file:           Em.computed.alias('data.file'),
  line:           Em.computed.alias('data.line'),
  description:    Em.computed.alias('data.description'),
  static:         Em.computed.alias('data.static'),
  deprecated:     Em.computed.alias('data.deprecated'),
  access:         Em.computed.alias('data.access'),

  sortBy: ['name'],

  filterClassitemsByType: function(type){
    var classitems = this.get('classitems').filterBy('itemtype',type);

    return this.sortClassitemsByName(classitems);
  },

  sortClassitemsByName: function(classitems){
    function sortByName(a, b) {
        return a.name > b.name ? 1 : -1;
    }

    return classitems.sort(sortByName);
  },

  methods: function(){
    return this.filterClassitemsByType('method');
  }.property('classitems.@each'),

  properties: function(){
    return this.filterClassitemsByType('property');
  }.property('classitems.@each'),

  events: function(){
    return this.filterClassitemsByType('event');
  }.property('classitems.@each'),


  findClass: function(className){
    return this.get('apiStore').findClass(className);
  }
});

export default ApiClass;

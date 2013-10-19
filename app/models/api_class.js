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
var ApiClass = Ember.ObjectProxy.extend({
  content:        Em.computed.alias('data'),
  className:      Em.computed.alias('name'),

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

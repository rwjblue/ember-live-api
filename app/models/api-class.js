import Model from 'appkit/api-store/model';
import { getClass, getClasses, getModule, getOwnClassitems, getProject } from 'appkit/api-store/helpers';

var alias = Ember.computed.alias,
    empty = Ember.computed.empty,
    notEmpty = Ember.computed.notEmpty;

export default Model.extend({
  className:      alias('data.name'),
  name:           alias('data.name'),
  file:           alias('data.file'),
  line:           alias('data.line'),
  description:    alias('data.description'),

  project:        getProject(),

  module:         getModule('data.module'),
  submodule:      getModule('data.submodule'),
  extends:        getClass('data.extends'),
  uses:           getClasses('data.uses'),

  ownClassitems:  getOwnClassitems('data.name'),

  allClassitems: function() {
    var ownClassitems = this.get('ownClassitems');

    if (this.get('extends')) {
      var parentClassitems = this.get('extends.allClassitems');

      // Hide overriden methods
      var newClassitems = parentClassitems.filter(function(classitem) {
        return !ownClassitems.findBy('name', classitem.get('name'));
      });
      
      return ownClassitems.concat(newClassitems);
    } else {
      return ownClassitems;
    }
  }.property('ownClassitems', 'extends.allClassitems'),

  isNamespace:    notEmpty('data.static'),
  isClass:        empty('data.static')
});

import Model from 'appkit/api-store/model';
import { getClass, getClasses, getModule, getOwnClassitems, getProject } from 'appkit/api-store/helpers';

var alias = Ember.computed.alias,
    empty = Ember.computed.empty,
    notEmpty = Ember.computed.notEmpty,
    keys = Ember.keys;

function mergeClassitemsRecursively(hierarchy, _class, classMixedInto, rootMixin) {
  var _extends = _class.get('extends'),
      uses = _class.get('uses'),
      ownClassitems = _class.get('ownClassitems');

  if (_extends) {
    mergeClassitemsRecursively(hierarchy, _extends);
  }

  if (Ember.isArray(uses)) {
    uses.forEach(function (mixin) {
      mergeClassitemsRecursively(hierarchy, mixin, classMixedInto || _class, rootMixin || mixin);
    });
  }

  if (Ember.isArray(ownClassitems)) {
    ownClassitems.forEach(function (classitem) {
      // The '&' is a hack to avoid collisions with
      // default properties eg. toString
      var name = '&' + classitem.get('name'),
          _className = classitem.get('class.name'),
          items = hierarchy[name] || [];

      if (classMixedInto) {
        // The mixin hierarchy may be too complicated to display in the
        // docs so just keep track of the most recent definition.
        var previouslyMixedIn = items.find(function(item) {
          return item.rootMixin === rootMixin && 
                 item.classMixedInto === classMixedInto;
        });

        if (previouslyMixedIn) {
          previouslyMixedIn.classitem = classitem;
        } else {
          items.push({classitem: classitem, classMixedInto: classMixedInto, rootMixin: rootMixin});
        }
      } else {
        items.push({classitem: classitem});
      }

      hierarchy[name] = items;
    });
  }  
}

export default Model.extend({
  project:        getProject(),

  className:      alias('data.name'),
  name:           alias('data.name'),
  file:           alias('data.file'),
  line:           alias('data.line'),
  description:    alias('data.description'),

  module:         getModule('data.module'),
  submodule:      getModule('data.submodule'),
  extends:        getClass('data.extends'),
  uses:           getClasses('data.uses'),

  ownClassitems:  getOwnClassitems('data.name'),
  isNamespace:    notEmpty('data.static'),
  isClass:        empty('data.static'),

  classitemHierarchy: function() {
    var hierarchy = {};
    mergeClassitemsRecursively(hierarchy, this);
    return keys(hierarchy).map(function(key) {
      return hierarchy[key];
    });
  }.property('ownClassitems', 'extends', 'uses.[]')
});

import Model from 'appkit/api-store/model';
import { getModule, getClasses, getModules } from 'appkit/api-store/helpers';

var alias = Ember.computed.alias;

export default Model.extend({
  isModule:       true,

  name:           alias('data.name'),
  description:    alias('data.description'),
  file:           alias('data.file'),
  line:           alias('data.line'),
  requires:       alias('data.requires'),
  parent:         getModule('data.module'),
  classes:        getClasses('classNames'),
  submodules:     getModules('submoduleNames'),

  classNames: function() {
    return Ember.keys(this.get('data.classes'));
  }.property('data.classes'),

  submoduleNames: function() {
    return Ember.keys(this.get('data.submodules'));
  }.property('data.submodules'),

});

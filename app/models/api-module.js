import Model from 'appkit/api-store/model';
import { getModule } from 'appkit/api-store/helpers';

var alias = Ember.computed.alias;

export default Model.extend({
  isModule:       true,

  name:           alias('data.name'),
  description:    alias('data.description'),
  file:           alias('data.file'),
  line:           alias('data.line'),
  requires:       alias('data.requires'),
  parent:         getModule('data.module'),

  classes: function() {
    var _this = this;

    return Object.keys(this.get('data.classes')).map(function(className) {
      return _this.store.findClass(className);
    });
  }.property('data.classes'),

  submodules: function() {
    var _this = this;

    return Object.keys(this.get('data.submodules')).map(function(name) {
      return _this.store.findModule(name);
    });
  }.property('data.submodules')

});

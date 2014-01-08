import Model from 'appkit/api-store/model';

var alias = Ember.computed.alias;

export default Model.extend({
  file:           alias('data.file'),
  line:           alias('data.line'),
  description:    alias('data.description'),
  itemtype:       alias('data.itemtype'),
  name:           alias('data.name'),
  class:          alias('data.class'),
  access:         alias('data.access'),
  deprecated:     alias('data.deprecated'),

  params:         alias('data.params')
});

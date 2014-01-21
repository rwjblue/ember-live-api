import Model from 'appkit/api-store/model';

var alias = Ember.computed.alias;

export default Model.extend({
  name:           alias('data.name'),
  description:    alias('data.description'),
  file:           alias('data.file'),
  line:           alias('data.line')
});

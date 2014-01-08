import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var alias = Ember.computed.alias;

export default Ember.Component.extend(ItemUrlMixin, ItemClassesMixin, {
  type:                  alias('model.data.itemtype'),
  name:                  alias('model.data.name'),
  params:                alias('model.data.params'),
  returnType:            alias('model.data.return.type'),
  returnDescription:     alias('model.data.return.description'),
  deprecated:            alias('model.data.deprecated'),
  access:                alias('model.data.access'),
  final:                 alias('model.data.final'),
  static:                alias('model.data.static'),
  optional:              alias('model.data.optional'),
  required:              alias('model.data.required'),
  overwrittenFromClass:  alias('model.data.overwritten_from.class'),
  file:                  alias('model.data.file'),
  extendedFrom:          alias('model.data.extended_from'),
  since:                 alias('model.data.since'),
  description:           alias('model.data.description'),
  default:               alias('model.data.default'),
  example:               alias('model.data.example'),

  additionalItemClasses: 'item-entry',

  paramsListing: function(){
    var params = this.get('params');

    if (!params || params.length === 0)
      return;

    return params.mapBy('name').join(', ');
  }.property('params'),
});

import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var alias = Ember.computed.alias;

var ClassItemDetailComponent = Ember.Component.extend(ItemUrlMixin, ItemClassesMixin, {
  content:               alias('item'),
  type:                  alias('item.itemtype'),
  name:                  alias('item.name'),
  params:                alias('item.params'),
  returnType:            alias('item.return.type'),
  returnDescription:     alias('item.return.description'),
  deprecated:            alias('item.deprecated'),
  access:                alias('item.access'),
  final:                 alias('item.final'),
  static:                alias('item.static'),
  optional:              alias('item.optional'),
  required:              alias('item.required'),
  overwrittenFromClass:  alias('item.overwritten_from.class'),
  file:                  alias('item.file'),
  extendedFrom:          alias('item.extended_from'),
  since:                 alias('item.since'),
  description:           alias('item.description'),
  default:               alias('item.default'),
  example:               alias('item.example'),

  additionalItemClasses: 'item-entry',

  paramsListing: function(){
    var params = this.get('params');

    if (!params || params.length === 0)
      return;

    return params.mapBy('name').join(', ');
  }.property('params'),
});

export default ClassItemDetailComponent;

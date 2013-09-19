import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var ClassItemDetailComponent = Ember.Component.extend(ItemUrlMixin, ItemClassesMixin, {
  content:               Em.computed.alias('item'),
  type:                  Em.computed.alias('item.itemtype'),
  name:                  Em.computed.alias('item.name'),
  params:                Em.computed.alias('item.params'),
  returnType:            Em.computed.alias('item.return.type'),
  returnDescription:     Em.computed.alias('item.return.description'),
  deprecated:            Em.computed.alias('item.deprecated'),
  access:                Em.computed.alias('item.access'),
  final:                 Em.computed.alias('item.final'),
  static:                Em.computed.alias('item.static'),
  optional:              Em.computed.alias('item.optional'),
  required:              Em.computed.alias('item.required'),
  overwrittenFromClass:  Em.computed.alias('item.overwritten_from.class'),
  file:                  Em.computed.alias('item.file'),
  extendedFrom:          Em.computed.alias('item.extended_from'),
  since:                 Em.computed.alias('item.since'),
  description:           Em.computed.alias('item.description'),
  default:               Em.computed.alias('item.default'),
  example:               Em.computed.alias('item.example'),

  additionalItemClasses: 'item-entry',

  paramsListing: function(){
    var params = this.get('params');

    if (!params || params.length === 0)
      return;

    return params.mapBy('name').join(', ');
  }.property('params'),
});

export default ClassItemDetailComponent;

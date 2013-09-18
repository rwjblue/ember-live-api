import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var ClassItemDetailComponent = Ember.Component.extend(ItemUrlMixin, ItemClassesMixin, {
  content: Em.computed.alias('item'),
  type: Em.computed.alias('item.itemtype'),
  name: Em.computed.alias('item.name'),
  additionalItemClasses: 'item-entry',

});

export default ClassItemDetailComponent;

import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var ClassitemListingController = Ember.ObjectController.extend(ItemUrlMixin, ItemClassesMixin, {
  type: Em.computed.alias('itemtype')
});

export default ClassitemListingController;

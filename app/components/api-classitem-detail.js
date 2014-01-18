import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var alias = Ember.computed.alias;

export default Ember.Component.extend(ItemUrlMixin, ItemClassesMixin, {
  overwrittenFromClass:  alias('data.overwritten_from.class'),
  file:                  alias('data.file'),
  extendedFrom:          alias('data.extended_from'),

  additionalItemClasses: 'item-entry',

  paramsListing: function() {
    var params = this.get('model.params');

    if (!params || params.length === 0)
      return;

    return params.mapBy('name').join(', ');
  }.property('model.params')
});

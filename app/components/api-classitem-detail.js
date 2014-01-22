import ItemUrlMixin from 'appkit/mixins/item_url';
import ItemClassesMixin from 'appkit/mixins/item_classes';

var alias = Ember.computed.alias;

export default Ember.Component.extend(ItemUrlMixin, ItemClassesMixin, {
  additionalItemClasses: 'item-entry',

  mostRecentAncestor: function() {
    return this.get('ancestry.lastObject');
  }.property('ancestry'),

  laterAncestors: function() {
    return this.get('ancestry').slice(0, -1).reverse();
  }.property('ancestry'),

  isInherited: function() {
    var ancestor = this.get('mostRecentAncestor');
    var _class = ancestor.classMixedInto ? ancestor.classMixedInto : ancestor.classitem.get('class');
    return _class.get('name') !== this.get('apiClass.name');
  }.property('mostRecentAncestor', 'apiClass'),

  classitem: alias('mostRecentAncestor.classitem'),

  paramsListing: function() {
    var params = this.get('classitem.params');

    if (!params || params.length === 0)
      return;

    return params.mapBy('name').join(', ');
  }.property('classitem.params')
});

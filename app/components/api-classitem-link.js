export default Ember.Component.extend({
  tagName: 'span',

  route: function() {
    return this.get('model.itemtype').pluralize() + '.show';
  }.property('model.itemtype')
});

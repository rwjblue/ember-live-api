export default Ember.Controller.extend({
  queryDidChange: function() {
    if (this.get('currentPath') !== 'index') {
      this.transitionToRoute('index');
    }
    Ember.run.throttle(this, this.search, 100, true);
  }.observes('query'),

  search: function() {
    var store = this.get('store'),
        query = this.get('query');

    this.set('searchResults', store.search(query));
  }
});
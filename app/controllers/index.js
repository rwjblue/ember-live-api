var IndexController = Ember.ObjectController.extend({
  query: null,
  timer: null,
  lastQuery: null,
  search: function(){
    var query     = this.get('query'),
        timer     = this.get('timer'),
        lastQuery = this.get('lastQuery'),
        apiSearch = this.get('model');

    if (lastQuery === query) {
      return;
    } else {
      this.set('lastQuery', query);
    }

    Ember.run.cancel(timer);

    timer = Ember.run.later(this, function(){
      this.set('searchResults', apiSearch.search(query));
    }, 50);

    this.set('timer', timer);
  }.observes('query'),
});

export default IndexController;

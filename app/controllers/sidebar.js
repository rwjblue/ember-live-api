var SidebarController = Ember.ObjectController.extend({
  content: function(){
    return this.get('api.index');
  }.property('api.index'),

  query: null,
  timer: null,
  lastQuery: null,
  search: function(){
    var query     = this.get('query'),
        timer     = this.get('timer'),
        lastQuery = this.get('lastQuery'),
        api       = this.get('api');

    if (lastQuery === query) {
      return;
    } else {
      this.set('lastQuery', query);
    }

    Ember.run.cancel(timer);

    timer = Ember.run.later(this, function(){
      this.set('searchResults', api.search(query));
    }, 50);

    this.set('timer', timer);
  }.observes('query')
});

export default SidebarController;

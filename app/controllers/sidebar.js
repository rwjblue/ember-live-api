var SidebarController = Ember.ObjectController.extend({
  query: null,
  timer: null,
  lastQuery: null,

  isSearching: function(){
    var query = this.get('query');

    if (query && query.length > 0) 
      return true;
    else
      return false;

  }.property('query'),

  content: function(){
    return this.get('api.index');
  }.property('api.index'),

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

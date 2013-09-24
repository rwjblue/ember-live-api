var SidebarController = Ember.ObjectController.extend({
  query: null,
  lastQuery: null,
  isLoaded: Ember.computed.bool('apiStore.data'),

  isSearching: function(){
    var query = this.get('query');

    if (query && query.length > 0) {
      return true;
    } else {
      return false;
    }

  }.property('query').readOnly(),

  content: Ember.computed.alias('apiStore').readOnly(),

  search: function(){
    var query     = this.get('query'),
        lastQuery = this.get('lastQuery'),
        apiStore  = this.get('apiStore');

    if (lastQuery === query) {
      return;
    } else {
      this.set('lastQuery', query);
    }

    Ember.run.debounce(this, function(){
      this.set('searchResults', apiStore.search(query));
    }, 50);

  }.observes('query')
});

export default SidebarController;

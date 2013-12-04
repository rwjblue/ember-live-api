export default Ember.ObjectController.extend({
  query:        null,
  lastQuery:    null,
  isLoaded:     Em.computed.bool('apiStore.data'),
  isSearching:  Em.computed.notEmpty('query').readOnly(),
  content:      Em.computed.alias('apiStore').readOnly(),

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
      apiStore.search(query);
    }, 50);

  }.observes('query')
});

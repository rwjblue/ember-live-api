import { getClasses, getModules } from 'appkit/api-store/helpers';

export default Ember.ObjectController.extend({
  query:        null,
  lastQuery:    null,
  isLoaded:     Em.computed.bool('store.data'),
  isSearching:  Em.computed.notEmpty('query').readOnly(),
  // content:      Em.computed.alias('store').readOnly(),

  modules: getModules(),

  unfilteredClasses: getClasses(),

  classes: function() {
    var classes = this.get('unfilteredClasses');
    return classes.filterBy('isClass').sortBy('name');
  }.property('unfilteredClasses.[]'),

  namespaces: function() {
    var namespaces = this.get('unfilteredClasses');
    return namespaces.filterBy('isNamespace').sortBy('name');
  }.property('unfilteredClasses.[]'),

  search: function() {
    var query     = this.get('query'),
        lastQuery = this.get('lastQuery'),
        store  = this.get('store');

    if (lastQuery === query) {
      return;
    } else {
      this.set('lastQuery', query);
    }

    Ember.run.debounce(this, function(){
      store.search(query);
    }, 50);

  }.observes('query')
});

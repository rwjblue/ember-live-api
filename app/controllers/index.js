var alias = Ember.computed.alias;

export default Ember.Controller.extend({
  needs: ['application'],
  
  query: alias('controllers.application.query'),
  searchResults: alias('controllers.application.searchResults'),
});
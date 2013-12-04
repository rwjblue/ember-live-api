export default Ember.Route.extend({
  model: function(params){
    var apiStore = this.get('apiStore');

    return apiStore.findClass(params.className);
  }
});

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findModule(params.moduleName);
  }
});

var ClassRoute = Ember.Route.extend({
  redirect: function(model){
    this.transitionTo('class.all', model.get('name'));
  },

  model: function(params){
    var apiStore = this.get('apiStore');

    return apiStore.findClass(params.className);
  }
});

export default ClassRoute;

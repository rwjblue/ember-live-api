var ClassMethodsRoute = Ember.Route.extend({
  model: function(params){
    return this.modelFor('class');
  }
});

export default ClassMethodsRoute;


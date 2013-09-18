var ClassIndexRoute = Ember.Route.extend({
  redirect: function(model){
    this.transitionTo('class.all', model.get('name'));
  },

  model: function(params){
    return this.modelFor('class');
  }
});

export default ClassIndexRoute;

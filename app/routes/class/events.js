var ClassEventsRoute = Ember.Route.extend({
  model: function(params){
    return this.modelFor('class');
  }
});

export default ClassEventsRoute;



var ClassesShowRoute = Ember.Route.extend({
  model: function(params){
    return this.get('apiStore.index').classes[params.className];
  }
});

export default ClassesShowRoute;

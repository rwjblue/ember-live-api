
var ClassesShowRoute = Ember.Route.extend({
  model: function(params){
    return this.get('api').classes[params.class_name];
  }
});

export default ClassesShowRoute;

export default Ember.Route.extend({
  controllerName: 'class',
  
  model: function(params){
    return this.modelFor('class');
  }
});

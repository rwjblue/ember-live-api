
var ClassesShowRoute = Ember.Route.extend({
  model: function(params){
    var apiStore = this.get('apiStore');

    return apiStore.findClass(params.className);
  }
});

export default ClassesShowRoute;

var ClassesShowController = Ember.ObjectController.extend({
  accessUpcase: function(){
    return this.get('access').toUpperCase();
  }.property('access')
});

export default ClassesShowController;

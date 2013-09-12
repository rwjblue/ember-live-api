var router = Ember.Router.map(function(){
  this.resource('classes', function() {
    this.route('show', {path: '/:class_name'});
  });
});

export default router;

var router = Ember.Router.map(function(){
  this.resource('classes', function() {
    this.route('show', {path: '/:className'});
  });
});

export default router;

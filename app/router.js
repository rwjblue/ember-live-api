var router = Ember.Router.map(function(){
  this.resource('classes', function() {
    this.route('show', {path: '/:className'});
  });

  this.resource('modules', function() {
    this.route('show', {path: '/:moduleName'});
  });
});

export default router;

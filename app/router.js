var router = Ember.Router.map(function(){
  this.resource('class', {path: '/classes/:className'}, function() {
    this.route('all');
    this.route('methods');
    this.route('properties');
  });

  this.resource('modules', function() {
    this.route('show', {path: '/:moduleName'});
  });
});

export default router;

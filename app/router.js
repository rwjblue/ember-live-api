var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('class', {path: 'api/classes/:className'}, function() {
    this.resource('methods', function() {
      this.route('show', {path: '/:methodName'});
    });
    this.resource('properties', function() {
      this.route('show', {path: '/:propertyName'});
    });
    this.resource('events', function() {
      this.route('show', {path: '/:eventName'});
    });
  });

  this.resource('modules', function() {
    this.route('show', {path: '/:moduleName'});
  });
});

Router.reopen({
  location: 'history'
});

export default Router;

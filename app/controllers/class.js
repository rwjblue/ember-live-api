var ClassController = Ember.ObjectController.extend({
  needs: ['application'],

  accessUpcase: function(){
    return this.get('access').toUpperCase();
  }.property('access'),

  typesPresent: function(){
    return this.get('methodsPresent') ||
           this.get('propertiesPresent') ||
           this.get('eventsPresent');
  }.property('methods', 'properties', 'events'),

  methodsPresent: function(){
    return this.get('methods').length > 0;
  }.property('methods'),

  propertiesPresent: function(){
    return this.get('properties').length > 0;
  }.property('properties'),

  eventsPresent: function(){
    return this.get('events').length > 0;
  }.property('events'),

  currentRouteName: function(){
    return this.get('controllers.application.currentRouteName');
  }.property('controllers.application.currentRouteName'),

  isAllRoute: function(){
    return this.isActive('all');
  }.property('currentRouteName'),

  isMethodsRoute: function(){
    return this.isActive('methods');
  }.property('currentRouteName'),

  isPropertiesRoute: function(){
    return this.isActive('properties');
  }.property('currentRouteName'),

  isEventsRoute: function(){
    return this.isActive('events');
  }.property('currentRouteName'),

  isActive: function(subroute){
    return this.get('currentRouteName').indexOf('class.' + subroute) !== -1;
  }
});

export default ClassController;

var alias = Ember.computed.alias;
var notEmpty = Ember.computed.notEmpty;

export default Ember.ObjectController.extend({
  needs: ['application'],
  application: alias('controllers.application'),
  currentRouteName: alias('application.currentRouteName'),

  accessUpcase: function(){
    return this.get('access').toUpperCase();
  }.property('access'),

  typesPresent: function(){
    return this.get('methodsPresent') ||
           this.get('propertiesPresent') ||
           this.get('eventsPresent');
  }.property('methods', 'properties', 'events'),

  methodsPresent: notEmpty('methods.[]'),
  propertiesPresent: notEmpty('properties.[]'),
  eventsPresent: notEmpty('events.[]'),

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

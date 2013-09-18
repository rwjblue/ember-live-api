var ClassController = Ember.ObjectController.extend({
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
  }.property('events')
});

export default ClassController;

var ClassesShowController = Ember.ObjectController.extend({
  accessUpcase: function(){
    return this.get('access').toUpperCase();
  }.property('access'),

  typesPresent: function(){
    return this.get('types').length > 0;
  }.property('types'),

  types: function(){
    var availableTypes = [];

    if (this.get('methodsPresent'))
      availableTypes.push('Methods');

    if (this.get('propertiesPresent'))
      availableTypes.push('Properties');

    if (this.get('eventsPresent'))
      availableTypes.push('Events');

    return availableTypes;
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

export default ClassesShowController;

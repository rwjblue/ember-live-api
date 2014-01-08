var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;

export default Ember.ObjectController.extend({
  showInherited: true,
  showProtected: false,
  showPrivate: false,
  showDeprecated: true,

  filteredClassitems: function() {
    var prefix         = this.get('showInherited') ? 'all' : 'own',
        classitems     = this.get(prefix + 'Classitems'),
        showPrivate    = this.get('showPrivate'),
        showProtected  = this.get('showProtected'),
        showDeprecated = this.get('showDeprecated');

    return classitems.filter(function(classitem) {
      var access = classitem.get('access'),
          deprecated = classitem.get('deprecated');

      if (!showPrivate && access === 'private') return false;
      if (!showProtected && access === 'protected') return false;
      if (!showDeprecated && deprecated === true) return false;
      return true;
    }).sortBy('name');
  }.property('content', 'showInherited', 'showPrivate', 'showProtected', 'showDeprecated'),

  filteredMethods:       filterBy('filteredClassitems', 'itemtype', 'method'),
  filteredProperties:    filterBy('filteredClassitems', 'itemtype', 'property'),
  filteredEvents:        filterBy('filteredClassitems', 'itemtype', 'event'),

  hasClassitems:         notEmpty('filteredClassitems.[]'),
  hasFilteredMethods:    notEmpty('filteredMethods.[]'),
  hasFilteredProperties: notEmpty('filteredProperties.[]'),
  hasFilteredEvents:     notEmpty('filteredEvents.[]'),


/*


  needs: ['application'],
  application: alias('controllers.application'),
  currentRouteName: alias('application.currentRouteName'),

  accessUpcase: function(){
    return this.get('access').toUpperCase();
  }.property('access'),

  typesPresent: function() {
    return true;
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
  */
});

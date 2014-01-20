var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;

export default Ember.ObjectController.extend({
  showInherited: false,
  showProtected: false,
  showPrivate: false,
  showDeprecated: true,

  filteredClassitemsAncestry: function() {
    var hierarchy = this.get('classitemHierarchy'),
        showInherited = this.get('showInherited'),
        showPrivate = this.get('showPrivate'),
        showProtected = this.get('showProtected'),
        showDeprecated = this.get('showDeprecated'),
        _class = this;

    return hierarchy.filter(function(classitemAncestry) {
      var classitem = classitemAncestry.get('lastObject.classitem'),
          className = classitem.get('class.name'),
          access = classitem.get('access'),
          deprecated = classitem.get('deprecated');

      if (!showInherited && className !== _class.get('name')) return false;
      if (!showPrivate && access === 'private') return false;
      if (!showProtected && access === 'protected') return false;
      if (!showDeprecated && deprecated === true) return false;
      return true;
    }).sortBy('classitem.name');
  }.property('content', 'showInherited', 'showPrivate', 'showProtected', 'showDeprecated'),

  filteredMethods:       filterBy('filteredClassitemsAncestry', 'firstObject.classitem.itemtype', 'method'),
  filteredProperties:    filterBy('filteredClassitemsAncestry', 'firstObject.classitem.itemtype', 'property'),
  filteredEvents:        filterBy('filteredClassitemsAncestry', 'firstObject.classitem.itemtype', 'event'),

  hasClassitems:         notEmpty('filteredClassitemsAncestry.[]'),
  hasFilteredMethods:    notEmpty('filteredMethods.[]'),
  hasFilteredProperties: notEmpty('filteredProperties.[]'),
  hasFilteredEvents:     notEmpty('filteredEvents.[]'),

  accessUpcase: function(){
    return this.get('access').toUpperCase();
  }.property('access')
});

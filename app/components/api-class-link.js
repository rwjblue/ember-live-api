var ApiClassLink = Ember.Component.extend({
  className: Ember.required('must supply the className to look for'),
  apiStore:  Ember.required('must supply the apiStore to use for class lookups.'),

  referenceClass: function(){
    var apiStore  = this.get('apiStore'),
        className = this.get('className');

    return apiStore.findClass(className);
  }.property('className', 'apiStore'),

  found: function(){
    return !!this.get('referenceClass');
  }.property('referenceClass')
});

export default ApiClassLink;

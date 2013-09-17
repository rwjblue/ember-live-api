var ApiModuleLink = Ember.Component.extend({
  tagName: 'span',
  moduleName: Ember.required('must supply the moduleName to look for'),
  apiStore:  Ember.required('must supply the apiStore to use for class lookups.'),

  referenceModule: function(){
    var apiStore  = this.get('apiStore'),
        moduleName = this.get('moduleName');

    return apiStore.findModule(moduleName);
  }.property('moduleName', 'apiStore'),

  found: function(){
    return !!this.get('referenceModule');
  }.property('referenceModule'),

  title: function(){
    return this.get('moduleName');
  }.property('moduleName')
});

export default ApiModuleLink;


var ApiClass = Ember.Object.extend({
  filterClassitemsByType: function(type){
    return this.get('classitems').filterBy('itemtype',type);
  },

  classitems: function(){
    return this.get('data').classitems;
  }.property('data','data.classitems.@each'),

  methods: function(){
    return this.filterClassitemsByType('method');
  }.property('classitems'),

  properties: function(){
    return this.filterClassitemsByType('property');
  }.property('classitems')
});

export default ApiClass;

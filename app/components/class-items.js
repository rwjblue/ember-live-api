var ClassItemsComponent = Ember.Component.extend({
  classitems: Em.required('must supply classitems'),

  type: function(){
    var classitem = this.get('classitems.firstObject');

    return classitem['itemtype'];
  }.property('classitems.firstObject'),

  typeTitle: function(){
    switch(this.get('type')){
      case 'method': return 'Methods';
      case 'property': return 'Properties';
      case 'event': return 'Events';
    }
  }.property('classitems'),

  present: function(){
    var count = this.get('classitems').length;

    return count > 0;
  }.property('classitems')
});

export default ClassItemsComponent;

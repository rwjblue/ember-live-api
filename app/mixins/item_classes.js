var ItemClassesMixin = Ember.Mixin.create({
  classes: function(){
    var classes               = [],
        item                  = this.get('content'),
        additionalItemClasses = this.get('additionalItemClasses');

    classes.push(item['itemtype']);
    classes.push(item['access']);

    if (item['deprecated'])
      classes.push('deprecated');

    if (item['inherited'])
      classes.push('inherited');

    if (additionalItemClasses)
      classes.push(additionalItemClasses);

    return classes.join(' ');
  }.property('content')
});

export default ItemClassesMixin;

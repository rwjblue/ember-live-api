var ClassitemListingController = Ember.ObjectController.extend({
  sanitize: function(url){
    return url.replace(/[^a-z0-9_-]+/i, '_');
  },

  url: function(){
      var type = this.get('itemtype'),
          name = this.get('name');

    return this.sanitize(type + '_' + name);
  }.property('type'),

  classes: function(){
    var method  = this.get('content'),
        classes = [];

    classes.push(method['access']);

    if (method['deprecated'])
      classes.push('deprecated');

    if (method['inherited'])
      classes.push('inherited');
    
  }.property('content')
});

export default ClassitemListingController;

var ItemUrlMixin = Ember.Mixin.create({
  sanitize: function(url){
    return url.replace(/[^a-z0-9_-]+/i, '_');
  },

  itemId: function(){
    var type = this.get('type'),
        name = this.get('name');

    return this.sanitize(type + '_' + name);
  }.property('name', 'type'),

  url: function(){
    return this.get('itemId');
  }.property('type','name'),
});

export default ItemUrlMixin;

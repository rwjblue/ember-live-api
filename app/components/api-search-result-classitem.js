export default Ember.Component.extend({
  classNames: "search-result-classitem",
  
  hasParams: Ember.computed.notEmpty('model.params'),

  paramsString: function() {
    var params = this.get('model.params');
    return '(' + params.mapBy('name').join(', ') + ')';
  }.property('model.params'),

  highlightedName: function() {
    if (!this.get('query')) return this.get('model.name');
    var highlightedName = this.get('model.name') || "";
    var queries = this.get('query').split(' ');
    for (var i = 0; i < queries.length; i++) {
      var query = queries[i];
      var re = new RegExp('(' + query + ')', 'i');
      highlightedName = highlightedName.replace(re, '<span style="font-weight: bold;">$1</span>');
    }
    return new Ember.Handlebars.SafeString(highlightedName);
  }.property('model.name')
});
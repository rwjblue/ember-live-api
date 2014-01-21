import ajax from 'appkit/utils/ajax';

export default Ember.Route.extend({
  model: function(params) {
    var store = this.store;

    return ajax("http://builds.emberjs.com/beta/ember-docs.json", {
      dataType: 'json'
    }).then(function(data) {
      store.load(data);
    }).catch(Ember.RSVP.rethrow);
  }
});

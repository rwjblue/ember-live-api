export default Ember.Component.extend({
  classNames: 'search-field',

  didInsertElement: function() {
    var self = this;
    var keyHandler = function(e) {
      Ember.run(self, self.globalKeyHandler, e);
    };
    this.set('keyHandler', keyHandler);
    $(document).on('keypress', keyHandler);
  },

  willClearRender: function() {
    var keyHandler = this.get('keyHandler');
    $(document).off('keypress', keyHandler);
  },
  
  globalKeyHandler: function(e) {
    var el = e.target || e.srcElement;

    if (this.get('input.element') === el) return;

    // String.fromCharCode(47) === '/'
    if (e.which === 47) {
      this.get('input').$().focus();
      e.preventDefault();
    }
  },

  randomQuery: function() {
    var queries = [
      'ArrayController',
      'beforeModel',
      'addArrayObservers',
      'notifyPropertyChange'
    ];

    return queries[Math.floor(Math.random() * queries.length)];
  }.property(),

  placeholder: function() {
    return "Search, eg. " + this.get('randomQuery');
  }.property()
});
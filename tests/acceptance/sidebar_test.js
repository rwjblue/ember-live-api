var App;

module("Acceptances - Sidebar", {
  setup: function(){
    var sampleDataUrl = '';

    if (typeof __karma__ !== 'undefined')
      sampleDataUrl = '/base';

    sampleDataUrl = sampleDataUrl + '/tests/support/api.json';

    App = startApp({apiDataUrl: sampleDataUrl});
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("sidebar renders list of modules/classes", function(){
  expect(2);

  visit('/').then(function(){
    ok(exists("a:contains('Ember.Application')"));
    ok(exists("a:contains('Ember.run')"));
  });
});

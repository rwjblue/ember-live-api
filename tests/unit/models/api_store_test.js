import ApiStore from 'appkit/models/api_store';

var sampleDataUrl = '/tests/support/api.json',
    apiStore;

function createApiStore(callback){
  apiStore = ApiStore.create({ dataUrl: sampleDataUrl});
  if (callback) 
    apiStore.get('loading').then(callback);
}

module("Unit - ApiStore - Data/Index", {
  setup: function(){
    stop();
    createApiStore(start);
  }
});

test("it exists", function(){
  ok(apiStore);
  ok(apiStore instanceof ApiStore);
});

asyncTest("it has the right data", function(){
  expect(1);
  var sampleData;

  Ember.$.getJSON(sampleDataUrl, function(data){
    sampleData = data;
  }).then(function(){
    start();
    deepEqual(apiStore.get('data'), sampleData);
  });
});

test("it has an index", function(){
  ok(apiStore.get('index'));
});

module("Unit - ApiStore - Classes", {
  setup: function(){
    stop();
    createApiStore(start);
  }
});

test("it can access a class", function(){
  var klass = apiStore.getClass('Ember.ControllerMixin');

  ok(klass);
  equal(klass.name, 'Ember.ControllerMixin');
  equal(klass.module, 'ember');
  equal(typeof(klass.line), 'number');
});

test("it can access a module", function(){
  var klass = apiStore.getClass('Ember.ControllerMixin');

  ok(klass);
  equal(klass.name, 'Ember.ControllerMixin');
});

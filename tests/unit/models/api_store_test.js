import ApiStore from 'appkit/models/api_store';
import ApiClass from 'appkit/models/api_class';

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

test("it has files", function(){
  ok(apiStore.get('files'));
});

test("it has classes", function(){
  ok(apiStore.get('classes'));
});

test("it has modules", function(){
  ok(apiStore.get('modules'));
});

test("it has classitems", function(){
  ok(apiStore.get('classitems'));
});

module("Unit - ApiStore - Classes", {
  setup: function(){
    stop();
    createApiStore(start);
  }
});

asyncTest("it gets an ApiClass instance back from findClass", function(){
  apiStore.findClass('Ember.ControllerMixin').then(function(obj){
    start();

    ok(obj);
    ok(obj instanceof ApiClass);
    equal(obj.get('name'), 'Ember.ControllerMixin');
    equal(obj.get('module'), 'ember');
  });
});

module("Unit - ApiStore - Modules", {
  setup: function(){
    stop();
    createApiStore(start);
  }
});

asyncTest("it can access a module", function(){
  apiStore.findModule('ember').then(function(obj){
    start();

    ok(obj);
    equal(obj.name, 'ember');
    ok(obj.submodules);
    ok(obj.classes);
  });
});


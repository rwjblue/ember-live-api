import ApiStore from 'appkit/models/api_store';
import ApiClass from 'appkit/models/api_class';
import ajax from 'appkit/utils/ajax';

var sampleDataUrl = '/tests/support/api.json',
    apiStore;

function createApiStore(data){
  apiStore = ApiStore.create({ data: Ember.RSVP.resolve(data)});
}

function mainSetup(callback){
  stop();

  if (!callback)
    callback = function(){};

  Ember.run(function(){
    ajax(sampleDataUrl, { dataType: 'json' })
         .then(createApiStore)
         .then(callback)
         .fail(Ember.RSVP.rethrow);
  });
}

module("Unit - ApiStore - Data/Index", {
  setup: function(){
    mainSetup(start);
  }
});

test("it exists", function(){
  ok(apiStore);
  ok(apiStore instanceof ApiStore);
});

test("it has files", function(){
  Ember.run(function(){
    ok(apiStore.get('files'));
  });
});

test("it has classes", function(){
  function assertions(classes){
    ok(classes);
    ok(classes.length > 0, 'find at least 1 class');
  }

  Ember.run(function(){
    apiStore.get('classes')
            .then(assertions)
            .fail(Ember.RSVP.rethrow);
  });
});

test("it has modules", function(){
  ok(apiStore.get('modules'));
});

test("it has classitems", function(){
  ok(apiStore.get('classitems'));
});

test("it has namespaces", function(){
  var namespaces = apiStore.get('namespaces');

  ok(namespaces);
  ok(namespaces.length > 0, 'find at least 1 namespace');
});

module("Unit - ApiStore - Classes", {
  setup: function(){
    mainSetup(start);
  }
});

asyncTest("it gets an ApiClass instance back from findClass", function() {
  function testResult(obj) {
    start();

    ok(obj);
    ok(obj instanceof ApiClass);
    equal(obj.get('name'), 'Ember.ControllerMixin');
    equal(obj.get('module'), 'ember');
  }

  Ember.run(function() {
    apiStore.findClass('Ember.ControllerMixin').then(testResult);
  });
});

asyncTest("sets the apiStore on the ApiClass", function(){
  expect(3);

  function testResult(obj) {
    start();

    ok(obj);
    ok(obj.get('apiStore') instanceof ApiStore, 'apiStore is available to the object');
    ok(obj.get('apiStore') === apiStore, 'the same apiStore instance is passed to the object');
  }

  Ember.run(function() {
    apiStore.findClass('Ember.ControllerMixin').then(testResult);
  });
});

module("Unit - ApiStore - Modules", {
  setup: function(){
    mainSetup(start);
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

module("Unit - ApiStore - Namespaces", {
  setup: function(){
    mainSetup(start);
  }
});

asyncTest("it can access a namespace", function(){
  apiStore.findNamespace('Ember').then(function(obj){
    start();

    ok(obj);
    ok(obj.get('static'), 'its a namespace');
    equal(obj.get('name'), 'Ember');
  });
});

module("Unit - ApiStore - Search", {
  setup: function(){
    mainSetup(start);
  }
});

test('search returns a valid search result object', function(){
  expect(5);

  var results = apiStore.search('ember');

  ok(results);
  ok(results.files);
  ok(results.modules);
  ok(results.classes);
  ok(results.classItems);
});

test('can actually search for something', function(){
  expect(4);

  var results = apiStore.search('dd');

  ok(results.files.length > 0, 'some files were returned');
  ok(results.modules.length > 0, 'some modules were returned');
  ok(results.classes.length > 0, 'some classes were returned');
  ok(results.classItems.length > 0, 'some classItems were returned');
});

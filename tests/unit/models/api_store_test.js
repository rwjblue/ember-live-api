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
  Ember.run(function(){
    ok(apiStore.get('modules'));
  });
});

test("it has namespaces", function(){
  function assertions(namespaces){
    ok(namespaces);
    ok(namespaces.length > 0, 'find at least 1 namespace');
  }

  Ember.run(function(){
    apiStore.get('namespaces')
            .then(assertions)
            .fail(Ember.RSVP.rethrow);
  });
});

module("Unit - ApiStore - Classes", {
  setup: function(){
    mainSetup(start);
  }
});

test("it gets an ApiClass instance back from findClass", function() {
  expect(4);

  function testResult(obj) {
    ok(obj);
    ok(obj instanceof ApiClass);
    equal(obj.get('name'), 'Ember.ControllerMixin');
    equal(obj.get('module'), 'ember');
  }

  Ember.run(function() {
    apiStore.findClass('Ember.ControllerMixin')
            .then(testResult)
            .fail(Ember.RSVP.rethrow);
  });
});

test("sets the apiStore on the ApiClass", function(){
  expect(3);

  function assertions(obj) {
    ok(obj);
    ok(obj.get('apiStore') instanceof ApiStore, 'apiStore is available to the object');
    ok(obj.get('apiStore') === apiStore, 'the same apiStore instance is passed to the object');
  }

  Ember.run(function() {
    apiStore.findClass('Ember.ControllerMixin').then(assertions);
  });
});

module("Unit - ApiStore - Modules", {
  setup: function(){
    mainSetup(start);
  }
});

test("it can access a module", function(){
  function assertions(obj) {
    ok(obj);
    equal(obj.name, 'ember');
    ok(obj.submodules);
    ok(obj.classes);
  }

  Ember.run(function(){
    apiStore.findModule('ember').then(assertions);
  });
});

module("Unit - ApiStore - Namespaces", {
  setup: function(){
    mainSetup(start);
  }
});

test("it can access a namespace", function(){
  expect(3);

  function assertions(obj){
    ok(obj);
    ok(obj.get('static'), 'its a namespace');
    equal(obj.get('name'), 'Ember');
  }

  Ember.run(function(){
    apiStore.findNamespace('Ember').then(assertions);
  });
});

module("Unit - ApiStore - Search", {
  setup: function(){
    mainSetup(start);
  }
});

test('search returns a valid search result object', function(){
  expect(5);

  function assertions(results){
    ok(results);
    ok(results.files);
    ok(results.modules);
    ok(results.classes);
    ok(results.classItems);
  }

  Ember.run(function(){
    apiStore.search('ember').then(assertions);
  });
});

test('can actually search for classitems', function(){
  expect(1);

  function assertions(results){
    ok(results.classItems.length > 0, 'some classItems were returned');
  }

  Ember.run(function(){
    apiStore.search('dd').then(assertions)
                         .fail(Ember.RSVP.rethrow);
  });
});

test('can actually search for classes', function(){
  expect(1);

  function assertions(results){
    ok(results.classes.length > 0, 'some classes were returned');
  }

  Ember.run(function(){
    apiStore.search('Ember').then(assertions)
                         .fail(Ember.RSVP.rethrow);
  });
});

test('can actually search for modules', function(){
  expect(1);

  function assertions(results){
    ok(results.modules.length > 0, 'some modules were returned');
  }

  Ember.run(function(){
    apiStore.search('::Emb')
            .then(assertions)
            .fail(Ember.RSVP.rethrow);
  });
});

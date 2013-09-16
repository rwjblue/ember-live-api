import ApiClass from 'appkit/models/api_class';

var sampleDataUrl = '/tests/support/api.json',
    sampleClass = 'Ember.ControllerMixin',
    sampleData, apiStore, apiClass;

module("Unit - ApiClass", {
  setup: function(){
    stop();

    var sampleData;

    Ember.$.getJSON(sampleDataUrl)
    .then(function(data){
      var classinfo = data.classes[sampleClass];

      classinfo.classitems = data['classitems'].filterBy('class',sampleClass);
      
      apiClass   = ApiClass.create({data: classinfo});
      sampleData = data;
      return true;
    })
    .then(start);
  }
});

test("it exists", function(){
  ok(apiClass);
  ok(apiClass instanceof ApiClass);

});

test("it can access its methods", function(){
  var methods = apiClass.get('methods');

  ok(methods instanceof Array, 'methods is an array');
  ok(methods.length > 0, 'expected methods to contain items');

  expect(methods.length + 2);

  methods.forEach(function(method){
    equal(method.itemtype, 'method');
  });
});

test("it can access its properties", function(){
  var properties = apiClass.get('properties');

  ok(properties instanceof Array, 'properties is an array');
  ok(properties.length > 0, 'expected properties to contain items');

  expect(properties.length + 2);

  properties.forEach(function(property){
    equal(property.itemtype, 'property');
  });
});

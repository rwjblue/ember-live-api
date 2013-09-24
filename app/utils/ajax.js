function ajax(url, options) {
  return new Ember.RSVP.Promise(function(resolve, reject){
    options = options || {};
    options.url = url;

    options.success = function(data) {
      Ember.run(null, resolve, data);
    };

    options.error = function(jqxhr, status, something) {
      Ember.run(null, reject, arguments);
    };

    Ember.$.ajax(options);
  });
}

export default ajax;

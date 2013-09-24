// TODO: load based on params

Ember.keys(requirejs._eak_seen).filter(function(key) {
  return (/\_test/).test(key);
}).forEach(function(key) {
  require(key, null, null, true);
});

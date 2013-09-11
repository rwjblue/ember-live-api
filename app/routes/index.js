import ApiSearch from 'appkit/models/api_search';

var IndexRoute = Ember.Route.extend({
  model: function(){
    return ApiSearch.create({dataUrl: '/api/api.json'});
  }
});

export default IndexRoute;

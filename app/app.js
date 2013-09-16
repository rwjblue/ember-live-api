import Resolver from 'resolver';
import router from 'appkit/router';
import ApiStore from 'appkit/models/api_store';

var App = Ember.Application.create({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  }),
  rootElement: '#ember-live-api'
});

App.register('api-store:main', ApiStore.create({dataUrl: '/api/api.json'}), {instantiate: false});
App.inject('controller', 'apiStore', 'api-store:main');
App.inject('route', 'apiStore', 'api-store:main');

export default App;

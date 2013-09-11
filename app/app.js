import Resolver from 'resolver';
import router from 'appkit/router';
import Api from 'appkit/models/api';

var App = Ember.Application.create({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  }),
  rootElement: '#ember-live-api'
});

App.register('api:main', Api.create({dataUrl: '/api/api.json'}), {instantiate: false});
App.inject('controller', 'api', 'api:main')

export default App;

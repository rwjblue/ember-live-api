import Resolver from 'resolver';
import Router from 'appkit/router';
import ApiStore from 'appkit/models/api_store';

var App = Ember.Application.extend({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router:  Router,
  rootElement: '#ember-live-api'
});

App.initializer({
  name: 'injections',
  initialize: function(container, application) {
    application.register('api-store:main', ApiStore.create({ dataUrl: '/api/api.json' }), { instantiate: false });
    application.inject('controller', 'apiStore', 'api-store:main');
    application.inject('component:api-class-link', 'apiStore', 'api-store:main');
    application.inject('route', 'apiStore', 'api-store:main');
  }
});

export default App;

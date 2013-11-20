import Resolver from 'resolver';
import ApiStore from 'appkit/models/api_store';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_MODULE_RESOLVER: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default'],
  rootElement: '#ember-live-api'
});

App.initializer({
  name: 'injections',
  initialize: function(container, application) {
    application.register('api-store:main', ApiStore.create({ dataUrl: application.get('apiDataUrl')}), { instantiate: false });
    application.inject('controller', 'apiStore', 'api-store:main');
    application.inject('component:api-class-link', 'apiStore', 'api-store:main');
    application.inject('route', 'apiStore', 'api-store:main');
  }
});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

export default App;

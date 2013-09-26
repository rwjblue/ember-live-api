import Resolver from 'resolver';
import ApiStore from 'appkit/models/api_store';
import registerComponents from 'appkit/utils/register_components';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_MODULE_RESOLVER: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
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

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

export default App;

import Resolver     from 'resolver';
import Store        from 'appkit/api-store/store';

import ApiModule    from 'appkit/models/api-module';
import ApiClass     from 'appkit/models/api-class';
import ApiClassitem from 'appkit/models/api-classitem';

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
    application.register('store:main', Store, { instantiate: true });
    application.register('model:module',    ApiModule,    { singleton: false });
    application.register('model:class',     ApiClass,     { singleton: false });
    application.register('model:classitem', ApiClassitem, { singleton: false });

    application.inject('route', 'store', 'store:main');
    application.inject('controller', 'store', 'store:main');
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

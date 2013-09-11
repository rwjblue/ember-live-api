import Resolver from 'resolver';
import router from 'appkit/router';

var App = Ember.Application.create({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  }),
  rootElement: '#ember-live-api'
});

export default App;

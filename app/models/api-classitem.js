import Model from 'appkit/api-store/model';
import { getClass, getProject } from 'appkit/api-store/helpers';

var notEmpty = Ember.computed.notEmpty,
    alias = Ember.computed.alias;

// TODO: Support nested params
var Param = Model.extend({
  name:            alias('data.name'),
  description:     alias('data.description'),
  optional:        alias('data.optional'),
  type:            getClass('data.type', {stub: true})
});

export default Model.extend({
  isClassitem:           true,

  project:               getProject(),

  file:                  alias('data.file'),
  line:                  alias('data.line'),
  itemtype:              alias('data.itemtype'),
  name:                  alias('data.name'),

  class:                 getClass('data.class'),
  type:                  getClass('data.type', {stub: true}),

  hasReturnType:         notEmpty('data.return.type'),
  returnType:            getClass('data.return.type', {stub: true}),
  returnDescription:     alias('data.return.description'),

  deprecated:            alias('data.deprecated'),
  access:                alias('data.access'),
  final:                 alias('data.final'),
  static:                alias('data.static'),
  optional:              alias('data.optional'),
  required:              alias('data.required'),
  since:                 alias('data.since'),
  description:           alias('data.description'),
  default:               alias('data.default'),
  example:               alias('data.example'),

  hasParams:             notEmpty('data.params'),

  params: function() {
    var params = this.get('data.params'),
        store = this.store;
    if (!params) return;
    return params.map(function(data) {
      return Param.create({store: store, data: data});
    });
  }.property('data.params')
});

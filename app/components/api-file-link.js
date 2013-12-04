/* TODO: Fix repoUrl & sha */

export default Ember.Component.extend({
  tagName: 'span',
  moduleName: Ember.required('must supply the moduleName to look for'),
  apiStore:  Ember.required('must supply the apiStore to use for class lookups.'),

  repoUrl: 'https://github.com/emberjs/ember.js',
  sha: 'v1.0.0',
  cssClass: 'api-file-link',
  title: Em.computed.alias('path'),

  file: function(){
    return this.get('apiItem.file');
  }.property('apiItem.file'),

  line: function(){
    return this.get('apiItem.line');
  }.property('apiItem.line'),

  path: function(){
    return this.get('file').replace(/^\.\.\//,'');
  }.property('apiItem.path'),

  link: function(){
    var repoUrl = this.get('repoUrl'),
        sha     = this.get('sha'),
        path    = this.get('path'),
        line    = this.get('line'),
        link;

    link  = repoUrl + '/tree/' + sha + '/' + path;

    if (line)
      link  = link + "#L" + line;

    return link;
  }.property('path','repoUrl','sha','line'),

  calculatedTitle: function(){
    var line = this.get('line'),
        path = this.get('path'),
        title = this.get('title');

    if (!title)
      title = path;

    if (line)
      title = title + ':' + line;

    return title;
  }.property('line', 'path', 'title')
});

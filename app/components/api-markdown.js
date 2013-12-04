import markedOverrideCodeBlock from 'appkit/utils/marked_code_block_override';

export default Ember.Component.extend({
  tagName: 'span',

  markdown: function(){
    var text     = this.get('text'),
        markdown = marked(text);

    return new Ember.Handlebars.SafeString(markdown);
  }.property('text'),
});

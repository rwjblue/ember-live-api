var ApiMarkdown = Ember.Component.extend({
  tagName: 'span',

  markdown: function(){
    var self     = this,
        text     = this.get('text'),
        markdown = marked(text);

    Ember.run.scheduleOnce('afterRender', this, this.updateCodeBlocks);

    return new Ember.Handlebars.SafeString(markdown);
  }.property('text'),

  updateCodeBlocks: function(){
    var self = this;

    this.$('pre code').each(function(index, element) {
      var $element = $(element),
          $parent  = $element.parent(),
          code     = $element.text();
      
      $parent.replaceWith(self.formatCodeBlock(code));
    });

    this.$('td.code').each(function(index, element) {
      hljs.highlightBlock(element);
    });
  },

  formatCodeBlock: function(code){
    var lines = code.split("\n"),
        lineNumbers = '',
        result;

    lines.forEach(function(item, index){
      var humanIndex = index + 1;

      lineNumbers = lineNumbers + humanIndex + "\n";
    });

    result = '<div class="highlight">' + 
             '  <div class="ribbon"></div>' +
             '  <div class="scroller">' +
             '    <table class="CodeRay">' +
             '      <tr>' +
             '        <td class="line-numbers">' +
             '          <pre>' + lineNumbers + '</pre>' +
             '        </td>' +
             '        <td class="code"><pre>' + code + '</pre></td>' +
             '      </tr>' +
             '    </table>' +
             '  </div>' +
             '</div>';

    return result;
  }

});

export default ApiMarkdown;

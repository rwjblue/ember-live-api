var ApiMarkdown = Ember.Component.extend({
  tagName: 'span',

  overrideMarkedParser: function(){
    var Parser = marked.Parser,
        formatCodeBlock = this.formatCodeBlock;

    if (Parser.prototype.overridden !== true){
      Parser.prototype.tokOriginal = Parser.prototype.tok;
      Parser.prototype.tok = function(){
        if (this.token.type === 'code'){
          var language = this.token.lang,
              code     = this.token.text;

          code = hljs.highlight(language, code).value;
          return formatCodeBlock(code, language);
        } else {
          return this.tokOriginal();
        }
      };

      Parser.prototype.overridden = true;
    }
  },

  markdown: function(){

    var self     = this,
        text     = this.get('text'),
        markdown;

    this.overrideMarkedParser();
    markdown = marked(text);

    return new Ember.Handlebars.SafeString(markdown);
  }.property('text'),

  formatCodeBlock: function(code, language){
    var lines = code.split("\n"),
        lineNumbers = '',
        result;

    lines.forEach(function(item, index){
      var humanIndex = index + 1;

      lineNumbers = lineNumbers + humanIndex + "\n";
    });

    result = '<div class="highlight ' + language + '">' +
             '  <div class="ribbon"></div>' +
             '  <div class="scroller">' +
             '    <table class="CodeRay">' +
             '      <tr>' +
             '        <td class="line-numbers">' +
             '          <pre>' + lineNumbers + '</pre>' +
             '        </td>' +
             '        <td class="code"><pre class="' + language + '">' + code + '</pre></td>' +
             '      </tr>' +
             '    </table>' +
             '  </div>' +
             '</div>';

    return result;
  }

});

export default ApiMarkdown;

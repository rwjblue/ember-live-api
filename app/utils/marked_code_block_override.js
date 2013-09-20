/*
 * This exists to change the default codeblock formatting of marked
 * to the formatting that we desire (with line numbers and styling)
 *
 */
function formatCodeBlock(code, language){
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


function overrideMarkedCodeBlockFormatting(){
  var Parser = marked.Parser;

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
}

overrideMarkedCodeBlockFormatting();

export default {};

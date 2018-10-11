const CodeMirror = require("codemirror/addon/runmode/runmode.node");

require("codemirror/mode/clike/clike");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/swift/swift");
require("codemirror/mode/sql/sql");
require("codemirror/mode/shell/shell");
require("codemirror/mode/ruby/ruby");
require("codemirror/mode/python/python");
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/erlang/erlang");
require("codemirror/mode/haskell/haskell");
require("codemirror/mode/elm/elm");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/go/go");
require("codemirror/mode/lua/lua");
require("./graphqlMode");

module.exports = function highlightCode(language, value) {
  const elements = [];
  let lastStyle = null;
  let tokenBuf = "";
  const pushElement = (token, style) => {
    elements.push(
      `<span${style ? ` class="cm-${style}"` : ""}>${token}</span>`
    );
  };
  CodeMirror.runMode(value, language, (token, style) => {
    if (lastStyle === style) {
      tokenBuf += token;
      lastStyle = style;
    } else {
      if (tokenBuf) {
        pushElement(tokenBuf, lastStyle);
      }
      tokenBuf = token;
      lastStyle = style;
    }
  });
  pushElement(tokenBuf, lastStyle);

  return elements.join("");
};

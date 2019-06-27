const CodeMirror = require("codemirror/addon/runmode/runmode.node");

CodeMirror.modeInfo.forEach(element => {
  if (Object.keys(element).some(x => element[x] === "null")) return;
  let mode = element["mode"];
  let required = `codemirror/mode/${mode}/${mode}`;
  require(required);
});

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

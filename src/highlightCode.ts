const CodeMirror = require("codemirror/addon/runmode/runmode.node");

const charactersToEncode: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const encodeCharacter = function (chr: string) {
  return charactersToEncode[chr] || chr;
};

const encodeText = function (str: string) {
  return str.replace(/[&<>]/g, encodeCharacter);
};

import "codemirror/mode/meta";

CodeMirror.modeInfo.forEach((element: any) => {
  if (Object.keys(element).some((x) => element[x] === "null")) return;
  const mode = element["mode"];
  const required = `codemirror/mode/${mode}/${mode}`;
  require(required);
});

import "./graphqlMode";

export default function highlightCode(language: string, value: string) {
  const elements: string[] = [];
  let lastStyle: string | null = null;
  let tokenBuf = "";
  const pushElement = (token: string, style: string | null) => {
    elements.push(
      `<span${style ? ` class="cm-${style}"` : ""}>${encodeText(token)}</span>`
    );
  };
  CodeMirror.runMode(value, language, (token: string, style: string) => {
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
}

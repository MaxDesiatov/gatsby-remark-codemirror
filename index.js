const visit = require("unist-util-visit");
const highlightCode = require("./highlightCode");

module.exports = ({ markdownAST }, { theme, className } = {}) => {
  theme = theme || "default";

  visit(markdownAST, `code`, node => {
    let language = node.lang;

    // Replace the node with the markup we need to make
    // 100% width highlighted code lines work
    node.type = `html`;

    node.value = `
    <div class="gatsby-highlight" data-language="${language}">
      <pre class="${className || ""} ${theme ? `cm-s-${theme}` : ""}"
      ><code>${highlightCode(language, node.value)}</code></pre>
    </div>`;
  });
};

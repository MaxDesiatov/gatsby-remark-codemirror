import visit from "unist-util-visit";
import { Node } from "unist";
import highlightCode from "./highlightCode";

export default (
  { markdownAST }: { markdownAST: Node },
  { theme, className }: { theme?: string; className?: string } = {}
) => {
  theme = theme || "default";

  visit(markdownAST, `code`, (node) => {
    let language = node.lang as string;

    // Replace the node with the markup we need to make
    // 100% width highlighted code lines work
    node.type = `html`;

    node.value = `<div class="gatsby-highlight" data-language="${language}">
      <pre class="${className || ""} ${
      theme ? `cm-s-${theme}` : ""
    }"><code>${highlightCode(language, node.value as string)}</code></pre>
    </div>`;
  });
};

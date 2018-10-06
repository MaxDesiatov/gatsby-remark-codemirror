# gatsby-remark-prismjs

Adds syntax highlighting to code blocks in your Gatsby Markdown files using
[CodeMirror](https://codemirror.net) [Mode
Runner](https://codemirror.net/demo/runmode.html). Note that this
[Remark plugin](https://github.com/remarkjs/remark/blob/master/doc/plugins.md)
does not convert your code blocks to code editor instances, only uses
CodeMirror's syntax highlighting engine to render static
`<code><pre>...</code></pre>` blocks with appropriate CSS classes for `<span/>`
tags contained within.

## Install

`npm install --save gatsby-transformer-remark gatsby-remark-codemirror`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-codemirror`,
          options: {
            // CSS class suffix to be used for produced `<pre/>` blocks.
            // Default value is "default", which adds "cm-s-default" class.
            // This class name matches
            theme: "default"
          }
        }
      ]
    }
  }
];
```

### Include CSS

#### Required: Pick a CodeMirror theme or create your own

CodeMirror ships with a number of [themes][5] (previewable on the [CodeMirror
website][6]) that you can easily include in your Gatsby site, or you can build
your own by copying and modifying an example.

To load a theme, just require its CSS file in your `gatsby-browser.js` file, e.g.

```javascript
// gatsby-browser.js
require("codemirror/lib/codemirror.css");
```

or for a non-default theme:

```javascript
// gatsby-browser.js
require("codemirror/theme/ambiance.css");
// don't forget to set `theme: "ambiance"` in gatsby-config.js
```

### Usage in Markdown

This is some beautiful code:

    ```swift
    extension Never: Equatable {
      public static func == (lhs: Never, rhs: Never) -> Bool {
        switch (lhs, rhs) {
        }
      }
    }

    extension Never: Hashable {
      public func hash(into hasher: inout Hasher) {
      }
    }
    ```

[1]: https://github.com/codemirror/CodeMirror/tree/master/theme
[2]: https://codemirror.net/index.html

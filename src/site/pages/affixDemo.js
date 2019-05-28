import React from 'react';
import Markdown from 'react-markdown/with-html';
// import renderers from 'react-markdown-github-renderers';

// const demoMarkDown = 
//   `
//     <blockquote>
//     This blockquote will change based on the HTML settings above.
//   </blockquote>

//   ## How about some code?
//   js
//   var React = require('react');
//   var Markdown = require('react-markdown');

//   React.render(
//     <Markdown source="# Your markdown here" />,
//     document.getElementById('content')
//   );
//   `;
const demoMarkDown = `
  # Live demo

  Changes are automatically rendered as you type.

  * Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
  * Renders actual, "native" React DOM elements
  * Allows you to escape or skip HTML (try toggling the checkboxes above)
  * If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
  
  ## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |
`;

class AffixDemo extends React.PureComponent {
  render() {
    return (
      <Markdown source={demoMarkDown} escapeHtml={false}/>
    );
  }
}

export default AffixDemo;
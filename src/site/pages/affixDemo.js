import React from 'react';
import Markdown from 'react-markdown/with-html';

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

class AffixDemo extends React.PureComponent {
  render() {
    return (
      <Markdown source="# Your markdown here" escapeHtml={false}/>
    );
  }
}

export default AffixDemo;
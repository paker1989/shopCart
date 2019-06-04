import React from 'react';
import hljs from 'highlightjs';

class CodeHighlighter extends React.PureComponent {

  highlightBlock = () => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', this.highlightBlock);
  }

  componentWillUnmount() {
    document.removeEventListener('DOMContentLoaded', this.highlightBlock);
  }

  render() {
    return null;
  }
}

export default CodeHighlighter;
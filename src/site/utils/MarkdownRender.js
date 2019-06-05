import React from 'react';
import Markdown from 'react-markdown/with-html';
import PropTypes from 'prop-types';
import hljs from 'highlightjs';

class MarkdownRender extends React.PureComponent {

  static propTypes = {
    source: PropTypes.string,
    escapeHtml: PropTypes.bool
  }

  static defaultProps = {
    escapeHtml: false,
  }

  render() {
    const { source, escapeHtml } = this.props;
    return (
      <div className="bxu-react-container">
        <Markdown source={source} escapeHtml={escapeHtml}/>
      </div>
    );
  }
}

export default MarkdownRender;
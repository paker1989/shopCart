import React from 'react';
import Markdown from 'react-markdown/with-html';
import PropTypes from 'prop-types';

class MarkdownRender extends React.PureComponent {

  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    escapeHtml: PropTypes.bool
  }

  static defaultProps = {
    escapeHtml: false,
  }

  render() {
    let { source, escapeHtml } = this.props;
   
    if (Array.isArray(source) && source.length > 1) {
      return (
        <React.Fragment>
          {source.map((src, index) => {
            return (
              <div className="bxu-react-container" key={`md-${index}`}>
                <Markdown source={src} escapeHtml={escapeHtml}/>
              </div>
            )
          })}
        </React.Fragment>
      );
    } else {
      source = Array.isArray(source) ? source[0]: source;
      return (
        <div className="bxu-react-container">
          <Markdown source={source} escapeHtml={escapeHtml}/>
        </div>
      );
    }

  }
}

export default MarkdownRender;
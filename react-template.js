import React, { Component } from 'react';
IMPORTS

DEMO_DECLARATIONS

function RawHtmlRenderer(props) {
  return <props.tag {...props.attributes} dangerouslySetInnerHTML={{ __html: props.html }}></props.tag>;
}

function Markdown(props) {
  return <RawHtmlRenderer tag="section" html={props.html} />;
}

function Style(props) {
  return <RawHtmlRenderer tag="style" html={props.style} />;
}

class Demo extends Component {
  state = {
    showCode: true
  };

  toggle = () => {
    this.setState({
      showCode: !this.state.showCode
    });
  };

  render() {
    const { showCode } = this.state;
    const { title, src, demo } = this.props;

    console.log(this.props);

    return (
      <div className="bxu-react-demo">
        <div className="bxu-react-demo__preview">
          {demo}
        </div>
        <div className="bxu-react-demo__bottom" onClick={this.toggle}>
          <i
            className={`bxuicon bxuicon-right bxu-react-demo__toggle 
              ${showCode ? 'bxu-react-demo__toggle-on' : 'bxu-react-demo__toggle-off'}`}
          />
          <RawHtmlRenderer
            tag="div"
            attributes={{
              className: 'bxu-react-demo__title'
            }}
            html={title}
          />
        </div>
        {showCode && <RawHtmlRenderer
          tag="pre"
          html={src}
          attributes={{
            className: 'bxu-react-demo__code'
          }}
        />}
      </div>
    )
  }
}

module.exports = class ZentDocContainer extends Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'bxu-react-container'
      },
      SECTIONS
    );
  }
}
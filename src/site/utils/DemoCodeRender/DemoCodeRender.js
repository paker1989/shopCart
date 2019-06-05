import React from 'react';

class DemoCodeRender extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showCode: false};
  }

  render() {
    const { title, children } = this.props;
    
    return (
      <div className="demo-code-render_container">
        
      </div>
    );

  }
}

export default DemoCodeRender;
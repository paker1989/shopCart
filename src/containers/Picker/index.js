import React from 'react';
import ColorPicker from '../../components/colorPicker';

import './pickerdemo.scss';

class PickerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {color: '#FF4444'};
  }

  handleChange = (color) =>  {
    this.setState({ color });
  }

  render() {
    const { color } = this.state;
    return (
      <div className="_picker_demo_container">
        <ColorPicker color={color} type="simple" onChange={this.handleChange} />
        <div style={{ color, marginTop: 5 }}>当前颜色：{color}</div>
      </div>  
    );
  }
}

export default PickerDemo;
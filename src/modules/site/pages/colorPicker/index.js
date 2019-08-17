import React from 'react';
import ColorPicker from '../../../../_packages_/components/colorPicker';

import './pickerdemo.scss';

class PickerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {color: '#FF4444', colorBorardColor: '#FF4444'};
  }

  handleChange = (color) =>  {
    this.setState({ color });
  }

  handleColorBoardChange = (colorBorardColor) =>  {
    this.setState({ colorBorardColor: colorBorardColor.rgbString });
  }

  render() {
    const { color, colorBorardColor } = this.state;
    return (
      <div>
        <div className="_only_colorboard_demo_container">
          <ColorPicker.ColorBoard 
            prefix="bxu"
            color={colorBorardColor}
            showAlpha={true}
            onChange={this.handleColorBoardChange}/>
        </div>
        <div className="_picker_demo_container">
          <ColorPicker color={color} type="simple" onChange={this.handleChange} />
          <div style={{ color, marginTop: 5 }}>当前颜色：{color}</div>
        </div>  
        <div className="_colorboard_demo_container">
          <ColorPicker color={colorBorardColor} onChange={this.handleColorBoardChange}
            showAlpha={true} />
          <div style={{ color: colorBorardColor, marginTop: 5 }}>当前颜色：{colorBorardColor}</div>
        </div>
      </div>
    );
  }
}

export default PickerDemo;
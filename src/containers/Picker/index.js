import React from 'react';
import ColorPicker from '../../components/colorPicker';


class PickerDemo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="_picker_demo_container">
        <ColorPicker.ColorBoard>
        </ColorPicker.ColorBoard> 
      </div>  
    );
  }
}

export default PickerDemo;
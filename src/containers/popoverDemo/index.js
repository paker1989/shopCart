import React from 'react';
import Popover from '../../components/popover';
import './popover.demo.scss';


class PopoverDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  render() {
    return (
      <div className="_popover_demo_container">
        <Popover
          isVisible={this.state.isVisible}
          position={Popover.Placement.belowRight}
          cushion={5}>
          <Popover.Trigger.ClickTrigger>
            <button className="blue-button">
              Click me
            </button>
          </Popover.Trigger.ClickTrigger>
          <Popover.Content>
            <div>Popover 弹层内容</div>
            <div>可以添加任意内容</div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default PopoverDemo;
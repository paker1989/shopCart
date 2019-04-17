import React from 'react';
import Popover from '../../components/popover';
import './popover.demo.scss';


class PopoverDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  obsoleteBeforeShow = () => {
    let j = 0;
    for (let i = 0; i < 1000; i++) {
      j += i;
    }
    console.log(j);
  }

  promiseBeforeClose = () => {
    console.log('promise before close');
    return new Promise((resolve, reject) => {
        console.log('before close done');
        resolve('before close done');
    })
  }

  render() {
    return (
      <div className="_popover_demo_container">
        <Popover
          className="_demo_content_style"
          closeOnOutSide={true}
          position={Popover.Placement.bottomRight}
          cushion={5}
          onBeforeShow={this.obsoleteBeforeShow}
          onBeforeClose={this.promiseBeforeClose}
          onShow={() => {console.log('showing')}}>
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
     /*
     <div className="_popover_demo_container">
        <Popover
          className="_demo_content_style"
          isVisible={this.state.isVisible}
          closeOnOutSide={true}
          position={Popover.Placement.bottomRight}
          cushion={5}>
          <Popover.Trigger.Base>
            <button className="blue-button" onClick={e => {this.setState({ isVisible: true })}}>
              打开
            </button>
          </Popover.Trigger.Base>
          <Popover.Content>
            <div>Popover 弹层内容</div>
            <div>可以添加任意内容</div>
          </Popover.Content>
        </Popover>
        <button className="blue-button" onClick={e => {this.setState({ isVisible: false })}}>
          关闭
        </button>
      </div>
      */
    );
  }
}

export default PopoverDemo;
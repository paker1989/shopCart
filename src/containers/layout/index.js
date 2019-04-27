import React from 'react';
import Layout from '../../components/layout';
import './layout.scss';

import Input from '../../components/input';
import Steps from '../../components/steps';
import Affix from '../../components/affix';
import Notify from '../../components/notify';

const { Col, Row } = Layout;

class LayoutDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {input: '', current: 1, status: 'process'};
  }

  nextStep = () => {
    let { current, status } = this.state;
    if (current === 3 && status === 'process') {
      status = 'finish';
    } else {
      current++;
      if (current > 3) {
        current = current % 3;
      }
      status = 'process';
    }

    this.setState({
      current,
      status
    });
  }

  onStepChange = (id) => {
    this.setState({
      current: id
    });
  }

  render() {
    let { current, status } = this.state;

    return (
      <div className="_layout_demo_container">
        {/* demo for notify */}
        <Row>
          <Col span={10} offset={7}>
            <button className="bxu-btn" onClick={() => {Notify.success('鬼子进村啦')}}>
              Notify basis
            </button>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={2} className="spec-col">
            span 4, offset 2
          </Col>
          <Col span={2} offset={3} className="spec-col-dep">
            span 2
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={2} className="spec-col">
            span 22, offset 2
          </Col>
        </Row>
        {/* affix */}
        <Row>
          <Col span={4} offset={6}>
             <Affix offsetTop={100} placeHoldClassName="marginStyle">
               <button className="bxu-btn btn-affix">固钉</button>
             </Affix>
          </Col>
        </Row>
        <Input 
          className="demo-input-class"
          width={250}
          addonBefore="Buy"
          addonAfter="Apple"
          showClear={true}
          type="textarea"
          value={this.state.input}
          showCount={true}
          maxLength={100}
          autoFocus={true}
          onChange={e => {
            this.setState({ input: e.target.value});
          }}
          placeholder="Write down your comments.."
          />
        <Input 
          className="demo-input-class"
          width={250}
          addonBefore="Buy"
          addonAfter="Apple"
          showClear={true}
          value={this.state.input}
          autoFocus={true}
          onChange={e => {
            this.setState({ input: e.target.value});
          }}
          placeholder="Write down your comments.."
          />
        <div className="step-container">
          <Steps current={current} status={status}>
            <Steps.Step title="第一步" description="分享邀请码给好友" />
            <Steps.Step title="第二步" description="订购时输入你的邀请码" />
            <Steps.Step title="第三步" description="获得有赞E卡奖励" />
          </Steps>
          <button className="bxu-btn" style={{ margin: '10px 0 0 30px' }} onClick={this.nextStep}>下一步</button>
        </div>
        <div className="step-container">
          <Steps className="vertical-step" direction="vertical" current={current} status={status}>
            <Steps.Step title="第一步" description="分享邀请码给好友" />
            <Steps.Step title="第二步" description="订购时输入你的邀请码" />
            <Steps.Step title="第三步" description="获得有赞E卡奖励" />
          </Steps>
          <button className="bxu-btn" style={{ margin: '10px 0 0 30px' }} onClick={this.nextStep}>下一步</button>
        </div>
        <div className="step-container">
          <Steps className="breadcrumb-demo-container" current={current} type="breadcrumb"
             onStepChange={this.onStepChange} >
            <Steps.Step title="登录有赞账号" />
            <Steps.Step title="选择门店" />
            <Steps.Step title="绑定门店" />
            <Steps.Step title="完成" />
          </Steps>
        </div>
      </div>
  
    );
  }
}

export default LayoutDemo;
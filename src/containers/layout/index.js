import React from 'react';
import Layout from '../../components/layout';
import './layout.scss';

import Input from '../../components/input';

const { Col, Row } = Layout;

class LayoutDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {input: ''};
  }
  render() {
    return (
      <div className="_layout_demo_container">
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
        <Input 
          addonBefore="活捉"
          addonAfter="吕布"
          showClear={true}
          value={this.state.input}
          autoFocus={true}
          onChange={e => {
            console.log('is from clear button:' + !!e.fromClearButton);
            this.setState({ input: e.target.value});
          }}
          placeholder="Write down your comments.."
          />
      </div>
  
    );
  }
}

export default LayoutDemo;
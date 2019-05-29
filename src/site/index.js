import React from 'react';

import navData from './data/sideNav';
import Header from './header';
import SideNav from './sideNav';

import Layout from '../components/layout';
// import DemoMarkdown from './pages/affixDemo';

import './style/index.scss';

const { Col, Row } = Layout;

class Site extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchContent: ''};
  }

  handleSearch = (val) => {
    this.setState({searchContent: val.target.value});
  }

  render() {
    let { searchContent } = this.state;
    const { children, location, match } = this.props;

    return (
      <div className="official-demo_container">
        <Header
          navData={navData}
          handleSearch={this.handleSearch}
          searchContent={searchContent}
          location={location}
          match={match}/>
        <Row>
          <Col offset={2} span={3}>
            <div className="sidebar-container">
              <SideNav navData={navData} match={match}/>
            </div>
          </Col>
          <div className="content-container">
            {children}
          </div>
        </Row>
      </div>
    );
  }
}

export default Site;
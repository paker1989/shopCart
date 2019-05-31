import React from 'react';

import navData from './data/sideNav';
import Header from './header';
import Footer from './footer';
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

  /**
   * @description may needed if parent need
   */
  passRef = (ref) => {
    if (this.props.getRef) {
      this.props.getRef(ref);
    }
  }

  render() {
    let { searchContent } = this.state;
    const { children, location, match } = this.props;

    return (
      <div className="official-demo_container" ref={this.passRef}>
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
        <Footer />
      </div>
    );
  }
}

export default Site;
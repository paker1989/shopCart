import React from 'react';

import SideNav from './sideNav';
import navData from './sideNavData';
import Header from './header';
import Footer from './footer';

import Layout from '../../components/layout';
import CodeHighlighter from './utils/CodeHighlighter';

import SiteConfig  from './site.config';

import './style/index.scss';

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
        <div className="main-container">
          <div className="sidebar-container">
            <SideNav navData={navData} match={match}/>
          </div>
          <div className="content-container">
            {children}
          </div>
        </div>
        <Footer />
        <CodeHighlighter />
      </div>
    );
  }
}

Site.SiteConfig = SiteConfig;

export default Site;
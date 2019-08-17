import React from 'react';

import SideNav from '../components/sideNav';
import navData from '../assets/scripts/sideNavData';
import Header from '../components/header';
import Footer from '../components/footer';

import CodeHighlighter from '../components/common/codeHighlighter';

import SiteConfig  from '../assets/scripts/site.config';

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
import React from 'react';

import navData from './data/sideNav';
import Header from './header';
import SideNav from './sideNav';

import './index.scss';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({searchContent: ''});
  }

  handleSearch = (val) => {
    this.setState({searchContent: val.target.value});
  }

  render() {
    let { searchContent } = this.state;

    return (
      <div className="official-demo_container">
        <Header
          handleSearch={this.handleSearch}
          searchContent={searchContent}/>
        <div className="sidebar-container">
          <SideNav navData={navData}/>
        </div>
      </div>
    );
  }
}

export default Demo;
import React from 'react';

import Header from './header';
import SideNav from './sideNav';

import './index.scss';

// import data from './data/sideNav.json';
let data = require('json!./data/sideNav.json');

console.log(data);

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
    // console.log(data);

    return (
      <div className="official-demo_container">
        <Header
          handleSearch={this.handleSearch}
          searchContent={searchContent}/>
        <div className="sidebar-container">
          <SideNav />
        </div>
      </div>
    );
  }
}

export default Demo;
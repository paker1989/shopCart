import React from 'react';
import SearchInput from '../../components/searchInput';
import Layout from '../../components/layout';

import './header.scss';
import logo from '../data/logo1.png';

console.log(logo);

const { Col, Row } = Layout;

class DemoHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { searchContent, handleSearch } = this.props;

    return (
      <div className="header_container">
        <div className="logo_container">
          <img src={logo}/>
        </div>          
        <div className="search_input_container">
          <SearchInput 
            placeholder="搜索组件..."
            onChange={handleSearch}
            value={searchContent}
            width={250}/>
        </div>
      </div>
    );
  }
}

export default DemoHeader;
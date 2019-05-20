import React from 'react';
import SearchInput from '../../components/searchInput';
import './header.scss';

class DemoHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { searchContent, handleSearch } = this.props;

    return (
      <div className="header_container">
        <div className="logo_container"></div>
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
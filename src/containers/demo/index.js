import React from 'react';
import SearchInput from '../../components/searchInput';

class Demo extends React.Component {

  render() {
    return (
      <div className="official-demo_container">
        <div className="header_container">
          <div className="logo_container"></div>
          <div className="search_input_container">
            <SearchInput />
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
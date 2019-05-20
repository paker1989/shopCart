import React from 'react';
import SearchInput from '../../components/searchInput';
import './demo.scss';

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
        <div className="header_container">
          <div className="logo_container"></div>
          <div className="search_input_container">
            <SearchInput 
              // className="demo-search-input"
              placeholder="搜索组件..."
              onChange={this.handleSearch}
              value={searchContent}
              width={250}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
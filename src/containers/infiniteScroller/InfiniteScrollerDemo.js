import React from 'react';
import InfiniteScroller from '../../components/infiniteScroller';
import Card from '../../components/card';

class InfiniteScrollerDemo extends React.Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  loadMore(closeLoading) {
    const { list } = this.state;
    const latestList = list.slice(list.length - 10);
    const newList = latestList.map(item => item + 10);

    setTimeout(() => {
      this.setState({
        list: [...list, ...newList]
      });
      closeLoading && closeLoading();
    }, 500);

  }

  render() {
    const { list } = this.state;
    return (
      <InfiniteScroller
        className="infinite-scroller-demo"
        useWindow={false}
        loader={(<div className="loading">Loading...</div>)}
        loadMore={this.loadMore.bind(this)}
      >
        {
          list.map(item => <Card key={item}>{item}</Card>)
        }
      </InfiniteScroller>
    );
  }
}

export default InfiniteScrollerDemo;
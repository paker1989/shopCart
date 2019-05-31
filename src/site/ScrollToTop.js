import React from "react";
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.PureComponent {

  componentDidUpdate(prevProps) {
    console.log('yes');
    if (prevProps.location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
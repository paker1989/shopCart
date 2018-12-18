class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    //props.location是router内components自带的。
    if (prevProps.location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const App = () => (
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
)

//or
<ScrollToTop />
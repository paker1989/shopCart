 class Tooltip extends React.Component {
   constructor(props) {
     super(props);
     this.state = { clientX: 0,
                    clientY: 0, 
                    timer: null, 
                    node: null,
                    // containerNode: null,
                    isVisible: false,
                   };
   }

   componentDidMount() {
    let node = ReactDOM.findDOMNode(this.props.showComponent);

    node.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    node.addEventListener('mousemove', this.handleMouseEnter.bind(this));
    node.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.setState({ node });
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    let { node } = this.state;
    ['mouseenter', 'mousemove'].forEach(e => {
      node.removeEventListener(e, this.handleMouseEnter);
    })
    node.removeEventListener('mouseleave', this.handleMouseLeave);
  }

   handleMouseEnter(event) {
     if (this.state.timer) {
       clearTimeout(this.state.timer);
     }
     let newTimer = setTimeout(() => {
       this.setState({
         isVisible: true,
         clientX: event.clientX + 2,
         clientY: event.clientY + 2
       })
     }, 100);

     this.setState({
       timer: newTimer
     })
   }

   handleMouseLeave() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }

    let newTimer = setTimeout(() => {
      this.setState({
        isVisible: false,
      })
    }, 100);

    this.setState({
      timer: newTimer
    })
  }

   render() {
     let { children, value } = this.props;
     let { clientX, clientY, isVisible } = this.state;
     let toolTipStyle = { left: clientX,
                          top: clientY, 
                          visibility: isVisible? 'visible': 'hidden'
                        };
     return (
       <div className="__tooltip_container" style={toolTipStyle}>
         {value}
         {children}
       </div>
     );
   }
 }

 class App extends React.Component {
   render() {
     return (
       <div className="container">
         <Tooltip showComponent={this} value="check this out">
           sdsdsd
         </Tooltip>
       </div>
     );
   }
 }

 ReactDOM.render(
   <App />,
   document.getElementById('root')
 );

 /*
  .container {
    position: relative;
    width: 200px;
    height: 200px;
    margin-top: 100px;
    margin-left: 100px;
    border: 1px solid black;
  }

  .__tooltip_container {
    position: fixed;
    top: 0;
    left: 0;
    padding: 5px;
    background: black;
    color: white;
  }
 */
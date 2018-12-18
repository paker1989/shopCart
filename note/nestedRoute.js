import { BrowserRouter, Switch, Route, Link, NavLink} from 'react-router-dom';


export default () => {
  <BrowserRouter>
    <div>
      <Link to="/invoice1">Invoicie 1</Link>    
      <Link to="/invoice2">Invoicie 2</Link>  
    </div>
    <Route path="/invoice" render={ ({ match }) => (
      <div>
        <Route path={match.url + "/carnitas"} component={Carnitas}/>
      </div>
    )}/>
  </BrowserRouter>
}
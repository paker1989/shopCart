import React from "react";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";
  
import Site from "./pages/Site";
import ScrollToTop from "./components/common/ScrollToTop";
import { getFullPath } from "./utils/addRoute";
import navData from "./router/navData";


class App extends React.Component {
    
    render() {
        return (
            <Router basename="/">
                <ScrollToTop>
                    <Switch>
                        <Route
                            path={Site.SiteConfig.prefix}
                            render={({ match, ...routeProps }) => (
                                <Site match={match} {...routeProps}>
                                    {navData.map(data => renderComponent(match, data))}
                                </Site>
                            )}
                        />
                        <Redirect from="*" to="/demo" />
                    </Switch>
                </ScrollToTop>
            </Router>
        );
    }
}

function renderComponent(match, data) {
    const { path, source } = data;
    return (
        <Route
            key={`route-${path}`}
            path={getFullPath(match, path)}
            component={source}
        />
    );
}

export default App;

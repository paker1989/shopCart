import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import ShopCart from "./pages/home";

console.log(process.env.NODE_ENV);

class App extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <Router basename="/">
                    <Switch>
                        <Route path="/shopCart" component={ShopCart} />
                        <Redirect from="*" to="/shopCart" />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;

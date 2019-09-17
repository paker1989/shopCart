import * as React from 'react';
import { Provider } from 'react-redux';
import Store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import CalBody from './components/calBody';

import './assets/style/app.scss';

class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <Router basename="/">
                    <div className="calendar">
                        <div className="calendar-header">
                            <Header />
                        </div>
                        <div className="calendar-body">
                            <CalBody />
                        </div>
                        <div className="calendar-footer" />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

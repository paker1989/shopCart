import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import CalBody from './components/calBody';

import './assets/style/app.scss';

class App extends React.Component {
    render() {
        return (
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
        );
    }
}

export default App;

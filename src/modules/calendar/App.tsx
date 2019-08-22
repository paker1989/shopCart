import * as React from 'react';
// import { BrowserRouter as Router, Route, } from "react-router-dom";
import Header from './components/header';
import CalBody from './components/calBody';

import './assets/style/app.scss';

class App extends React.Component {
    render() {
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <Header />
                </div>
                <div className="calendar-body">
                    <CalBody />
                </div>
                <div className="calendar-footer" />
            </div>
        );
    }
}

export default App;

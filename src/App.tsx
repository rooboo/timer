import React, { Component } from 'react';
import './App.scss';
import Timer from './Timer';

interface AppProps {
    title?: string;
}

interface AppState {
    time: number;
}

class App extends Component<AppProps, AppState> {
    state: AppState = {
        time: 0,
    };

    getClickHandler() {
        return () => this.setState({ time: Math.floor(Math.random() * 10) });
    }

    render() {
        return (
            <div className='App'>
                <Timer time={this.state.time} />
                <button onClick={this.getClickHandler()}>set</button>
            </div>
        );
    }
}

export default App;

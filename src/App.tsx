import React, { Component } from 'react';
import './App.scss';
import Timer from './Timer';

interface AppProps {
    title?: string;
}

interface AppState {
    time: number;
    show: boolean;
}

class App extends Component<AppProps, AppState> {
    state: AppState = {
        time: 0,
        show: true,
    };

    getClickHandler() {
        return () =>
            this.setState({
                ...this.state,
                time: Math.floor(Math.random() * 10),
            });
    }

    private getToggleShowHandler() {
        return () =>
            this.setState({
                ...this.state,
                show: !this.state.show,
            });
    }

    render() {
        return (
            <div className='App'>
                <div>Dieses Programm soll den Lifecycle einer React Komponente verdeutlichen.</div>
                {this.state.show && <Timer time={this.state.time} />}
                <button onClick={this.getClickHandler()}>set</button>
                <button onClick={this.getToggleShowHandler()}>toggle</button>
            </div>
        );
    }
}

export default App;

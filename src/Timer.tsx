import * as React from 'react';

interface TimerProps {
    time: number;
}

interface TimerState {
    initial: number;
    time: number;
}

export default class Timer extends React.Component<TimerProps, TimerState> {
    private interval: NodeJS.Timer | undefined;

    constructor(props: TimerProps) {
        super(props);
        console.log('Constructor');
        this.state = { initial: 0, time: 0 };
    }

    static getDerivedStateFromProps(props: TimerProps, state: TimerState): TimerState | null {
        console.log('getDerivedStateFromProps');
        if (props.time !== state.initial) {
            return {
                initial: props.time,
                time: props.time,
            };
        }
        return null;
    }

    render() {
        console.log('render');
        return <div>{this.state.time}</div>;
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.interval = setInterval(() => this.setState((state) => ({ ...state, time: state.time + 1 })), 1000);
    }

    shouldComponentUpdate(nextProps: Readonly<TimerProps>, nextState: Readonly<TimerState>, nextContext: Date): boolean {
        console.log('shouldComponentUpdate');
        // we only render component when time is divided by 2
        return nextState.time % 2 === 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSnapshotBeforeUpdate(prevProps: Readonly<TimerProps>, prevState: Readonly<TimerState>): Date | null {
        console.log('getSnapshotBeforeUpdate');
        return new Date();
    }

    componentDidUpdate(prevProps: Readonly<TimerProps>, prevState: Readonly<TimerState>, snapshot?: Date) {
        console.log('componentDidUpdate');
        if (prevState.initial !== this.state.initial) {
            console.log(`${snapshot} Zeit wurde zurückgesetzt`);
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount', JSON.stringify(this.state));
        clearInterval(this.interval);
    }
}

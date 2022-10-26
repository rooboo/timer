import * as React from 'react';

interface TimerProps {
    time: number;
}

interface TimerState {
    initial: number;
    time: number;
}

type Context = {
    context: number;
};

export default class Timer extends React.Component<TimerProps, TimerState> {
    constructor(props: TimerProps) {
        super(props);
        console.log('Constructor');
        this.state = { initial: 0, time: 0 };
    }

    /**
     * Used to check if the props changed
     * Don't trigger side effect here, since this could lead to inconsistencies.
     */
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

    /**
     * Used to display the component in the browser
     */
    render() {
        console.log('render');
        return <div>{this.state.time}</div>;
    }

    /**
     *Here you can trigger asynchronous requests to servers etc. Side effects allowed.
     */
    componentDidMount() {
        console.log('componentDidMount');
        setInterval(() => this.setState((state) => ({ time: state.time + 1 })), 1000);
    }

    /**
     * Returns true if the component has to be rendered again after a call of setState
     * @param nextProps
     * @param nextState
     * @param nextContext
     */
    shouldComponentUpdate(nextProps: Readonly<TimerProps>, nextState: Readonly<TimerState>, nextContext: Context): boolean {
        console.log('shouldComponentUpdate', nextContext);
        // we only render component when time is divided by 2
        return nextState.time % 2 === 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSnapshotBeforeUpdate(prevProps: Readonly<TimerProps>, prevState: Readonly<TimerState>): Context | null {
        console.log('getSnapshotBeforeUpdate');
        return {
            context: 3,
        };
    }
}

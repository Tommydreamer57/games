import React, { Component, createRef } from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.wait = this.props.wait || 1000;
        this.time = props.time + this.wait;
        this.display = createRef();
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        this.countDown();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    countDown() {
        let { wait } = this;
        this.time -= wait;
        if (this.time <= 0 && typeof this.props.onEnd === 'function') this.props.onEnd();
        else {
            let totalSeconds = ~~(this.time / 1000);
            let minutes = ~~(totalSeconds / 60);
            let seconds = ~~(totalSeconds - minutes * 60);
            this.display.current.innerHTML = `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
            this.timeout = setTimeout(this.countDown, wait);
        }
    }

    render() {
        return <div ref={this.display} />
    }
}

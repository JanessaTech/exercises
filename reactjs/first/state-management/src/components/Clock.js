import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
        //setInterval( () => this.setTime(), 1000);
    }
    componentDidMount() {
        this.setTimeRef = setInterval(() => this.setTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.setTimeRef)
    }

    setTime() {
        console.log(this.state.date);
        this.setState((state, props) => (
            {
                date: new Date()
            }
        ))
    }

    render() {
        return (
            <div><p>The current time is {this.state.date.toString()}</p></div>
        );
    }
}

export default Clock;
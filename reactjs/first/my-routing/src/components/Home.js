import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>Welcome to the React tutorial</p>
                <p><Link to="/list">Click here</Link> to view expense list</p>
                <p><Link to="/add">Click here</Link> to add new expenses</p>
            </div>
        )
    }
}

export default Home;
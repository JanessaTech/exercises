import React from 'react';

class SquareV1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="square" onClick={() => this.props.onClick()}><img src={getPic(this.props.value)} width="100" height="100"/></div>
        )
    }
}

function getPic(value) {
    switch (value) {
        case true : return "images/tuzi.png"
        case false : return "images/wugui.png"
        default: return "images/blank.png"
    }
}

export default SquareV1
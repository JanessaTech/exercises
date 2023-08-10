import React from 'react';
import './layout/board.css'
import Square from "./square";

class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    renderSquare(i) {
      return <Square value={this.props.status[i]} onClick={() => this.props.onClick(i)}/>
    }

    render() {
        return (
            <div id="board">
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

function hasWinner(status) {
    const poss = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for( let i = 0; i < poss.length; i++) {
        const [a, b, c] = poss[i]
        var same = isSame(status[a], status[b], status[c])
        if (same) return true
    }
    return false
}

function isSame(a, b, c) {
    if ((a === true && b === true && c === true) || (a === false && b === false && c === false)) return true
    return false
}

export default Board
import React from 'react';
import './layout/board.css'
import SquareV1 from "./squareV1";

class BoardV1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status : new Array(9).fill(null),
            next: false,
            cur: null,
            cnt:0,
            reset: false
        }
    }

    handleClick(i) {
        console.log("handleClick(" + i + ") in Board")
        if (hasWinner(this.state.status) || this.state.status[i] != null || this.state.cnt >= 9) return
        let newStatus = this.state.status
        newStatus[i] = this.state.next
        this.setState({
            status : newStatus,
            cur: this.state.next,
            next: !this.state.next,
            cnt: this.state.cnt+1,
            reset: this.state.cnt === 0 ? true : this.state.reset
        })
    }

    renderSquare(i) {
      return <SquareV1 value={this.state.status[i]} onClick={() => this.handleClick(i)}/>
    }

    getPlayerName(flag) {
        if (flag) return "小白兔"
        return "乌龟"
    }

    getButtonText(flag) {
        if(flag) return "乌龟先开始"
        return "小白兔先开始"
    }

    handleBtn = (e) => {
        if (this.state.reset) {
            this.setState({
                status : new Array(9).fill(null),
                next: false,
                cur: null,
                cnt:0,
                reset: false
            })
        } else {
            this.setState({
                status : new Array(9).fill(null),
                next: true,
                cur: null,
                cnt:0,
                reset: true
            })
        }
    }

    render() {
        console.log(this.state)
        const winner = hasWinner(this.state.status)

        let des = ""
        if (winner) {
            des = this.getPlayerName(this.state.cur) + "赢了！"
        } else if(this.state.cnt < 9){
            des = "下一步轮到" + this.getPlayerName(this.state.next)
        } else {
            des = "游戏结束！"
        }

        return (
            <div>
                <div id="gametitle">小白兔vs乌龟</div>
                <div id="info">{des}</div>
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
                <div id="bts">
                    <button id="btn" onClick={this.handleBtn}>{this.state.reset? "重置" : this.getButtonText(this.state.next)}</button>
                </div>
                <div id="steps">
                    <ul>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                        <li><a href="#">aaaa</a></li>
                    </ul>
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

export default BoardV1
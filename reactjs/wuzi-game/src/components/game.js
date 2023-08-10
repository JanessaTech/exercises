import React from 'react';
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [
                new Array(9).fill(null)
            ],
            stepNumber: 0,
            next: false,
            cur: null,
            reset: false
        }
    }

    handleClick(i) {
        console.log("handleClick(" + i + ") in Game")
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const curStatus = history[history.length - 1].slice() // a shadow copy of the latest status
        if (hasWinner(curStatus) || curStatus[i] != null || this.state.stepNumber >= 9) return

        let newStatus = curStatus
        newStatus[i] = this.state.next
        this.setState({
            history : this.state.history.concat([newStatus]),
            stepNumber : this.state.stepNumber + 1,
            cur: this.state.next,
            next: !this.state.next,
            reset: this.state.stepNumber === 0 ? true : this.state.reset
        })
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
                history : [
                    new Array(9).fill(null)
                ],
                stepNumber: 0,
                next: false,
                cur: null,
                reset: false
            })
        } else {
            this.setState({
                history : [
                    new Array(9).fill(null)
                ],
                stepNumber:0,
                next: true,
                cur: null,
                reset: true
            })
        }
    }

    moveTo(i) {
        this.setState({
            history : this.state.history.slice(0, i + 1),
            stepNumber:i,
        })
    }
    render() {
        console.log(this.state)
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const curStatus = history[history.length - 1]
        const winner = hasWinner(curStatus)

        const moves = history.map((step, index) => {
            const desc = index ? "Move to " + index : "Game starts"
            return (<li key={index}><a href="#" onClick={() => this.moveTo(index)}>{desc}</a></li>)
        })

        let des = ""
        if (winner) {
            des = this.getPlayerName(this.state.cur) + "赢了！"
        } else if(this.state.stepNumber < 9){
            des = "下一步轮到" + this.getPlayerName(this.state.next)
        } else {
            des = "游戏结束！"
        }

        return (
            <div>
                <div id="gametitle">小白兔vs乌龟</div>
                <div id="info">{des}</div>
                    <Board status={curStatus} onClick={ (i) => this.handleClick(i)}/>
                <div id="bts">
                    <button id="btn" onClick={this.handleBtn}>{this.state.reset? "重置" : this.getButtonText(this.state.next)}</button>
                </div>
                <div id="steps">
                    <ul>
                        {moves}
                    </ul>
                </div>
            </div>

        );
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

export default Game
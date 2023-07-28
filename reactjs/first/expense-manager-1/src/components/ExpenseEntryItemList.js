import React from 'react';
import './ExpenseEntryItemList.css';

class ExpenseEntryItemList extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind();
        this.handleMouseLeave = this.handleMouseLeave.bind();
        this.handleMouseOver = this.handleMouseOver.bind();
        this.state = {
            items: this.props.items
        }
    }

    componentDidMount() {
        console.log("ExpenseEntryItemList :: Initialize :: componentDidMount :: Component mounted");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("ExpenseEntryItemList :: Update :: shouldComponentUpdate invoked :: Before update");
        return true;
    }

    static getDerivedStateFromProps(props, state) {
        // how do we use getDerivedStateFromProps??
        console.log("ExpenseEntryItemList :: Initialize / Update :: getDerivedStateFromProps :: Before update");
        let newState = {
            items: props.items
        }
        if(props.onDelete != null) {
            return newState;
        }
        return null;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("ExpenseEntryItemList :: Update :: getSnapshotBeforeUpdate :: Before update");
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("ExpenseEntryItemList :: Update :: componentDidUpdate :: Component updated");
    }

    componentWillUnmount() {
        console.log("ExpenseEntryItemList :: Remove :: componentWillUnmount :: Component unmounted");
    }

    handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight");
    }

    handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight");
    }

    handleMouseOver(e) {
        console.log("The mouse is at (" + e.clientX + ", " + e.clientY + ")");
    }

    handleDelete = (id, e) => {
        e.preventDefault();
        if(this.props.onDelete != null) {
            this.props.onDelete(id, e);
        } else {
            this.setState((state, props) => {
            let items = [];

            state.items.forEach((item, idx) => {
                if(item.id !== id)
                    items.push(item)
            })
            return {
                items: items
            };
        })
        }
        console.log(id);
    }

    getTotal() {
        let total = 0;
        for(var i = 0; i < this.state.items.length; i++) {
            total += this.state.items[i].amount
        }
        return total;
    }

    render() {
        const list = this.state.items.map( item =>
            <tr key = {item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{new Date(item.spendDate).toDateString()}</td>
                <td>{item.category}</td>
                <td><a href="#" onClick={(e) =>  this.handleDelete(item.id, e)}>Remove</a></td>
            </tr>
        );
        return (
                <table onMouseOver={this.handleMouseOver}>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                        <tr>
                            <td colSpan="1" style={{ textAlign: "right" }}>Total Amount</td>
                            <td colSpan="4" style={{ textAlign: "left" }}>
                                {this.getTotal()}
                            </td>
                        </tr>
                    </tbody>
                </table>

        );
    }
}

export  default ExpenseEntryItemList
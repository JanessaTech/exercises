import React from 'react'

import './ExpenseEntryItem.css'
import stylesDemo from './ExpenseEntryItem.module.css'

import FormattedMoney from './FormattedMoney'
import FormattedDate from './FormattedDate'

const itemStyle = {
    color: 'red',
    fontSize: '14px'
}
class ExpenseEntryItem extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    /* case1:
    render() {
        return (
            <div style={ itemStyle }>
                <div><b>Item:</b> <em>Mango Juice</em></div>
                <div><b>Amount:</b> <em>30.00</em></div>
                <div><b>Spend Date:</b> <em>2020-10-10</em></div>
                <div><b>Category:</b> <em>Food</em></div>
            </div>);
    }*/

    /* case2:
    render() {
        return (
            <div style={
                {
                    color: 'brown',
                    fontSize: '14px'
                }
            }>
                <div><b>Item:</b> <em>Mango Juice</em></div>
                <div><b>Amount:</b> <em>30.00</em></div>
                <div><b>Spend Date:</b> <em>2020-10-10</em></div>
                <div><b>Category:</b> <em>Food</em></div>
            </div>);
    };*/

    /* case3:
    render() {
        return (
            <div className={stylesDemo.itemStyle}>
                <div><b>Item:</b> <em>Mango Juice</em></div>
                <div><b>Amount:</b> <em>30.00</em></div>
                <div><b>Spend Date:</b> <em>2020-10-10</em></div>
                <div><b>Category:</b> <em>Food</em></div>
            </div>
        );
    }*/

    /* case4
    render() {
        return (
            <div>
                <div><b>Item</b> <em>{this.props.name}</em></div>
                <div><b>Amount</b> <em>{this.props.amount}</em></div>
                <div><b>Spend Date:</b>
                    <em>{this.props.spendDate.toString()}</em></div>
                <div><b>Category:</b> <em>{this.props.category}</em></div>
            </div>
        );
    }*/

    /* case5
    render() {
        return (
            <div>
                <div><b>Item</b> <em>{this.props.data.name}</em></div>
                <div><b>Amount</b> <em>{this.props.data.amount}</em></div>
                <div><b>Spend Date:</b>
                    <em>{this.props.data.spendDate.toString()}</em></div>
                <div><b>Category:</b> <em>{this.props.data.category}</em></div>
            </div>
        );
    }*/

    render() {
        return (
            <div>
                <div><b>Item:</b> <em>{this.props.data.name}</em></div>
                <div><b>Amount:</b>
                    <em>
                        <FormattedMoney value={this.props.data.amount} />
                    </em>
                </div>
                <div><b>Spend Date:</b>
                    <em>
                        <FormattedDate value={this.props.data.spendDate} />
                    </em>
                </div>
                <div><b>Category:</b>
                    <em>{this.props.data.category}</em></div>
            </div>
        );
    }


}

export default ExpenseEntryItem
import React from 'react';
import { Link } from 'react-router-dom'

class ExpenseEntryItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Expenses</h1>
                <p><Link to="/add">Click here</Link> to add new expenses</p>
                <div>
                    Expense list
                </div>
            </div>
        )
    }
}
export default ExpenseEntryItemList;
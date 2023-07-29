import React from 'react';
import { Link } from 'react-router-dom'

class ExpenseEntryItemForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Add Expense item</h1>
                <p><Link to="/list">Click here</Link> to view new expense list</p>
                <div>
                    Expense form
                </div>
            </div>
        )
    }
}
export default ExpenseEntryItemForm;
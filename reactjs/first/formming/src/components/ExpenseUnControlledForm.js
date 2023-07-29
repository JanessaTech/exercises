import './ExpenseForm.css'
import React from 'react';
class ExpenseUnControlledForm extends React.Component {
    constructor(props) {
        super(props);
        this.nameInputRef = React.createRef();
        this.amountInputRef = React.createRef();
        this.dateInputRef = React.createRef();
        this.categoryInputRef = React.createRef();
    }

    onSubmit = (e) => {
        e.preventDefault();

        let item = {};

        item.name = this.nameInputRef.current.value;
        item.amount = this.amountInputRef.current.value;
        item.date = this.dateInputRef.current.value;
        item.category = this.categoryInputRef.current.value;

        alert(JSON.stringify(item));
    }

    render() {
        return (
            <div id="expenseForm">
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label for="name">Title</label>
                    <input type="text" id="name" name="name" placeholder="Enter expense title" ref={this.nameInputRef}/>

                    <label for="amount">Amount</label>
                    <input type="number" id="amount" name="amount" placeholder="Enter expense amount" ref={this.amountInputRef}/>

                    <label for="date">Spend Date</label>
                    <input type="date" id="date" name="date" placeholder="Enter date" ref={this.dateInputRef}/>

                    <label for="category">Category</label>
                    <select id="category" name="category" ref={this.categoryInputRef}>
                        <option value="">Select</option>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Academic">Academic</option>
                    </select>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default ExpenseUnControlledForm
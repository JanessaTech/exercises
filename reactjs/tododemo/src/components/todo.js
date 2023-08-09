import React from 'react';

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [
            ]
        }
    }

    componentDidMount = () => {
        this.setState({
            todos : [
                {id : 1, title : 'to do 1', body : 'This is the of body of to-do 1'},
                {id : 2, title : 'to do 2', body : 'This is the of body of to-do 2'},
                {id : 3, title : 'to do 3', body : 'This is the of body of to-do 3'},
                {id : 4, title : 'to do 4', body : 'This is the of body of to-do 4'}
            ]
        })
    }

    render() {
        return (
            <div id="todo">
                <ul>
                    {
                        this.state.todos.map((todo) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))
                    }

                </ul>
            </div>
        )
    }
}

export default ToDo
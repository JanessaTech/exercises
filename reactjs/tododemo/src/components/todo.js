import React from 'react';
import Dialog from 'rc-dialog'
import 'rc-dialog/assets/index.css';

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [
            ],
            viewOpen : false,
            editOpen: false,
            deleteOpen : false,
            id : '',
            title: '',
            body: ''

        }
    }

    componentDidMount = () => {
        this.setState({
            todos : [
                {id : 0, title : 'to do 1', body : 'This is the body of to-do 0'},
                {id : 1, title : 'to do 1', body : 'This is the body of to-do 1'},
                {id : 2, title : 'to do 2', body : 'This is the body of to-do 2'},
                {id : 3, title : 'to do 3', body : 'This is the body of to-do 3'},
                {id : 4, title : 'to do 4', body : 'This is the body of to-do 4'}
            ]
        })
    }

    handleView = (e, key) => {
        this.setState({viewOpen: true})
        console.log(`key=${key}`)
        const found = this.state.todos.filter((a) => a.id === key)[0]
        console.log(found)
        this.setState({id: found.id, title: found.title, body: found.body})
    }

    handleEdit = (e, key) => {
        this.setState({editOpen: true})
        const found = this.state.todos.filter((a) => a.id === key)[0]
        console.log(found)
        this.setState({id : found.id, title: found.title, body: found.body})
    }

    handleEditChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(`e.target.name is changed to ${e.target.value}`)
    }

    submitEdit = (e) => {
        console.log('submit changes after editing')
        console.log('call restful here ..')
        let newTodos = []
        //
        for(let todo of this.state.todos) {
            if (todo.id !== this.state.id) {
                newTodos.push(todo)
            } else {
                newTodos.push({id: this.state.id, title: this.state.title, body: this.state.body})
            }
        }
        console.log('newTodos')
        console.log(newTodos)
        this.setState({todos: newTodos, editOpen: false})
    }


    handleDelete = (e, key) => {
        this.setState({deleteOpen: true, toDelete: key})
    }

    submitDelete = (e) => {
        console.log(`todo #${this.state.toDelete} will be deleted`)
        let newTodos = []
        for (let todo of this.state.todos) {
            if (todo.id !== this.state.toDelete) {
                newTodos.push(todo)
            }
        }
        this.setState({todos : newTodos, deleteOpen : false})
    }

    cancelDelete = () => {
        this.setState({deleteOpen : false})
    }
    closeView = (e) => {
        this.setState({viewOpen: false})
    }
    closeEdit = (e) => {
        this.setState({editOpen: false})
    }
    closeDelete = (e) => {
        this.setState({deleteOpen: false})
    }
    render() {
        const viewDialog =
            <Dialog
                visible={this.state.viewOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeView}
                forceRender
                style={{width:600}}>
                <h1>View Todo modal</h1>
                <label>Id</label> : <span>{this.state.id}</span>
                <p/>
                <label>Title</label> : <span>{this.state.title}</span>
                <p/>
                <label>Body</label> : <span>{this.state.body}</span>

            </Dialog>
        const editDialog =
            <Dialog
                visible={this.state.editOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeEdit}
                forceRender
                style={{width:600}}>
                <h1>Edit Todo modal</h1>
                <label>Id</label> : <span>{this.state.id}</span>
                <p/>
                <label>Title</label> : <input name = 'title' value={this.state.title} onChange={this.handleEditChange}/>
                <p/>
                <label>Body</label> : <input name = 'body' value={this.state.body} onChange={this.handleEditChange}/>
                <p/>
                <button onClick={this.submitEdit}>Submit</button>
            </Dialog>
        const deleteDialog =
            <Dialog
                visible={this.state.deleteOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeDelete}
                forceRender
                style={{width:600}}>
                <h1>Delete #{this.state.toDelete}Todo modal</h1>
                <button onClick={this.submitDelete}>Submit</button> <button onClick={this.cancelDelete}>Cancel</button>
            </Dialog>


        return (
            <div id="todo">
                <ul>
                    {
                        this.state.todos.map((todo) => (
                            <li key={todo.id}><span>#{todo.id}</span>&nbsp;&nbsp; <span>{todo.title}</span> <a href="#" onClick={(e) => this.handleView(e, todo.id)}>view</a>&nbsp;&nbsp;<a href="#" onClick={(e) => this.handleEdit(e, todo.id)}>edit</a>&nbsp;&nbsp;<a href="#" onClick={ (e) => this.handleDelete(e, todo.id)}>delete</a></li>
                        ))
                    }

                </ul>
                {viewDialog}
                {editDialog}
                {deleteDialog}
            </div>
        )
    }
}

export default ToDo
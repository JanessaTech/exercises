import React from 'react';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : props.user,
            id : props.user.id,
            name : props.user.name,
            password : props.user.password,
            age : props.user.age,
            email : props.user.email
        }
    }

    componentDidMount = () => {
        console.log('request data from server')
    }

    handleChange = (event) => {
        console.log('click field ' + [event.target.name] + ', new value is ' + event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Click submit')
        const data = {
            id : this.state.id,
            name : this.state.name,
            password : this.state.password,
            age : this.state.age,
            addr : this.state.addr
        }
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data))
    }

    render() {
        return (
            <div id="acc">
                <form onSubmit={this.handleSubmit}>
                    <label> ID : </label> <input name="id" readOnly={true} value={this.state.id}/>
                    <p/>
                    <label>User Name: </label> <input name="name" value={this.state.name} readOnly={true}/>
                    <p/>
                    <label>Password: </label> <input name="password" value={this.state.password} type={"password"} onChange={this.handleChange}/>
                    <p/>
                    <label>Age: </label><input name="age" value={this.state.age} onChange={this.handleChange}/>
                    <p/>
                    <label>Email: </label><input name="email" value={this.state.addr} onChange={this.handleChange}/>
                    <p/>
                    <button type="submit" disabled={this.state.name && this.state.password ? '' : 'disabled'}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Account
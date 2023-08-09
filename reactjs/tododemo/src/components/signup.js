import React, {Component} from 'react';
import {Navigate} from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            name : '',
            password: '',
            age: '',
            addr: ''
        }
        this.handleClick = this.handleClick.bind()
        this.handleChange = this.handleChange.bind()
    }

    handleClick = (event) => {
        console.log('click signup button')
        const data = {
            id : 1,
            name : this.state.name,
            password : this.state.password,
            age: this.state.age,
            addr : this.state.addr
        }
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data))
        this.setState({redirect : true})
    }
    handleChange = (event) => {
        console.log('The value of ' + [event.target.name] + " is changed to " + event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (
            <div>
                <form>
                    <label>User Name: </label>
                    <input name={"name"} placeholder={"Please input username"} onChange={this.handleChange}/>
                    <p/>
                    <label>Password: </label>
                    <input name={"password"} placeholder={"Please input password"} type={'password'} onChange={this.handleChange}/>
                    <p/>
                    <label>Age: </label> <input name={"age"} placeholder={"0"} onChange={this.handleChange}/>
                    <p/>
                    <label>Address: </label><input name={"addr"} placeholder={"Please input address"} onChange={this.handleChange}/>
                    <p/>
                    <button type={"button"} onClick={this.handleClick} disabled={this.state.name && this.state.password ? '' : 'disabled'}>Signup</button>
                </form>
                {this.state.redirect && <Navigate to="/login" replace={true} />}
            </div>
        );
    }
}

export default Signup;
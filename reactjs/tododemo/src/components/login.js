import React from 'react';
import { Navigate } from "react-router-dom";
import {
    Link
} from 'react-router-dom'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth : false,
            name : '',
            password: '',
            error : ''
        }
        this.handleSubmit = this.handleSubmit.bind()
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log('click login button')
        const user = localStorage.getItem('user')
        console.log(user)
        if (user) {
            const userObj = JSON.parse(user)
            if (this.state.name === userObj.name && this.state.password === userObj.password) {
                this.setState({
                    isAuth : true,
                })
            } else {
                this.setState({
                    error : 'Input wrong user name and password'
                })
            }
        } else {
            this.setState({
                error: 'Please signup first'
            })
        }

    }

    handleChange = (event) =>{
        console.log('The value of ' + [event.target.name] + " is changed to " + event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error && <h2>{this.state.error}</h2>
                    }
                    <label>User Name: </label>
                    <input name={"name"} onChange={this.handleChange}/>
                    <p/>
                    <label>Password: </label>
                    <input type={"password"} name={"password"} onChange={this.handleChange}/>
                    <p/>
                    <button type={'submit'}>Login</button>   <Link to='/signup'>SignUp</Link>
                </form>

                {this.state.isAuth && <Navigate to="/" replace={true} />}
            </div>
        )
    }
}
export default Login;
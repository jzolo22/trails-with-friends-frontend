import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions'


class LoginForm extends Component {
    
    state = {
        username: "",
        password: "", 
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler({user: this.state})
    }
    
    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange}/>
                    <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange}/>
                <button id="login-btn">Submit</button>
                </form>
            </div>
        )
    }
}

const mdp = (dispatch) => {
    return {submitHandler: (userInfo) => dispatch(loginUser(userInfo)) }
}

const msp = (state) => {
    return { user: state.user }
}


export default connect(msp, mdp)(LoginForm)
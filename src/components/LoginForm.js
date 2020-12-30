import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions'


class LoginForm extends Component {
    
    state = {
        username: "",
        password: "", 
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        if (token) {
          fetch("http://localhost:3000/profile", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`} 
          })
            .then(r => r.json())
            .then((user) => console.log("user in login form", user))
      } else {
        this.props.history.push('/users/new')
      }
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
                <h1>Login Form!</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange}/>
                    <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.onChange}/>
                <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mdp = (dispatch) => {
    return {submitHandler: (userInfo) => dispatch(loginUser(userInfo)) }
}

const msp = (state) => {
    console.log("Current redux state", state)
    return { user: state.user }
}


export default connect(msp, mdp)(LoginForm)
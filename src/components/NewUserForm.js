
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {newUser} from '../redux/actions'
import {withRouter} from 'react-router-dom'


class NewUserForm extends Component {
    
    state = {
        name: "",
        age: "",
        city: "",
        username: "",
        password: "",
        password_confirmation: ""
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler({user: this.state})
        this.props.history.push('/')
    }
    
    render() {
        return (
            <div className="new-user-form">
                <h1>Sign Up</h1>
                <form className="form" onSubmit={this.submitHandler}>
                    <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                    <input type="text" placeholder="age" name="age" value={this.state.age} onChange={this.onChange}/>
                    <input type="text" placeholder="city" name="city" value={this.state.city} onChange={this.onChange}/>
                    <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange}/>
                    <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange}/>
                    <input type="password" placeholder="confirm password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.onChange}/>
                <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mdp = (dispatch) => {
    return {submitHandler: (userObj) => dispatch(newUser(userObj)) }
}

const msp = (state) => {
    return { user: state.user }
}


export default withRouter(connect(msp, mdp)(NewUserForm))


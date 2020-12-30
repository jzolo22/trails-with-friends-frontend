
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {newUser} from '../redux/actions'


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

        // this.setState({
        //     name: "",
        //     length: "",
        //     location: "",
        //     duration: "",
        //     difficulty: ""
        // })
        
    }
    
    render() {
        return (
            <div>
                <h1>New User Form!</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                    <input type="text" placeholder="age" name="age" value={this.state.age} onChange={this.onChange}/>
                    <input type="text" placeholder="city" name="city" value={this.state.city} onChange={this.onChange}/>
                    <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange}/>
                    <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.onChange}/>
                    <input type="text" placeholder="confirm password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.onChange}/>
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
    console.log("Current redux state", state)
    return { user: state.user }
}


export default connect(msp, mdp)(NewUserForm)


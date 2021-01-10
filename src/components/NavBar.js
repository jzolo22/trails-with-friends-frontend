
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {logout} from '../redux/actions'

class Navbar extends Component {
  
    localLogout = (e) => {
        this.props.logout()
        this.props.history.push("/")
    }
    
    render() {
        return (
            <nav id="nav">
                
                {this.props.user ? 
                    <NavLink to={`/users/${this.props.user.user.id}`}>
                        <span>Hello {this.props.user.user.name}</span>
                    </NavLink>
                : null
                }
                
                <NavLink to="/">
                    <span>Home</span>
                </NavLink>
                
                
                {this.props.user ? 
                    <>
                    
                    <NavLink to="/trails">
                        <span>All Trails</span>
                    </NavLink>
                    <span onClick={this.localLogout}>Log Out</span>
                    </>
                 : 
                    <>
                    <NavLink to={'/users/new'}>
                        Sign Up
                    </NavLink>
                    <NavLink to={'/'}>
                        Log In
                    </NavLink>
                    </>
                }
            </nav>
        )
    }
}

const msp = (state) => {
    return { user: state.user }
}

const mdp = (dispatch) => {
    return {logout: () => dispatch(logout())}
}


export default withRouter(connect(msp, mdp)(Navbar))



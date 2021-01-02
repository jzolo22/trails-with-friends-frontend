
import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import NewUserForm from './NewUserForm'
import Profile from './Profile'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import {getUsers} from '../redux/actions'


class HomePage extends React.Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    allUsers = () => {
        return this.props.users.map(user => {
            return(
            <NavLink to={`/users/${user.id}`} key={user.id}>
                <li>{user.name}</li>
            </NavLink>
            )
        })
    }

    // <Profile key={user.id} userObj={user} />

    render() {
        console.log(this.props)
        return (
            <div>
                <Switch>
                    <Route path="/users/new" render={() => <NewUserForm />} />
                    <Route path="/users/:id" render={(routerProps) => {
                        const id = parseInt(routerProps.match.params.id)
                        let user = this.props.users.find(user => user.id === id)

                        if (user) {
                            return <Profile userObj={user} currentUser={this.props.user}/>
                        } else {
                            return <h2>Loading...</h2>
                        }
                    }} />
                    <Route path="/" render={(routerProps) => {
                            if (this.props.user) {
                                return (
                                    <>
                                        {this.allUsers()}
                                    </>
                                )
                            } else {
                                return (
                                    <LoginForm routerProps={routerProps} />
                                )
                            }
                        }} 
                    />
                </Switch>
            </div>
    )
    }
}

const msp = (state) => {
    return { users: state.users }
}

const mdp = (dispatch) => {
    return {fetchUsers: () => dispatch(getUsers())}
}

export default connect(msp, mdp)(HomePage)


import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import NewUserForm from './NewUserForm'
import Profile from './Profile'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import {getUsers, getUserTrails} from '../redux/actions'


class HomePage extends React.Component {

   
    componentDidMount() {
        this.props.fetchUsers()
        this.props.fetchUserTrails()
    }

    totalMiles = (user) => {
        let totalMiles = 0;
        user.trails.forEach(userTrail => totalMiles += userTrail.trail_length)

        return totalMiles
    }

    allUsers = () => {
        let usersSortedByMileage = this.props.users.sort((a, b) => this.totalMiles(b) - this.totalMiles(a)) 
        
        return usersSortedByMileage.map(user => {
            return(
            <NavLink to={`/users/${user.id}`} key={user.id}>
                <li>{user.name} - {this.totalMiles(user)} miles</li>
            </NavLink>
            )
        })
    }

    recentTrails = () => {
        let userTrailsSortedByDate = this.props.user_trails.sort((a, b) => new Date(b.date) - new Date(a.date)) 

        return userTrailsSortedByDate.map(userTrail => {
            return (
                <>
            <li>{userTrail.user.user_name} hiked {userTrail.trail.trail_name} on {userTrail.date}</li> 
            <br/>
            </>
            )
        })
    }


    render() {
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
                                    <div className="feed">
                                        <h3>Recently Hiked Trails:</h3>
                                        {this.recentTrails()}
                                    </div>
                                        
                                    <div className="leaderboard">
                                        <h3>LeaderBoard</h3>
                                        {this.allUsers()}
                                    </div>
                                        
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
    return { 
        users: state.users,
        user_trails: state.user_trails
     }
}

const mdp = (dispatch) => {
    return {
        fetchUsers: () => dispatch(getUsers()),
        fetchUserTrails: () => dispatch(getUserTrails()),
    }
}

export default connect(msp, mdp)(HomePage)

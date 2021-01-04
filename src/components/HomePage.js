
import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import NewUserForm from './NewUserForm'
import Profile from './Profile'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import {getUsers, getUserTrails} from '../redux/actions'
import moment from 'moment';
moment().format();



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
            <>
                <li>
                    <NavLink to={`/users/${user.id}`} key={user.id}>{user.name}</NavLink> 
                    - {this.totalMiles(user)} miles</li>
            </>
            )
        })
    }

    recentTrails = () => {
        let userTrailsSortedByDate = this.props.user_trails.sort((a, b) => new Date(b.date) - new Date(a.date)) 

        return userTrailsSortedByDate.map(userTrail => {
            return (
                <>
            <li>
                <img src={userTrail.trail.trail_image} alt={userTrail.trail.trail_name}/>
                    <br />
                <NavLink to={`/users/${userTrail.user.user_id}`} key={userTrail.user.user_id}>
                    {userTrail.user.user_name}
                </NavLink>  
                    <span> hiked </span> 
                <NavLink to={`/trails/${userTrail.trail.trail_id}`} key={userTrail.trail.trail_id}>
                    {userTrail.trail.trail_name}  
                </NavLink>
                    <br />
                <span id="time"> {moment(userTrail.date).fromNow()}</span>
                </li> 
            <br/>
            </>
            )
        })
    }


    render() {
        return (
            <>
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
                                    <div className="grid">
                                        <div id="feed">
                                            <h3>Recently Hiked Trails:</h3>
                                            {this.props.user_trails.length > 0 ? this.recentTrails() : <h1>Loading</h1>}
                                            
                                        </div>
                                            
                                        <div id="leaderboard">
                                            <h3>Leaderboard</h3>
                                            {this.allUsers()}
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <LoginForm routerProps={routerProps} />
                                )
                            }
                        }} 
                    />
                </Switch>
            </>
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

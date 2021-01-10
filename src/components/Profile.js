import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {getTrails, addUserTrail, deleteUserTrail, userInfoChange} from '../redux/actions'



class Profile extends React.Component {
    
    state = {
        userId: this.props.userObj.id,
        name: this.props.userObj.name,
        city: this.props.userObj.city
    }
    
    myTrails = () => {
        let currentProfileTrails = this.props.user_trails.filter(userTrail => userTrail.user.user_id === this.props.userObj.id)

        currentProfileTrails.sort((a, b) => new Date(b.date) - new Date(a.date))

        return currentProfileTrails.map(userTrail => {
            return (
                <div className="outer-container">
                    <img className="profile-img" src={userTrail.trail.trail_image}alt={userTrail.trail.trail_name} />

                    <div className="overlay">
                        <div className="image-title">
                            <NavLink to={`/trails/${userTrail.trail.trail_id}`} key={userTrail.trail.trail_id}>
                                {userTrail.trail.trail_name}
                            </NavLink>
                        </div>
                        <div className="image-descripton">
                            <br /> 
                            <span id="time"> {moment(userTrail.date).fromNow()}</span>
                            <br />
                            <br /> 
                            {this.props.userObj.id === this.props.currentUser.user.id ?
                                <button onClick={this.onDelete} value={userTrail.id}>Delete Trail</button> :
                                null
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    totalMiles = () => {
        let currentProfileTrails = this.props.user_trails.filter(userTrail => userTrail.user.user_id === this.props.userObj.id)
        let totalMiles = 0;
        currentProfileTrails.forEach(userTrail => totalMiles += userTrail.trail.trail_length)

        let name
        if (this.props.userObj.id === this.props.currentUser.user.id) {
            name = "You have"
        } else {
            name = `${this.props.userObj.name} has`
        }

        return <h3>{name} hiked {totalMiles.toFixed(1)} miles</h3>
    }

    onDelete = (e) => {
        let userTrailId = parseInt(e.target.value)
        this.props.deleteUserTrail(userTrailId)
    }

    componentDidMount(){
        this.props.fetchTrails()
    }

    dropDownTrail(){
        let filteredTrails = this.props.trails
        filteredTrails.sort((a, b) => a.name.localeCompare(b.name))
        return filteredTrails.map(trail => {
               return <option value={trail.id}>{trail.name}</option>
            })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const trailId = parseInt(e.target.trails.value)
        let date = new Date()

        this.props.addUserTrail({ 
            trail_id: trailId,
            user_id: this.props.currentUser.user.id,
            date: date
        })
    }

    onInfoChangeSubmit = (e) => {
        e.preventDefault()
        this.props.userInfoChange(this.state)
    }

    onEditChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    editPopup = () => (
        <Popup trigger={<button id="edit-btn"> Edit Your Info</button>} position="right" >
          <div>
                <form className="form" onSubmit={this.onInfoChangeSubmit}>
                    <label>Name</label>
                    <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onEditChange}/><br/><br/>
                    <label id="city">  City</label>
                    <input type="text" placeholder="city" name="city" value={this.state.city} onChange={this.onEditChange}/>
                    <button>Submit Changes</button>
                </form></div>
        </Popup>
      );

    render(){
        return(
            <div className="profile" style={{textAlign: "center"}}>
                {this.props.currentUser ? 
                this.props.userObj.id === this.props.currentUser.user.id ?
                <>
                    <h1 className="profile_name"> {this.props.currentUser.user.name} </h1>
                    <h2 className="profile_header">from {this.props.currentUser.user.city}</h2>
                </> : 
                <>
                    <h1 style={{fontSize: "60px", marginBottom: "0px"}} className="profile_header"> {this.props.userObj.name} </h1>
                    <h2 className="profile_header"> {this.props.userObj.age} years old</h2>
                    <h2 className="profile_header">from {this.props.userObj.city}</h2>
                </>
                 : null }
                {this.props.currentUser ? 
                <>
                {this.props.userObj.id === this.props.currentUser.user.id ? 
                        <>
                            {this.editPopup()}
                            {this.totalMiles()}
                            <>
                            <form onSubmit={this.onSubmit}>
                                <select name="trails">
                                    {this.dropDownTrail()}
                                </select>
                                <button>Add Trail</button>
                            </form>
                            </>
                        </>
                    : null
                } 
                </>
                : null }
                {this.props.currentUser ? 
                    <> 
                    <div className="picture-grid">
                        {this.myTrails()}
                    </div>
                    </>
                : null}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        trails: state.trails,
        user_trails: state.user_trails 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrails: () => dispatch(getTrails()),
        addUserTrail: (userTrailObj) => dispatch(addUserTrail(userTrailObj)),
        deleteUserTrail: (userTrailId) => dispatch(deleteUserTrail(userTrailId)),
        userInfoChange: (updatedUserObj) => dispatch(userInfoChange(updatedUserObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
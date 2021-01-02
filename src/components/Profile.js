import React from 'react'
import {connect} from 'react-redux'
import {getTrails, addUserTrail} from '../redux/actions'

class Profile extends React.Component {

    state = {
        trails: ""
    }
    
    myTrails = () => {
        console.log(this.props.userObj.trails)
        return this.props.userObj.trails.map(userTrail => {
            return (
                <li>{userTrail.trail_name}
                    <br /> 
                    Date: {userTrail.trail_date}
                </li>
            )
        })
    }

    componentDidMount(){
        this.props.fetchTrails()
    }

    dropDownTrail(){
        return this.props.trails.map(trail => {
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

    render(){
        return(
            <div>
                <h2>{this.props.userObj.name}</h2>
                <h2>{this.props.userObj.age} years old</h2>
                <h2>from {this.props.userObj.city}</h2>
                <h2>Trails:</h2>
                {this.myTrails()}
                {this.props.userObj.id === this.props.currentUser.user.id ? 
                    <>
                    <h1>Add new trail</h1>
                    <form onSubmit={this.onSubmit}>
                        <select name="trails">
                            {this.dropDownTrail()}
                        </select>
                        <button>Add Trail</button>
                    </form>
                    </>
                : <h1> </h1> 
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Current redux state", state)
    return { 
        trails: state.trails, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrails: () => dispatch(getTrails()),
        addUserTrail: (userTrailObj) => dispatch(addUserTrail(userTrailObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
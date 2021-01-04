import React from 'react'
import { addUserTrail } from '../redux/actions'
import {connect} from 'react-redux'

class TrailShow extends React.Component  {

    addUserTrail = () => {
        let date = new Date()

        this.props.addUserTrail({ 
            trail_id: this.props.trailObj.id,
            user_id: this.props.currentUser.user.id,
            date: date
        })
        // console.log(this.props)
    }
    
    render(){
        return (
            <div className="trail-show">
                <img src={this.props.trailObj.image_url} alt={this.props.trailObj.name} />
                <h2>{this.props.trailObj.name}</h2>
                <h3>{this.props.trailObj.length} miles</h3>
                <h4>{this.props.trailObj.duration} minutes</h4>
                <p>{this.props.trailObj.location}</p>
                <p>Difficulty level: {this.props.trailObj.difficulty}</p>
                <button onClick={this.addUserTrail}>Add To My Trails</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserTrail: (userTrailObj) => dispatch(addUserTrail(userTrailObj))
    }
}

export default connect(null, mapDispatchToProps)(TrailShow)
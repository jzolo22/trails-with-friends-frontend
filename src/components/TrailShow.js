import React from 'react'
import { addUserTrail } from '../redux/actions'
import {connect} from 'react-redux'
// import REACT_APP_GOOGLE_API_KEY from '../.env'

class TrailShow extends React.Component  {

    state = {
        clicked: false
    }

    addUserTrail = () => {
        let date = new Date()
        this.props.addUserTrail({ 
            trail_id: this.props.trailObj.id,
            user_id: this.props.user.user.id,
            date: date
        })
        window.alert("Trail added to your list!")
    }

    clickDirections = () => {
        this.setState({clicked: !this.state.clicked})
    }

    hours = (mins) => {
        let hours = Math.floor(mins / 60) 
        let minutes = mins % 60
        if (hours === 1) {
            return `${hours} hour and ${minutes} minutes to complete` 
        } else if (minutes === 1) {
           return `${hours} hours and ${minutes} minute to complete` 
        } else {
            return `${hours} hours and ${minutes} minutes to complete` 
        }
        
    }
    
    render(){
        console.log(this.props)
        return (
            <div className="trail-show">
                <h1>{this.props.trailObj.name}</h1>
                <h2>in {this.props.trailObj.location}</h2>
                <button onClick={this.addUserTrail}>Add To My Trails</button>
                <img src={this.props.trailObj.image_url} alt={this.props.trailObj.name} />
                <h3>Length: {this.props.trailObj.length} miles</h3>
                <h4>{this.hours(this.props.trailObj.duration)} </h4>
                <h3>Difficulty level: {this.props.trailObj.difficulty}</h3>

                {this.state.clicked? null :
                <iframe className="map"  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${this.props.trailObj.name} ${this.props.trailObj.location}&zoom=8`}> </iframe>
                }   

                {this.state.clicked? 
                    <iframe className="map" src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_API_KEY}&origin=${this.props.user.user.city}&destination=${this.props.trailObj.name} ${this.props.trailObj.location}&mode=driving&zoom=8`}> 
                </iframe>
                : null}
                
                
                    <br />
                <button onClick={this.clickDirections}>
                    {this.state.clicked ? "See trail on map" : "Get directions" }
                    </button>


                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserTrail: (userTrailObj) => dispatch(addUserTrail(userTrailObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailShow)
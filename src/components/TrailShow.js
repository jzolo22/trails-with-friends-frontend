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
    
    render(){
        console.log(this.props)
        return (
            <div className="trail-show">
                <img src={this.props.trailObj.image_url} alt={this.props.trailObj.name} />
                <h2>{this.props.trailObj.name}</h2>
                <h3>{this.props.trailObj.length} miles</h3>
                <h4>{this.props.trailObj.duration} minutes</h4>
                <p>{this.props.trailObj.location}</p>
                <p>Difficulty level: {this.props.trailObj.difficulty}</p>

                {this.state.clicked? null :
                <iframe id="map" style={{width: "250", height: "250"}} src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${this.props.trailObj.name} ${this.props.trailObj.location}`}> </iframe>
                }   

                {this.state.clicked? 
                    <iframe id="map" style={{width: "250", height: "250"}} src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_API_KEY}&origin=${this.props.user.user.city}&destination=${this.props.trailObj.name} ${this.props.trailObj.location}&mode=driving`}> 
                </iframe>
                : null}
                
                

                <button onClick={this.clickDirections}>
                    {this.state.clicked ? "See trail on map" : "Get directions" }
                    </button>


                <button onClick={this.addUserTrail}>Add To My Trails</button>
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
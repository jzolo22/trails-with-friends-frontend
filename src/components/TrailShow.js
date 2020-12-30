import React from 'react'

function TrailShow(props) {

    return (
        <div>
            <h2>{props.trailObj.name}</h2>
            <h3>{props.trailObj.length} miles</h3>
            <h4>{props.trailObj.duration} minutes</h4>
            <p>{props.trailObj.location}</p>
            <p>Difficulty level: {props.trailObj.difficulty}</p>
        </div>
    )
}

export default TrailShow
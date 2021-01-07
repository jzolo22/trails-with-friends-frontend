import React from 'react'
import {NavLink} from 'react-router-dom'

function Trail(props){

    return (
        <div>
            <NavLink to={`/trails/${props.trailObj.id}`}>
                <span id="trail-name">{props.trailObj.name}</span> 
            </NavLink> 
            <span> - {props.trailObj.location}</span>
        </div>
    )
}

export default Trail
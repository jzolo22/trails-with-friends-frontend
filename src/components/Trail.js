import React from 'react'
import {NavLink} from 'react-router-dom'

function Trail(props){

    return (
        <NavLink to={`/trails/${props.trailObj.id}`}>
            <h1>{props.trailObj.name}</h1>
        </NavLink>
    )
}

export default Trail
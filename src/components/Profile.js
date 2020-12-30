import React from 'react'

class Profile extends React.Component {

    myTrails = () => {
        return this.props.userObj.trails.map(trail => {
            return (
                <li>{trail.name}</li>
            )
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
            </div>
        )
    }
}

export default Profile
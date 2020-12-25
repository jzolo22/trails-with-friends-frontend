import React from 'react'
import Trail from '../components/Trail'

class TrailsList extends React.Component {

    state = {
        allTrails: []
    }

    componentDidMount(){
        fetch("http://localhost:3000/trails")
            .then(r => r.json())
            .then(trailsArray => {
                this.setState({allTrails: trailsArray})
            })
    }

    allTrails = () => {
        return this.state.allTrails.map(trail => <Trail key={trail.id} trailObj={trail} />)
    }
    
    render(){
        return(
        this.allTrails()
    )
    }
    

}

export default TrailsList

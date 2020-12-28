import React from 'react'
import Trail from '../components/Trail'
import TrailForm from '../components/TrailForm'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class TrailsList extends React.Component {

    // state = {
    //     allTrails: []
    // }

    // componentDidMount(){
    //     fetch("http://localhost:4000/trails")
    //         .then(r => r.json())
    //         .then(trailsArray => {
    //             this.setState({allTrails: trailsArray})
    //         })
    // }

    allTrails = () => {
        return this.props.trails.map(trail => <Trail key={trail.id} trailObj={trail} />)
    }
    
    render(){
        // console.log("TrailsList Props: ", this.props)
        return(
            <Switch>
                <Route path="/trails/new" render={() => <TrailForm />}/>
                <Route path="/trails/:id" render={() => <h1>trail show page</h1>}/>
                <Route path="/trails" render={() => {
                    return (
                        <>
                       <TrailForm />
                        {this.allTrails()}
                        </>
                    )
                    
                }}/>
            </Switch>
        )
    }
    
}

const mapStateToProps = (state) => {
    // console.log("Current redux state", state)
    return { trails: state.trails }
}

export default connect(mapStateToProps)(TrailsList)

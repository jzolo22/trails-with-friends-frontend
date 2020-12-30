import React from 'react'
import Trail from '../components/Trail'
import TrailForm from '../components/TrailForm'
import TrailShow from '../components/TrailShow'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {getTrails} from '../redux/actions'

class TrailsList extends React.Component {

    // state = {
    //     allTrails: []
    // }

    componentDidMount(){
        this.props.fetchTrails()
    }

    allTrails = () => {
        return this.props.trails.map(trail => <Trail key={trail.id} trailObj={trail} />)
    }
    
    render(){
        return(
            <Switch>
                <Route path="/trails/new" render={() => <TrailForm />}/>
                <Route path="/trails/:id" render={(routerProps) => {
                    const id = parseInt(routerProps.match.params.id)
                    
                    let trail = this.props.trails.find(trail => trail.id === id)

                    if (trail) {
                        return <TrailShow trailObj={trail}/>
                    } else {
                        return <h2>Loading...</h2>
                    }
                }}/>
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
    console.log("Current redux state", state)
    return { trails: state.trails }
}

const mapDispatchToProps = (dispatch) => {
    return {fetchTrails: () => dispatch(getTrails())}
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailsList)

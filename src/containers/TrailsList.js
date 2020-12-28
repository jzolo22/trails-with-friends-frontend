import React from 'react'
import Trail from '../components/Trail'
import TrailForm from '../components/TrailForm'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {getTrails} from '../redux/actions'

class TrailsList extends React.Component {

    // state = {
    //     allTrails: []
    // }

    componentDidMount(){
        this.props.fetchNotes()
    }

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

const mapDispatchToProps = (dispatch) => {
    return {fetchNotes: () => dispatch(getTrails())}
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailsList)

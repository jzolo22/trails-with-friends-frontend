import React from 'react'
import Trail from '../components/Trail'
import TrailForm from '../components/TrailForm'
import TrailShow from '../components/TrailShow'
import SearchForm from '../components/SearchForm'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {getTrails} from '../redux/actions'

class TrailsList extends React.Component {

    state = {
        searchByName: "",
        searchByDifficulty: ""
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        this.props.fetchTrails()
    }

    allTrails = () => {
        let filteredTrails
        if (this.state.searchByName !== "" && this.state.searchByDifficulty !== "") {
            filteredTrails = this.props.trails.filter(trail => trail.name.toLowerCase().includes(this.state.searchByName.toLowerCase()) && trail.difficulty.toLowerCase().includes(this.state.searchByDifficulty.toLowerCase()))
        } else if (this.state.searchByName !== "") {
            filteredTrails = this.props.trails.filter(trail => trail.name.toLowerCase().includes(this.state.searchByName.toLowerCase()))
        } else if (this.state.searchByDifficulty !== "") {
            filteredTrails = this.props.trails.filter(trail => trail.difficulty.toLowerCase().includes(this.state.searchByDifficulty.toLowerCase()))
        } else {
            filteredTrails = this.props.trails
            filteredTrails.sort((a, b) => a.name.localeCompare(b.name))
        }
        return filteredTrails.map(trail => <Trail key={trail.id} trailObj={trail} />)
    }
    
    // else if (this.state.searchByName !== "" && this.state.searchByDifficulty !== "") {
    //     filteredTrails = this.props.trails.filter(trail => {
    //         trail.name.toLowerCase().includes(this.state.searchByName.toLowerCase()) && trail.difficulty.toLowerCase().includes(this.state.searchByDifficulty.toLowerCase())
    //     })

    render(){
        return(
            <Switch>
                <Route path="/trails/new" render={() => <TrailForm />}/>
                <Route path="/trails/:id" render={(routerProps) => {
                    const id = parseInt(routerProps.match.params.id)
                    
                    let trail = this.props.trails.find(trail => trail.id === id)

                    if (trail) {
                        console.log(this.props)
                        return <TrailShow trailObj={trail} currentUser={this.props.user}/>
                    } else {
                        return <h2>Loading...</h2>
                    }
                }}/>
                <Route path="/trails" render={() => {
                    return (
                        <>
                        <SearchForm searchByName={this.state.searchByName} searchByDifficulty={this.state.searchByDifficulty} changeHandler={this.onChange}/>
                        <div className="trail-list">
                            {this.allTrails()}
                        </div>
                       <TrailForm />
                        </>
                    )
                    
                }}/>
            </Switch>
        )
    }
    
}

const mapStateToProps = (state) => {
    return { 
        trails: state.filteredTrails 
        // user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {fetchTrails: () => dispatch(getTrails())}
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailsList)

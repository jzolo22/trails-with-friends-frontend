import React from 'react'
import { connect } from 'react-redux'
import { addTrail } from '../redux/actions'

class TrailForm extends React.Component {

    state = {
        name: "",
        length: "",
        location: "",
        duration: "",
        difficulty: "",
        image_url: ""
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)

        // this.setState({
        //     name: "",
        //     length: "",
        //     location: "",
        //     duration: "",
        //     difficulty: ""
        // })
    }
    
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                <input type="text" placeholder="length (in miles)" name="length" value={this.state.length} onChange={this.onChange}/>
                <input type="text" placeholder="location (city, state)" name="location" value={this.state.location} onChange={this.onChange}/>
                <input type="text" placeholder="duration (in minutes)" name="duration" value={this.state.duration} onChange={this.onChange}/>

                <select name="difficulty" onChange={this.onChange}>
                    <option value="" disabled selected>select difficulty level:</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="difficult">hard</option>
                </select>

                <input type="text" placeholder="image URL" name="image_url" value={this.state.image_url} onChange={this.onChange}/>
                <button>Submit</button>
            </form>
        )
    }
}

const mdp = (dispatch) => {
    return {submitHandler: (trailObj) => dispatch(addTrail(trailObj)) }
}

export default connect(null, mdp)(TrailForm)
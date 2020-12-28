import React from 'react'

class TrailForm extends React.Component {

    state = {
        name: "",
        length: "",
        location: "",
        duration: "",
        difficulty: ""
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)

        this.setState({
            name: "",
            length: "",
            location: "",
            duration: "",
            difficulty: ""
        })
    }
    
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                <input type="text" placeholder="length" name="length" value={this.state.length} onChange={this.onChange}/>
                <input type="text" placeholder="location" name="location" value={this.state.location} onChange={this.onChange}/>
                <input type="text" placeholder="duration" name="duration" value={this.state.duration} onChange={this.onChange}/>
                <input type="text" placeholder="difficulty" name="difficulty" value={this.state.difficulty} onChange={this.onChange}/>
                <button>Submit</button>
            </form>
        )
    }
}

export default TrailForm
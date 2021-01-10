import React from 'react'

class SearchForm extends React.Component {

    localOnChange = (e) => {
        this.props.changeHandler(e)
    }
    
    render() {
        return (
        <form id="search-frm">
            <input 
                type="text" 
                name="searchByName"
                value={this.props.searchByName} placeholder="search by name" 
                onChange={this.props.changeHandler} />
            <select
                name="searchByDifficulty"
                onChange={this.props.changeHandler}
            >
                <option value = "">search by difficulty</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select> 
        </form>
        )
    }
}


export default SearchForm
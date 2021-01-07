import React from 'react'
import {connect} from 'react-redux'
// import {search} from '../redux/actions'

class SearchForm extends React.Component {

    localOnChange = (e) => {
        this.props.changeHandler(e)
    }
    

    render() {
        console.log(this.props.search)
        return (
        <form id="search-frm">
            <input 
                type="text" 
                name="searchByName"
                value={this.props.searchByName} placeholder="search by name" 
                onChange={this.props.changeHandler} />
            <select
                name="searchByDifficulty"
                // value={this.props.searchByDifficulty}
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

// const mapDispatchToProps = (dispatch) => {
//     return {search: (searchValue) => dispatch(search(searchValue))}
// }

export default SearchForm
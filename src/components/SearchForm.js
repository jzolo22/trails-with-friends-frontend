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
        <form>
            <input 
                type="text" 
                value={this.props.search} placeholder="search by title" 
                onChange={this.props.changeHandler} />
        </form>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {search: (searchValue) => dispatch(search(searchValue))}
// }

export default SearchForm
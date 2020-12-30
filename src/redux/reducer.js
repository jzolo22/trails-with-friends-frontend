import { combineReducers } from 'redux'

const initialState = {
    trails: [],
    user: null
}

function trailsReducer(state = initialState.trails, action) {
    switch (action.type) {
        case "add form":
            return [...state, action.payload]
        case "add_trails_from_fetch":
            return action.payload
        //edit trail?
        //delete trail?
        default:
            return state
    }
}

function usersReducer(state = initialState.user, action) {
    switch (action.type) {
        case "create user":
            return action.payload
            
        default:
            return state
    }
}

// usersReducer

const rootReducer = combineReducers({
    trails: trailsReducer,
    user: usersReducer
})

export default rootReducer 
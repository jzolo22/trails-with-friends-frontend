import { combineReducers } from 'redux'

const initialState = {
    trails: [],
    user: null,
    users: []
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

function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case "create user":
            return action.payload
        case "login user":
            return action.payload
            
        default:
            return state
    }
}

function usersReducer(state = initialState.users, action) {
    switch (action.type) {
        case "add_users_from_fetch":
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    trails: trailsReducer,
    user: userReducer,
    users: usersReducer
})



export default rootReducer 
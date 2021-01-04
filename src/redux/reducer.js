import { combineReducers } from 'redux'

const initialState = {
    trails: [],
    user: null,
    users: [],
    user_trails: []
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
        case "invalid user":
            return action.payload
        case "check_login":
            return action.payload
        case "logout":
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

function userTrailsReducer(state = initialState.user_trails, action) {
    switch (action.type) {
        case "add_user_trail":
            // console.log(action.payload)
            return [action.payload.user_trail, ...state]
            // return ["str1", "str2"]
        case "add_user_trails_from_fetch":
            return action.payload
        case "delete_user_trail":
            return state.filter(userTrail => userTrail.id !== action.payload)
        default:
            return state
    }
}



const rootReducer = combineReducers({
    trails: trailsReducer,
    user: userReducer,
    users: usersReducer,
    user_trails: userTrailsReducer
})



export default rootReducer 
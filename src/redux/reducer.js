import { combineReducers } from 'redux'

// const rootReducer = (currentState = {trails: []}, action) => {
//   console.log("action: ", action)
//   switch (action.type) {
//     case "add form":
//       return {...currentState, trails: [...currentState.trails, action.payload]}
//     case "add_trails_from_fetch":
//       return {...currentState, trails: action.payload}
//       default:
//         return currentState
//       }
//       // console.log("current state: ", currentState)
// }

const initialState = {
    trails: []
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

// usersReducer

const rootReducer = combineReducers({
    trails: trailsReducer
})

export default rootReducer 
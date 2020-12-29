

const rootReducer = (currentState = {trails: []}, action) => {
  console.log("action: ", action)
  switch (action.type) {
    case "add form":
      return {...currentState, trails: [...currentState.trails, action.payload]}
    case "add_trails_from_fetch":
      return {...currentState, trails: action.payload}
      default:
        return currentState
      }
      // console.log("current state: ", currentState)
}

export default rootReducer 
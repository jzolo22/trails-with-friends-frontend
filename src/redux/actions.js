export const addTrail = (trailObj) => {

    return function (dispatch) {
        fetch("http://localhost:3000/trails", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(trailObj)
        })
            .then(r => r.json())
            .then((trailObj) => dispatch({type: "add form", payload: trailObj}))
    }   
}

export const getTrails = () => {
    // console.log("first dispatch invoked")
    return function (dispatch) {
        // console.log("nested function invoked")
        fetch("http://localhost:3000/trails")
            .then(r => r.json())
            .then(trailsArr => dispatch({type: "add_trails_from_fetch", payload: trailsArr}))
    }
}

export const newUser = (userObj) => {
    return function (dispatch) {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userObj)
        })
            .then(r => r.json())
            .then((userObj) => dispatch({type: "create user", payload: userObj}))
    }   
}

export const loginUser = (userInfo) => {
    return function (dispatch) {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userInfo)
        })
            .then(r => r.json())
            .then((userInfo) => {
                console.log(userInfo)
                localStorage.setItem("token", userInfo.jwt)
                dispatch({type: "login user", payload: userInfo})
            })
    }   
}

export const getUsers = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/users")
            .then(r => r.json())
            .then(usersArr => dispatch({type: "add_users_from_fetch", payload: usersArr}))
    }
}

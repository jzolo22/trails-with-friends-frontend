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
                if(userInfo.message) {
                    window.alert(userInfo.message)
                    dispatch({type: "invalid user", payload: userInfo})
                } else {
                    localStorage.setItem("token", userInfo.jwt)
                    dispatch({type: "login user", payload: userInfo})
                }
            })
    }   
}

export const checkLogin = (token) => {
    return function (dispatch) {

        fetch("http://localhost:3000/profile", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`} 
        })
            .then(r => r.json())
            .then((user) => dispatch({type: "check_login", payload: user}))
    }

}

export const logout = () => {
    return function (dispatch) {
        localStorage.removeItem("token")
        // this.props.history.push('/')
        dispatch({type: "logout", payload: null})
    }

}

export const getUsers = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/users")
            .then(r => r.json())
            .then(usersArr => dispatch({type: "add_users_from_fetch", payload: usersArr}))
    }
}

export const addUserTrail = (userTrailObj) => {
    return function (dispatch) {
        fetch("http://localhost:3000/user_trails", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userTrailObj)
        })
            .then(r => r.json())
            .then((userTrailObj) => {
                    // window.alert("Trail added to your list!")
                    console.log(userTrailObj)
                    dispatch({type: "add_user_trail", payload: userTrailObj})
                })
            
    }   
}

export const deleteUserTrail = (userTrailId) => {
    return function (dispatch) {
        fetch(`http://localhost:3000/user_trails/${userTrailId}`, {
            method: "DELETE"
        })
            .then(dispatch({type: "delete_user_trail", payload: userTrailId}))      
    }

}

export const getUserTrails = () => {
    return function (dispatch) {
        fetch("http://localhost:3000/user_trails")
            .then(r => r.json())
            .then(userTrailsArr => dispatch({type: "add_user_trails_from_fetch", payload: userTrailsArr}))
    }
}

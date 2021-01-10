export const addTrail = (trailObj) => {

    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/trails", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(trailObj)
        })
            .then(r => r.json())
            .then((trailObj) => dispatch({type: "add form", payload: trailObj}))
    }   
}

export const getTrails = () => {
    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/trails")
            .then(r => r.json())
            .then(trailsArr => dispatch({type: "add_trails_from_fetch", payload: trailsArr}))
    }
}

export const newUser = (userObj) => {
    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userObj)
        })
            .then(r => r.json())
            .then((userObj) => {
                localStorage.setItem("token", userObj.jwt)
                dispatch({type: "create user", payload: userObj})
            })
    }   
}

export const loginUser = (userInfo) => {
    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userInfo)
        })
            .then(r => r.json())
            .then((userInfo) => {
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

        fetch("https://trails-with-friends.herokuapp.com/profile", {
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
        dispatch({type: "logout", payload: null})
    }

}

export const getUsers = () => {
    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/users")
            .then(r => r.json())
            .then(usersArr => dispatch({type: "add_users_from_fetch", payload: usersArr}))
    }
}

export const addUserTrail = (userTrailObj) => {
    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/user_trails", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userTrailObj)
        })
            .then(r => r.json())
            .then((userTrailObj) => {
                    dispatch({type: "add_user_trail", payload: userTrailObj})
                })
            
    }   
}

export const deleteUserTrail = (userTrailId) => {
    return function (dispatch) {
        fetch(`https://trails-with-friends.herokuapp.com/user_trails/${userTrailId}`, {
            method: "DELETE"
        })
            .then(dispatch({type: "delete_user_trail", payload: userTrailId}))      
    }

}

export const getUserTrails = () => {
    return function (dispatch) {
        fetch("https://trails-with-friends.herokuapp.com/user_trails")
            .then(r => r.json())
            .then(userTrailsArr => dispatch({type: "add_user_trails_from_fetch", payload: userTrailsArr}))
    }
}

export const userInfoChange = (updatedUserObj) => {
    return function (dispatch) {
        fetch(`https://trails-with-friends.herokuapp.com/${updatedUserObj.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(updatedUserObj)
        })
            .then(r => r.json())
            .then(updatedUser => dispatch({type: "update_user", payload: {user: updatedUser}}))
    }
}



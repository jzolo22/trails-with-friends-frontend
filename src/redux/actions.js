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
    console.log("first dispatch invoked")
    return function (dispatch) {
        console.log("nested function invoked")
        fetch("http://localhost:3000/trails")
            .then(r => r.json())
            .then(trailsArr => dispatch({type: "add_trails_from_fetch", payload: trailsArr}))
    }
}


export const addTrail = (trailObj) => ({type: "add form", payload: trailObj})

export const getTrails = () => {
    console.log("first dispatch invoked")
    return function (dispatch) {
        console.log("nested function invoked")
        fetch("")
            .then(r => r.json())
            .then(console.log)
    }
}
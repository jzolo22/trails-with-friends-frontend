import React from 'react'
import TrailsList from './TrailsList'
import { Switch, Route } from 'react-router-dom'

function MainContainer() {

    return (
        <Switch>
            {/* <Route path="/home" render={() => <h1>Login Page</h1>}/> */}
            <Route path="/trails" render={() => <TrailsList />} />
        {/* <TrailsList /> */}
        </Switch>
    )

}

export default MainContainer
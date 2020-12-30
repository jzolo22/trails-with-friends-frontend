
import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import NewUserForm from './NewUserForm'

function HomePage() {
    return (
        <div>
            <Switch>
                <Route path="/users/new" render={() => <NewUserForm />} />
                <Route path="/" render={() => 
                        <NavLink to="/users/new">
                            Signup!
                        </NavLink>
                    } 
                />
            </Switch>
        </div>
    )
}

export default HomePage

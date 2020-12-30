
import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import NewUserForm from './NewUserForm'
import LoginForm from './LoginForm'

function HomePage() {

    


    return (
        <div>
            <Switch>
                <Route path="/users/new" render={() => <NewUserForm />} />
                <Route path="/" render={(routerProps) => 
                        <>
                            <NavLink to="/users/new">
                                Signup!
                            </NavLink>
                            <LoginForm routerProps={routerProps} />
                        </>
                    } 
                />
            </Switch>
        </div>
    )
}

export default HomePage

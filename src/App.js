import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import TrailsList from './containers/TrailsList'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'

class App extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`} 
      })
        .then(r => r.json())
        .then((user) => this.setState({currentUser: user}))
  } else {
    this.props.history.push('/user/new')
  }
}

  logout = () => {
    localStorage.removeItem("token")
    this.props.history.push('/')
    this.setState({currentUser: null})
  }
  
  render() {
    return (
    <div>
      <NavBar 
        user={this.state.currentUser}
        logout={this.logout}
      />
      <Switch>
        <Route path="/trails" render={() => <TrailsList />} />
        <Route path="/" render={() => <HomePage user={this.state.currentUser}/>}/>
      </Switch>
    </div>
  );
  }
  
}

const msp = (state) => {
    return { user: state.user }
}

export default withRouter(connect(msp)(App));

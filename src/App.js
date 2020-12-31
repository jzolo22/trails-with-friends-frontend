import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import TrailsList from './containers/TrailsList'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'

class App extends React.Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`} 
      })
        .then(r => r.json())
        .then((user) => this.setState({user: user}))
  } else {
    this.props.history.push('/user/new')
  }
}
  
  render() {
    return (
    <div>
      <NavBar user={this.state.user}/>
      <Switch>
        <Route path="/trails" render={() => <TrailsList />} />
        <Route path="/" render={() => <HomePage />}/>
      </Switch>
    </div>
  );
  }
  
}

export default withRouter(App);

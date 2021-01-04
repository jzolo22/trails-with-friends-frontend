import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import TrailsList from './containers/TrailsList'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import {checkLogin} from './redux/actions'

class App extends React.Component {

  // state = {
  //   currentUser: null
  // }

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if (token) {
      this.props.checkLogin(token)
    } else {
      this.props.history.push('/')
    }
}

  // logout = () => {
  //   localStorage.removeItem("token")
  //   this.props.history.push('/')
  //   // this.setState({currentUser: null})
  // }
  
  render() {
    return (
    <div>
      <NavBar 
        // user={this.state.currentUser}
        logout={this.logout}
      />
      <Switch>
        <Route path="/trails" render={() => <TrailsList />} />
        <Route path="/" render={() => <HomePage />}/>
      </Switch>
    </div>
  );
  }
  
}

const msp = (state) => {
    return { user: state.user }
}

const mdp = (dispatch) => {
    return {checkLogin: (token) => dispatch(checkLogin(token))}
}

export default withRouter(connect(msp, mdp)(App));

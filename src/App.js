import './App.css';
import TrailsList from './containers/TrailsList'
import { Switch, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Switch>
            <Route path="/" render={() => <h1>Login Page</h1>}/>
            <Route path="/trails" render={() => <TrailsList />} />
        </Switch>
    </div>
  );
}

export default App;

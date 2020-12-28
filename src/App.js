import './App.css';
import TrailsList from './containers/TrailsList'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Switch>
            <Route path="/trails" render={() => <TrailsList />} />
            <Route path="/" render={() => <h1>Login Page</h1>}/>
        </Switch>
    </div>
  );
}

export default App;

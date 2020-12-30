import './App.css';
import { Switch, Route } from 'react-router-dom'

import TrailsList from './containers/TrailsList'
import HomePage from './components/HomePage'

function App() {

  

  return (
    <div>
      <Switch>
        <Route path="/trails" render={() => <TrailsList />} />
        <Route path="/" render={() => <HomePage />}/>
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import TeamsList from './components/TeamsList';
import UserAccount from './components/UserAccount';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TeamsList />
        </Route>
        <Route path="/user">
          <UserAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

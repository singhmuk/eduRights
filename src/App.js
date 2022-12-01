import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Routes from './components/routing/Routes';

function App() {
  return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path ="/" component={Dashboard} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
  );
}

export default App;

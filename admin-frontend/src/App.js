import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar';
import './App.css';
import SystemLogin from './page/SystemLogin'
import Home from './page/Package'
import PrivateRoute from './routeConfig/PrivateRoute'
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import 'react-notifications/lib/notifications.css';
import Sample from './page/Sample';

const App = () => {

  return (
    <BrowserRouter >
      <LoadingBar showFastActions className="loading-bar" />
      <Switch >
        <Route exact path="/login" render={(props) => <SystemLogin {...props} />} />
        <PrivateRoute exact path='/'>
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path='/sample'>
          <Sample />
        </PrivateRoute>
        {/* <Route exact path='/new' component={NewFeed} /> */}
      </Switch>
      <NotificationContainer/>
    </BrowserRouter>
  );
};

export default App;
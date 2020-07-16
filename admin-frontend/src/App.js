import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar';
import './App.css';
import SystemLogin from './page/SystemLogin'
import Home from './page/Package'
import PrivateRoute from './routeConfig/PrivateRoute'
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import 'react-notifications/lib/notifications.css';
import PackageDetail from './page/PackageDetail';
import NoMatch from './page/NoMatch';
import Staff from './page/Staff';
import AdminOnlyRoute from './routeConfig/AdminOnlyRoute';
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

        <PrivateRoute exact path='/package/:id'>
          <PackageDetail />
        </PrivateRoute>
        <AdminOnlyRoute exact path='/staff'>
          <Staff />
        </AdminOnlyRoute>
        <PrivateRoute exact path='/sample'>
          <Sample />
        </PrivateRoute>
        <PrivateRoute exact path="*">
          <NoMatch />
        </PrivateRoute>
      </Switch>
      <NotificationContainer />
    </BrowserRouter>
  );
};

export default App;
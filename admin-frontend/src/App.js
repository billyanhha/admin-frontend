import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar';
import './App.css';
import SystemLogin from './page/SystemLogin'
import Home from './page/Home'


const App = () => {

  return (
    <BrowserRouter >
      <LoadingBar showFastActions className="loading-bar" />
      <Switch >
        <Route exact path="/login" render={(props) => <SystemLogin {...props} />} />
        <Route exact path="/" render={(props) => <Home {...props} />} />
        {/* <Route exact path='/new' component={NewFeed} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
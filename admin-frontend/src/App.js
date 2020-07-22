import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import "./App.css";
import SystemLogin from "./page/SystemLogin";
import Home from "./page/Package";
import PrivateRoute from "./routeConfig/PrivateRoute";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "react-notifications/lib/notifications.css";
import PackageDetail from "./page/PackageDetail";
import ProfileStaff from "./page/Profile";
import MyAccount from "./page/MyAccount";
import NoMatch from "./page/NoMatch";
import Staff from "./page/Staff";
import AdminOnlyRoute from "./routeConfig/AdminOnlyRoute";
import Sample from "./page/Sample";
import Service from "./page/Service";
import Statistic from "./page/Statistic";

const App = () => {
    return (
        <BrowserRouter>
            <LoadingBar showFastActions className="loading-bar" />
            <Switch>
                <Route
                    exact
                    path="/login"
                    render={(props) => <SystemLogin {...props} />}
                />
                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>

                <PrivateRoute exact path="/package/:id">
                    <PackageDetail />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <ProfileStaff />
                </PrivateRoute>
                <PrivateRoute exact path="/account">
                    <MyAccount />
                </PrivateRoute>
                <AdminOnlyRoute exact path="/staff">
                    <Staff />
                </AdminOnlyRoute>
                <AdminOnlyRoute exact path="/service">
                    <Service />
                </AdminOnlyRoute>
                <PrivateRoute exact path="/statistic">
                    <Statistic />
                </PrivateRoute>
                <PrivateRoute exact path="/sample">
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

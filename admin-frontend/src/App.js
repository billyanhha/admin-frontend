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
import Doctor from "./page/Doctor";
import AdminOnlyRoute from "./routeConfig/AdminOnlyRoute";
import Service from "./page/Service";
import Statistic from "./page/Statistic";
import Customer from "./page/Customer";
import Form from "./page/Form";
import ForgotPassword from "./page/ForgotPassword";
import Notify from "./component/Notify";
import Notification from "./page/Notification";
import VerifyEmail from './page/VerifyEmail';

require('dotenv').config()


const App = () => {
    return (
        <BrowserRouter>
            <Notify />
            <LoadingBar showFastActions className="loading-bar" />
            <Switch>
                <Route exact path="/login" render={props => <SystemLogin {...props} />} />
                <Route exact path="/forgot-password/:token" render={props => <ForgotPassword {...props} />} />
                <Route exact path="/verify-email/:token" render={(props) => <VerifyEmail {...props} />} />

                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>
                <PrivateRoute exact path="/customer">
                    <Customer />
                </PrivateRoute>

                <PrivateRoute exact path="/package/:id">
                    <PackageDetail />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <ProfileStaff />
                </PrivateRoute>
                <PrivateRoute exact path="/notification">
                    <Notification />
                </PrivateRoute>
                <PrivateRoute exact path="/account">
                    <MyAccount />
                </PrivateRoute>
                <AdminOnlyRoute exact path="/staff">
                    <Staff />
                </AdminOnlyRoute>
                <PrivateRoute exact path="/doctor">
                    <Doctor />
                </PrivateRoute>
                <PrivateRoute exact path="/service">
                    <Service />
                </PrivateRoute>
                <PrivateRoute exact path="/statistic">
                    <Statistic />
                </PrivateRoute>
                <PrivateRoute exact path="/form">
                    <Form />
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

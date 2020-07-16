import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import _ from "lodash";

const AdminOnlyRoute = ({ children, ...rest }) => {

    const { currentUser } = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const [redirect, setredirect] = useState(false);

    // useEffect(() => {

    //     if ((_.isEmpty(auth?.token) || currentUser?.role !== 'admin')) {
    //         setredirect(true)
    //     }

    // }, [auth?.token]);

    // if (redirect) {
    //     return <Redirect
    //         to={{
    //             pathname: "/",
    //         }}
    //     />
    // }


    return (
        <Route
            {...rest}
            render={() =>
                !(_.isEmpty(auth?.token) || currentUser?.role !== 'admin') ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    )
            }
        />
    );
};

export default AdminOnlyRoute;
import React, { useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { saveIoInstance, clearIoInstance, countUnreadNotify, markReadNotify, getUserNotification } from '../../redux/notification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@material-ui/core';
const Notify = (props) => {


    const notify = useSelector(state => state.notify);
    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {

        if (_.isEmpty(token)) {
            dispatch(clearIoInstance())
        }

    }, [token]);

    useEffect(() => {


        if (_.isEmpty(notify?.io)) {
            const ioConnectData = io(process.env.REACT_APP_SERVER);
            dispatch(saveIoInstance(ioConnectData))
            ioConnectData.emit("client-send-userId", "staff")
        }

    }, []);

    const markReadNotifyFunc = (value) => {
        if (!value?.is_read) {
            const data = { id: value?.id, is_read: true }
            dispatch(markReadNotify(data))
        }
        window.location.href = (value?.url)
    }

    const Msg = (data) => (
        <div>
            <h2>Thông báo</h2>
            <div className = "notify-content">{data.content}  <Button onClick={() => markReadNotifyFunc(data)}>Chi tiết</Button> </div>
        </div>
    )

    const notifyPanel = (data) => {
        if (!_.isEmpty(data)) {
            toast(Msg(data), {
                toastId: data?.id,
                position: "top-right",
                autoClose: false,
                type: 'info'
            });
        }
    }

    const getMessage = () => {
        if (notify?.io) {
            notify.io.on("server-send-notification", (data) => {
                getNewNotify()
                getNotifyNum();
                notifyPanel(data)
            })
        }
    }

    const getNewNotify = () => {
        if (user?.currentUser?.id) {
            const data = { id: user?.currentUser?.id, itemsPage: 30, page: 1 }
            dispatch(getUserNotification(data))
        }

    }

    const getNotifyNum = () => {
        if (user?.currentUser?.id) {
            const data = { receiver_id: user?.currentUser?.id }
            dispatch(countUnreadNotify(data))
        }

    }

    return !_.isEmpty(token) ? (
        <div>
            {getMessage()}
            <ToastContainer />
        </div>
    ) : '';
};

export default withRouter(Notify);
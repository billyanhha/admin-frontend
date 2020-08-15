import React, { useEffect, useState } from 'react';
import LoadingPage from '../../component/BackDrop';
import MiniDrawer from '../../component/Drawer';
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { getUserNotification, getMoreUserNotification, markReadNotify, markAllRead } from '../../redux/notification';
import moment from "moment"
import FiberNewIcon from '@material-ui/icons/FiberNew';
import { Button } from '@material-ui/core';

const itemsPage = 30;

const Notification = () => {

    const dispatch = useDispatch()
    const { notifications, isOutOfData } = useSelector(state => state.notify);
    const { currentUser } = useSelector(state => state.user);
    const { isLoad } = useSelector(state => state.ui);
    const { unreadNotifyNumber } = useSelector(state => state.notify);

    const [page, setpage] = useState(1);
    const [disable, setdisable] = useState(false);

    useEffect(() => {

        if (currentUser?.id) {
            const data = { id: currentUser?.id, itemsPage: itemsPage, page: page }
            dispatch(getUserNotification(data))
        }



    }, [currentUser]);

    const getMoreUserNotificationData = () => {
        setdisable(true)
        let currentPage = page;
        const data = { id: currentUser?.id, itemsPage: itemsPage, page: ++currentPage }
        setpage(currentPage)
        dispatch(getMoreUserNotification(data))
        setTimeout(() => {
            setdisable(false)
        }, 1000);
    }

    // const markAllReadFunc = () => {
    //     const data = { id: currentUser?.id, itemsPage: itemsPage, page: 1, receiver_id: currentUser?.id };
    //     dispatch(markAllRead(data))

    // }


    const markReadNotifyFunc = (value) => {
        if (!value?.is_read) {
            const data = { id: value?.id, is_read: true }
            dispatch(markReadNotify(data))
        }
        window.location.href = (value?.url)
    }

    const renderNotify = notifications.map((value, index) => {
        return (
            <div key={value?.id} onClick={() => markReadNotifyFunc(value)} className={(!value?.is_read ? "notify-item-nonread " : "notify-item")}>
                <p>
                    {value?.content}
                </p>
                <div className="notify-date">
                    {moment(value?.created_at).fromNow()}
                </div>
            </div>
        )
    })


    return (
        <div>
            <LoadingPage />
            <MiniDrawer>
                <div className="staff-notify">
                    <p className="staff-notify-text">Bạn có <span className="highlight">{unreadNotifyNumber}</span> thông báo chưa đọc</p>
                    <div className="staff-notify-content">
                        <div className="staff-notify-item">
                            {renderNotify}
                            <br/>
                            <Button
                            style={{ visibility: `${isOutOfData ? 'hidden' : 'visible'}` }}
                            variant="outlined" color="primary"
                            onClick={getMoreUserNotificationData}>Tải thêm</Button>
                        </div>
                    </div>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Notification;
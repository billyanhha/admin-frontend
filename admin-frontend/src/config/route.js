
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const route = {
    '/' : {
        label: 'Quản lý gói',
        icon : <AllInboxIcon/>,
        visible: true
    },
    '/package/:id' : {
        label: 'Quản lý gói',
        icon : <AllInboxIcon/>
    },
    '/customer' : {
        label: 'Quản lý người dùng',
        icon : <PeopleAltIcon/>,
        visible: true,
    },
    '/staff' : {
        label: 'Quản lý nhân viên',
        icon : <RecentActorsIcon/>,
        visible: true,
        role: 'admin'
    },
    '/service' : {
        label: 'Quản lý dịch vụ',
        icon : <RoomServiceIcon/>,
        visible: true,
    },
    '/sample' : {
        label: 'Sample',
        icon : <InboxIcon/>,
        visible: true
    }
}



export default route;
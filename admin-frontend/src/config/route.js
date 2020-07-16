
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React, { useEffect } from 'react';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AllInboxIcon from '@material-ui/icons/AllInbox';

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
    '/staff' : {
        label: 'Quản lý nhân viên',
        icon : <RecentActorsIcon/>,
        visible: true,
        role: 'admin'
    },
    '/sample' : {
        label: 'Sample',
        icon : <InboxIcon/>,
        visible: true
    }
}



export default route;

import InboxIcon from '@material-ui/icons/MoveToInbox';
import React, { useEffect } from 'react';
import MailIcon from '@material-ui/icons/Mail';

const route = {
    '/' : {
        label: 'Home',
        icon : <MailIcon/>
    },
    '/sample' : {
        label: 'Sample',
        icon : <InboxIcon/>
    }
}



export default route;
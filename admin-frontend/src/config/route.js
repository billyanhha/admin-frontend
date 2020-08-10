import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import React from "react";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import {BarChart, Person, PeopleOutline, FolderSpecial} from "@material-ui/icons";

const route = {
    "/": {
        label: "Quản lý gói",
        icon: <AllInboxIcon />,
        visible: true
    },
    "/package/:id": {
        label: "Quản lý gói",
        icon: <AllInboxIcon />
    },
    "/customer": {
        label: "Quản lý người dùng",
        icon: <Person />,
        visible: true
    },
    "/staff": {
        label: "Quản lý nhân viên",
        icon: <RecentActorsIcon />,
        visible: true,
        role: "admin"
    },
    "/doctor": {
        label: "Quản lý bác sĩ",
        icon: <PeopleOutline />,
        visible: true,
        role: "admin"
    },
    "/service": {
        label: "Quản lý dịch vụ",
        icon: <RoomServiceIcon />,
        visible: true
    },
    "/notification": {
        label: "Thông báo",
        icon: <ImportContactsIcon />,
    },
    "/form": {
        label: "Quản lý văn bản",
        icon: <ImportContactsIcon />,
        visible: true
    },
    "/statistic": {
        label: "Thống kê",
        icon: <BarChart />,
        visible: true
    }
};

export default route;

import React, { useEffect, useState } from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';
import "./style.css";
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux';
import { getStaff } from '../../redux/user';
import Pagination from '@material-ui/lab/Pagination';
import { Avatar, Button, Select, MenuItem, FormControl, InputLabel, makeStyles, Menu } from '@material-ui/core';
import gender from '../../config/gender'
import AddIcon from '@material-ui/icons/Add';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import ActiveStaff from './ActiveStaff';

const itemsPage = 10

const columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    {
        title: 'Trạng thái', field: 'active',

        render: rowData => (
            <div className={rowData.active ? 'staff-active' : 'staff-deactive'}>
                {rowData.active ? 'Hoạt động' : 'Ngưng hoạt động'}
            </div>
        )
    },
    {
        title: 'Tên', field: 'fullname', render: rowData => (
            <div className="staff-auth">
                <Avatar style={{ width: '80px', height: '80px' }} alt={rowData.fullname} src={rowData.avatarurl} />
                <h4>
                    {rowData.fullname}
                </h4>
            </div>
        )
    },
    {
        title: 'Email', field: 'email'
    },
    {
        title: 'Giới tính', field: 'gender', render: rowData => (
            <div>{gender[rowData.gender]}</div>
        )
    },
    {
        title: 'Địa chỉ', field: 'address'
    },
    {
        title: 'Số điện thoại', field: 'phone'
    },
]


const Staff = () => {

    const { staffs } = useSelector(state => state.userStaff);
    const { isLoad } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [page, setpage] = useState(1);
    const [dialogVisible, setdialogVisible] = useState(false);
    const [editDialogVisible, seteditDialogVisible] = useState(false);
    const [activeDialogVisible, setactiveDialogVisible] = useState(false);
    const [currentStaffData, setCurrentStaffData] = useState({});

    useEffect(() => {

        getStaffData()

    }, []);

    const openAddDialog = () => {
        setdialogVisible(true)

    }

    const openEditDialog = (data) => {
        seteditDialogVisible(true)
        setCurrentStaffData(data)
    }

    const openActiveDialog= (data) => {
        setactiveDialogVisible(true)
        setCurrentStaffData(data)
    }


    const closeDialog = () => {
        setdialogVisible(false)
        seteditDialogVisible(false)
        setactiveDialogVisible(false)
    }

    const getStaffData = () => {
        let data = { role: 'coordinator', itemsPage: itemsPage, page: page };
        dispatch(getStaff(data))
    }

    const handleChangePage = (event, newPage) => { //change page paginaation
        setpage(newPage);
        let data = { role: 'coordinator', itemsPage: itemsPage, page: newPage };
        dispatch(getStaff(data))
    };


    const count = parseInt((Number(staffs?.[0]?.full_count) / itemsPage), 10) + (Number(staffs?.[0]?.full_count) % itemsPage === 0 ? 0 : 1)

    return (
        <div>
            <MiniDrawer>
                <AddStaff closeDialog={closeDialog} dialogVisible={dialogVisible} />
                <EditStaff data = {currentStaffData} closeDialog={closeDialog} dialogVisible={editDialogVisible} />
                <ActiveStaff data = {currentStaffData} closeDialog={closeDialog} dialogVisible={activeDialogVisible} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={openAddDialog}
                    // className={classes.button}
                    startIcon={<AddIcon />}
                >
                    Thêm điều phối
                </Button>
                <br /> <br />
                <div>
                    <MaterialTable
                        isLoading={isLoad}
                        title="Nhân viên điều phối"
                        columns={columns}
                        data={staffs}
                        actions={[
                            {
                                icon: 'save',
                                tooltip: 'Save User',
                                onClick: (event, rowData) => { }
                            }
                        ]}
                        components={{
                            Pagination: props => (
                                <div>
                                    <Pagination
                                        defaultPage={page}
                                        onChange={handleChangePage}
                                        count={count}
                                        rowsPerPage={3}
                                        color="primary" />
                                    <br />
                                </div>
                            ),
                            Action: props => {
                                const { data } = props;

                                return (
                                    <div className="staff-action">
                                        <Button onClick={() => openEditDialog(data)}
                                            color="primary">
                                            Sửa tài khoản
                                        </Button>
                                        <Button onClick={() => openActiveDialog(data)} color="secondary">
                                            {data?.active ? 'Vô hiệu hóa' : 'Bật tài khoản'}
                                        </Button>
                                    </div>
                                )
                            }
                        }}
                    />
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Staff;
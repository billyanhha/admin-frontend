import React, { useEffect, useState } from 'react';
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';
import "./style.css";
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux';
import { getStaff } from '../../redux/user';
import Pagination from '@material-ui/lab/Pagination';
import { Avatar, Button, Tooltip, TextField, Select } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import gender from '../../config/gender'
import AddIcon from '@material-ui/icons/Add';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import ActiveStaff from './ActiveStaff';
import { Controller, useForm } from 'react-hook-form';

const itemsPage = 5

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
                <Avatar style={{ width: '80px', height: '80px', marginRight: '10px' }} alt={rowData.fullname} src={rowData.avatarurl} />
                <h4 style={{ marginRight: 'auto' }}>
                    {rowData.fullname}
                </h4>
            </div>
        )
    },
    {
        title: 'Email', field: 'email', render: rowData => (
            <div className="table-email">
                {rowData.email}{" "}
                {rowData.email && rowData.is_email_verified === false ? (
                    <Tooltip title="Email chưa xác thực">
                        <InfoOutlined fontSize="inherit" style={{ color: "#faad14" }} />
                    </Tooltip>
                ) : (
                        ""
                    )}
            </div>
        )
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

    const { control, handleSubmit, reset } = useForm();

    const { staffs } = useSelector(state => state.userStaff);
    const { isLoad } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [page, setpage] = useState(1);
    const [dialogVisible, setdialogVisible] = useState(false);
    const [editDialogVisible, seteditDialogVisible] = useState(false);
    const [activeDialogVisible, setactiveDialogVisible] = useState(false);
    const [currentStaffData, setCurrentStaffData] = useState({});
    const [query, setquery] = useState('');
    const [active, setactive] = useState('');

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

    const openActiveDialog = (data) => {
        setactiveDialogVisible(true)
        setCurrentStaffData(data)
    }


    const closeDialog = () => {
        setdialogVisible(false)
        seteditDialogVisible(false)
        setactiveDialogVisible(false)
    }

    const onSubmit = data => { // search
        setquery(data.query)
        setpage(1)
        getStaffData(1, data.query, active)
    };

    const handleChangePage = (event, newPage) => { //change page paginaation
        setpage(newPage);
        getStaffData(newPage, query, active)
    };

    
    const handleActiveChange = (e) => {
        setactive(e.target.value)
        setpage(1)
        getStaffData(1, query, e.target.value)
    }

    const getStaffData = (page , query, active) => {
        let data = { role: 'coordinator', itemsPage: itemsPage, page: page, query: query, active: active };
        dispatch(getStaff(data))
    }

    const count = parseInt((Number(staffs?.[0]?.full_count) / itemsPage), 10) + (Number(staffs?.[0]?.full_count) % itemsPage === 0 ? 0 : 1)

    return (
        <div>
            <MiniDrawer>
                <AddStaff closeDialog={closeDialog} dialogVisible={dialogVisible} />
                <EditStaff data={currentStaffData} closeDialog={closeDialog} dialogVisible={editDialogVisible} />
                <ActiveStaff data={currentStaffData} closeDialog={closeDialog} dialogVisible={activeDialogVisible} />
                <div className="service-search">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={TextField}
                            variant="outlined"
                            className="packge-search-input"
                            label="Tìm kiếm"
                            name="query"
                            control={control}
                            defaultValue=''
                        />
                    </form>
                    <Select
                        native
                        value={active}
                        onChange={handleActiveChange}
                    >
                        <option value={''}>Tất cả</option>
                        <option value={false}>Vô hiệu hóa</option>
                        <option value={true}>Đang hoạt động</option>
                    </Select>
                </div>
                <br/>
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
                                        rowsPerPage={itemsPage}
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
                        options={{
                            actionsColumnIndex: -1,
                            search: false
                        }}
                    />
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Staff;
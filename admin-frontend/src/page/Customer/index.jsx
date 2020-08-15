import React, { useState, useEffect } from 'react';
import MiniDrawer from '../../component/Drawer';
import Pagination from '@material-ui/lab/Pagination';
import MaterialTable from 'material-table';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Avatar, Select, Tooltip, Chip } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import gender from "../../config/gender"
import { getCustomer, changeCustomerStatus, getCustomerPatient } from '../../redux/customer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {InfoOutlined} from '@material-ui/icons';
import moment from "moment"
import PatientDialog from '../../component/PatientDialog';

const itemsPage = 5

const columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    {
        title: 'Trạng thái', field: 'active',

        render: rowData => (
            <div className={rowData.active ? 'staff-active' : 'staff-deactive'}>
                {rowData.active ? 'Hoạt động' : 'Chưa phê duyệt'}
            </div>
        )
    },
    {
        title: 'Ngày đăng kí', field: 'created_at',

        render: rowData => (
            moment(rowData?.created_at).format("DD-MM-YYYY [vào lúc] HH [giờ] mm [phút]")
        )
    },
    {
        title: 'Người dùng', field: 'fullname', render: rowData => (
            <div className="service-category-field">
                <Avatar style={{ width: '80px', height: '80px' }} alt={rowData.fullname} src={rowData.avatarurl} />
                <h4>
                    {rowData.fullname}
                </h4>
            </div>
        )
    },
    {
        title: 'Giới tính', field: 'gender', render: rowData => (
            gender?.[rowData?.gender]
        )
    },
    {
        title: 'Địa chỉ', field: 'address'
    },
    {
        title: 'Điện thoại', field: 'phone'
    },
    {
        title: 'Email', field: 'email',
        render: rowData => (
            <div className="table-email">
                {rowData.email}
                {rowData.email ? (
                    rowData.is_email_verified === false ? (
                        <Tooltip title="Email chưa xác thực">
                            <InfoOutlined fontSize="inherit" style={{color: "#faad14"}} />
                        </Tooltip>
                    ) : (
                        <Chip size="small" className="chip-added" label={(rowData.mail_subscribe ? "Đã" : "Chưa") + " đăng kí"} />
                    )
                ) : (
                    ""
                )}
            </div>
        )
    },
    {
        title: 'Ngày sinh', field: 'dateofbirth'
    },
]

const Customer = () => {


    const { control, handleSubmit, reset } = useForm();

    const [active, setactive] = useState('');
    const [page, setpage] = useState(1);
    const [query, setquery] = useState('');
    const [dialogVisible, setdialogVisible] = useState(false);
    const [patientDialogVisible, setpatientDialogVisible] = useState(false);
    const [currentCustomer, setcurrentCustomer] = useState({});


    const { isLoad } = useSelector(state => state.ui)
    const { customers } = useSelector(state => state.customer)
    const dispatch = useDispatch()

    useEffect(() => {

        getCustomerData(1, '', '')

    }, []);


    const handleChangePage = (event, newPage) => {
        setpage(newPage)
        getCustomerData(newPage, query, active)
    }

    const onSubmit = data => { // search
        setquery(data.query)
        setpage(1)
        getCustomerData(1, data.query, active)
    };


    const handleActiveChange = (e) => {
        setactive(e.target.value)
        setpage(1)
        getCustomerData(1, query, e.target.value)
    }

    const getCustomerData = (page, query, active) => {
        const data = { page: page, query: query, active: active, itemsPage: itemsPage }
        dispatch(getCustomer(data))
    }

    const handleClose = () => {
        setdialogVisible(false)
        setpatientDialogVisible(false)
    }

    const openDialog = (data) => {
        setcurrentCustomer(data)
        setdialogVisible(true)
    }

    const openPatientDialog = (data) => {
        setcurrentCustomer(data)
        dispatch(getCustomerPatient({id: data?.id}))
        setpatientDialogVisible(true)
    }

    const changeStatus = () => {
        const queryData = { page: page, query: query, active: active, itemsPage: itemsPage }
        const data = { query: queryData, id: currentCustomer?.id, active: ((!currentCustomer?.active) + '') }
        dispatch(changeCustomerStatus(data));
        handleClose()
    }

    const count = parseInt((Number(customers?.[0]?.full_count) / itemsPage), 10) + (Number(customers?.[0]?.full_count) % itemsPage === 0 ? 0 : 1)

    return (
        <div>
            <PatientDialog currentCustomer={currentCustomer} closeDialog={handleClose} dialogVisible={patientDialogVisible} />
            <Dialog
                open={dialogVisible}
                onClose={handleClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {currentCustomer?.active ? 'Vô hiệu hóa người dùng' : 'Chấp nhận người dùng'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn thay đổi trạng thái của người dùng này ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={changeStatus} color="primary">
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <MiniDrawer>
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
                        <option value={false}>Chờ phê duyệt</option>
                        <option value={true}>Hoạt động</option>
                    </Select>
                </div>
                <br />
                <MaterialTable
                    isLoading={isLoad}
                    title="Danh sách người dùng"
                    options={{
                        search: false
                    }}
                    columns={columns}
                    data={customers}
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
                                    <Button
                                        onClick={() => openPatientDialog(data)}>
                                        Xem bệnh nhân
                                </Button>
                                    <Button
                                        onClick={() => openDialog(data)}
                                        color={data?.active ? "secondary" : "primary"}>
                                        {data?.active ? 'Vô hiệu hóa' : 'Phê duyệt'}
                                    </Button>
                                </div>

                            )
                        }
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </MiniDrawer>
        </div>
    );
};

export default Customer;
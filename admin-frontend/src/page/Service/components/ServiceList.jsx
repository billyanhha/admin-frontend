import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Avatar, Select } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddService from './dialog/AddService';
import Pagination from '@material-ui/lab/Pagination';
import { getService } from '../../../redux/service';
import EditService from './dialog/EditService';


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
        title: 'Tên', field: 'name'
    },
    {
        title: 'Chú thích', field: 'description'
    },
    {
        title: 'Hạng mục dịch vụ', field: 'category_name', render: rowData => (
            <div className="service-category-field">
                <Avatar style={{ width: '80px', height: '80px' }} alt={rowData.category_name} src={rowData.category_image} />
                <h4>
                    {rowData.category_name}
                </h4>
            </div>
        )
    },
]


const ServiceList = (props) => {


    const [addServiceDialogVisible, setaddServiceDialogVisible] = useState(false);
    const [currentService, setcurrentService] = useState({});
    const [editServiceDialogVisible, seteditServiceDialogVisible] = useState(false);
    const [active, setactive] = useState('');
    const [page, setpage] = useState(1);
    const [query, setquery] = useState('');
    const { control, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()
    const { currentServicePage, services } = useSelector(state => state.service)
    const { isLoad } = useSelector(state => state.ui)

    const getServiceData = (page, query, active) => {
        const data = { itemsPage: itemsPage, page: page, query: query, active: active }
        dispatch(getService(data))
    }


    useEffect(() => {

        getServiceData(1, '', '')

    }, []);

    if (currentServicePage !== '1') {
        return null
    }

    const handleChangePage = (event, newPage) => {
        setpage(newPage)
        getServiceData(newPage, query, active)
    }

    const onSubmit = data => { // search
        setquery(data.query)
        setpage(1)
        getServiceData(1, data.query, active)
    };


    const handleActiveChange = (e) => {
        setactive(e.target.value)
        setpage(1)
        getServiceData(1, query, e.target.value)
    }


    const openAddDialog = () => {
        setaddServiceDialogVisible(true)
    }

    const openEditDialog = (data) => {
        setcurrentService(data)
        seteditServiceDialogVisible(true)
    }

    const closeDialog = () => {
        seteditServiceDialogVisible(false)
        setaddServiceDialogVisible(false)
    }

    const setPageData = () => {
        setpage(1)
    }


    const count = parseInt((Number(services?.[0]?.full_count) / itemsPage), 10) + (Number(services?.[0]?.full_count) % itemsPage === 0 ? 0 : 1)

    return (
        <div>
            <EditService setPage={setPageData} currentService={currentService} closeDialog={closeDialog} dialogVisible={editServiceDialogVisible} />
            <AddService setPage={setPageData} closeDialog={closeDialog} dialogVisible={addServiceDialogVisible} />
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
                    <option value={true}>Hoạt động</option>
                    <option value={false}>Dừng hoạt động</option>
                </Select>
            </div>
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={openAddDialog}
                // className={classes.button}
                startIcon={<AddIcon />}
            >
                Thêm dịch vụ
                </Button>
            <br /><br />
            <MaterialTable
                isLoading={isLoad}
                title="Danh sách dịch vụ"
                options={{
                    search: false
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: "Không có dữ liệu"
                    },
                    header: {
                        actions: "Hành động"
                    }
                }}
                columns={columns}
                data={services}
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
                                    onClick={() => openEditDialog(data)}
                                    color="primary">
                                    Sửa dịch vụ
                                </Button>
                            </div>
                        )
                    }
                }}
            />
        </div>
    );
};

export default ServiceList;
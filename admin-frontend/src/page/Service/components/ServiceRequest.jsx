import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Avatar, Select } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { getServiceRequest, editServiceRequest } from '../../../redux/service';
import moment from "moment"
import { NotificationManager } from 'react-notifications';

const itemsPage = 5

const columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    {
        title: 'Tên', field: 'name', editable: 'never'
    },
    {
        title: 'Chú thích', field: 'description', editable: 'never'
    },
    {
        title: 'Phản hồi bác sĩ', field: 'response'
    },
    {
        title: 'Người yêu cầu', field: 'doctor_name', render: rowData => (
            <div className="service-category-field">
                <Avatar style={{ width: '80px', height: '80px' }} alt={rowData.doctor_name} src={rowData.doctor_avatar} />
                <h4>
                    {rowData.doctor_name}
                </h4>
            </div>
        ), editable: 'never'
    },
    {
        title: 'Ngày yêu cầu', field: 'created_at', render: rowData => (
            moment(rowData?.created_at).format("DD-MM-YYYY HH [giờ] mm [phút]")
        ), editable: 'never'
    }
]
// sau nay add link vao link sang doctor

const ServiceRequest = (props) => {

    const [page, setpage] = useState(1);
    const [query, setquery] = useState('');
    const { control, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()
    const { currentServicePage, requests } = useSelector(state => state.service)
    const { isLoad } = useSelector(state => state.ui)

    const getServiceRequestData = (page, query) => {
        const data = { itemsPage: itemsPage, page: page, query: query }
        dispatch(getServiceRequest(data))
    }


    useEffect(() => {

        getServiceRequestData(1, '')

    }, []);

    if (currentServicePage !== '3') {
        return null
    }

    const handleChangePage = (event, newPage) => {
        setpage(newPage)
        getServiceRequestData(newPage, query)
    }

    const onSubmit = data => { // search
        setquery(data.query)
        setpage(1)
        getServiceRequestData(1, data.query)
    };



    const setPageData = () => {
        setpage(1)
    }


    const count = parseInt((Number(requests?.[0]?.full_count) / itemsPage), 10) + (Number(requests?.[0]?.full_count) % itemsPage === 0 ? 0 : 1)

    return (
        <div>
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
            </div>
            <br /><br />
            <MaterialTable
                isLoading={isLoad}
                title="Danh sách yêu cầu dịch vụ"
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
                data={requests}
                editable={{
                    editTooltip: (rowData) => ("Phản hồi bác sĩ"),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            try {

                                if (!newData?.response) {
                                    NotificationManager.error('Hãy nhập phản hồi', 'Thông báo')
                                } else {
                                    const data = { id: newData?.id, response: newData?.response }
                                    dispatch(editServiceRequest(data))
                                }
                                resolve();
                            } catch (error) {
                                reject(error)
                            }
                        }),
                }}
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
                    // Action: props => {
                    //     const { data } = props;

                    //     return (
                    //         <div className="staff-action">
                    //             <Button
                    //                 onClick={() => openEditDialog(data)}
                    //                 color="primary">
                    //                 Sửa dịch vụ
                    //             </Button>
                    //         </div>
                    //     )
                    // }
                }}
            />
        </div>
    );
};

export default ServiceRequest;
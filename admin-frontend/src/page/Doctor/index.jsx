import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import MaterialTable from "material-table";
import Pagination from "@material-ui/lab/Pagination";
import {Avatar, Button, CircularProgress} from "@material-ui/core";
import {Add, InfoOutlined, Block, Check} from "@material-ui/icons";

import MiniDrawer from "../../component/Drawer";
import gender from "../../config/gender";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import ActiveDoctor from "./ActiveDoctor";
import SpecificationDoctor from "./SpecificationDoctor";

import {getAllDoctor} from "../../redux/staff";

import "./style.css";

const columns = [
    {
        title: "ID",
        field: "id",
        editable: "never",
        sorting: false,
        width: 150
    },
    {
        title: "Định danh",
        field: "fullname",
        width: 220,
        render: rowData => (
            <div className="doctor-info-basic">
                <Avatar style={{width: "80px", height: "80px", marginBottom: "5px"}} alt={rowData.fullname} src={rowData.avatarurl} />
                <div>{rowData.fullname}</div>
            </div>
        ),
        headerStyle: {
            textAlign: "center"
        }
    },
    {
        title: "Email",
        field: "email"
    },
    {
        title: "Giới tính",
        field: "gender",
        render: rowData => <div>{gender[rowData.gender]}</div>,
        searchable: false
    },
    {
        title: "Địa chỉ",
        field: "address",
        width: 300
    },
    {
        title: "Số điện thoại",
        field: "phone",
        type: "numeric",
        width: 150
    },
    {
        title: "Trạng thái tài khoản",
        field: "active",
        width: 200,
        searchable: false,

        render: rowData => (
            <div className={rowData.active ? "staff-active" : "staff-deactive"}>{rowData.active ? "Hoạt động" : "Ngưng hoạt động"}</div>
        )
    }
];

const Doctor = () => {
    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const doctors = useSelector(state => state.doctor.doctors);
    const updateDocStatus = useSelector(state => state.doctor.updateStatus);
    const addDocStatus = useSelector(state => state.doctor.status);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [activeDialogVisible, setActiveDialogVisible] = useState(false);
    const [specDialogVisible, setSpecDialogVisible] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [currentSpec, setCurrentSpec] = useState({});

    const openAddDialog = () => {
        setDialogVisible(true);
    };

    const openEditDialog = data => {
        setEditDialogVisible(true);
        setCurrentData(data);
    };

    const openActiveDialog = data => {
        setActiveDialogVisible(true);
        setCurrentData(data);
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setEditDialogVisible(false);
        setActiveDialogVisible(false);
    };

    const openSpecDialog = data => {
        setEditDialogVisible(false);
        setSpecDialogVisible(true);
        setCurrentSpec(data);
    };

    const closeSpecDialog = () => {
        setSpecDialogVisible(false);
        openEditDialog(currentData);
    };

    useEffect(() => {
        console.log(doctors);
    }, [doctors]);

    useEffect(() => {
        if (updateDocStatus || addDocStatus) dispatch(getAllDoctor());
    }, [addDocStatus, updateDocStatus]);

    useEffect(() => {
        dispatch(getAllDoctor());
    }, []);

    return (
        <div>
            <MiniDrawer>
                <AddDoctor closeDialog={closeDialog} dialogVisible={dialogVisible} />
                <EditDoctor data={currentData} closeDialog={closeDialog} dialogVisible={editDialogVisible} openSpecification={openSpecDialog} />
                <SpecificationDoctor data={currentSpec} closeDialog={closeSpecDialog} dialogVisible={specDialogVisible} />
                <ActiveDoctor data={currentData} closeDialog={closeDialog} dialogVisible={activeDialogVisible} />
                {doctors ? (
                    <div>
                        <Button variant="contained" color="primary" onClick={openAddDialog} startIcon={<Add />}>
                            Thêm bác sĩ
                        </Button>
                        <MaterialTable
                            isLoading={isLoad}
                            title="Đội ngũ Bác sĩ"
                            columns={columns}
                            data={doctors}
                            actions={[{}]}
                            localization={{
                                body: {
                                    emptyDataSourceMessage: "Không có dữ liệu"
                                },
                                pagination: {
                                    labelDisplayedRows: "{from}-{to} / tổng {count} bác sĩ",
                                    labelRowsSelect: "hàng"
                                },
                                toolbar: {
                                    searchPlaceholder: "Tìm kiếm",
                                    exportAriaLabel: "Xuất file",
                                    exportName: "Xuất file",
                                    exportTitle: "Xuất file"
                                },
                                header: {
                                    actions: "Tài khoản"
                                }
                            }}
                            components={{
                                Action: props => {
                                    const {data} = props;

                                    return (
                                        <div className="doctor-table-action">
                                            <Button size="small" onClick={() => openEditDialog(data)} color="primary">
                                                <InfoOutlined /> ­ Thông tin Bác sĩ
                                            </Button>
                                            {data?.active ? (
                                                <Button
                                                    size="small"
                                                    className="doctor-action-ban"
                                                    onClick={() => openActiveDialog(data)}
                                                    color="secondary"
                                                >
                                                    <Block /> ­ Vô hiệu hóa
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="small"
                                                    className="doctor-action-active"
                                                    onClick={() => openActiveDialog(data)}
                                                    color="inherit"
                                                >
                                                    {/* <Check /> */}­ Kích hoạt tài khoản
                                                </Button>
                                            )}
                                        </div>
                                    );
                                }
                            }}
                            options={{
                                actionsColumnIndex: -1,
                                exportButton: true,
                                headerStyle: {
                                    fontWeight: "600"
                                }
                            }}
                            style={{marginTop: "20px"}}
                        />
                    </div>
                ) : (
                    <div className="doctor-loading">
                        <CircularProgress size={40} />
                        <br />
                        Đang lấy dữ liệu
                    </div>
                )}
            </MiniDrawer>
        </div>
    );
};

export default Doctor;

import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import MaterialTable from "material-table";
import Pagination from "@material-ui/lab/Pagination";
import {Avatar, Button, TextField, InputAdornment, Tooltip, CircularProgress} from "@material-ui/core";
import {Add, InfoOutlined, Block, Search} from "@material-ui/icons";
import {debounce} from "lodash";

import MiniDrawer from "../../component/Drawer";
import gender from "../../config/gender";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import ActiveDoctor from "./ActiveDoctor";
import SpecificationDoctor from "./SpecificationDoctor";
import ManageSpecification from "./ManageSpecification";

import {getAllDoctor, getAllLanguage} from "../../redux/staff";

import "./style.css";

const columns = [
    {
        title: "ID",
        field: "id",
        editable: "never"
        // width: 150
    },
    {
        title: "Định danh",
        field: "fullname",
        // width: 220,
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
        field: "email",
        render: rowData => (
            <div className="table-email">
                {rowData.email}{" "}
                {rowData.email && rowData.is_email_verified === false ? (
                    <Tooltip title="Email chưa xác thực">
                        <InfoOutlined fontSize="inherit" style={{color: "#faad14"}} />
                    </Tooltip>
                ) : (
                    ""
                )}
            </div>
        )
    },
    {
        title: "Giới tính",
        field: "gender",
        render: rowData => <div>{gender[rowData.gender]}</div>
    },
    {
        title: "Địa chỉ",
        field: "address"
    },
    {
        title: "Số điện thoại",
        field: "phone",
        type: "numeric"
    },
    {
        title: "Trạng thái",
        field: "active",
        headerStyle: {
            textAlign: "center"
        },
        cellStyle: {
            textAlign: "center"
        },
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

    const [page, setPage] = useState(1);
    const [itemsPage, setItemsPage] = useState(5);
    const count = parseInt(Number(doctors?.[0]?.full_count) / itemsPage, 10) + (Number(doctors?.[0]?.full_count) % itemsPage === 0 ? 0 : 1);
    const [searchData, setSearchData] = useState(null);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [activeDialogVisible, setActiveDialogVisible] = useState(false);
    const [specDialogVisible, setSpecDialogVisible] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [currentSpec, setCurrentSpec] = useState({});
    const [specType, setSpecType] = useState(null);
    const [switchField, setSwitchField] = useState(0);

    const delayCallSearchApi = useRef(
        //wait 1s (after user input done) then auto trigger call api
        debounce(data => {
            setSearchData(data);
        }, 1000)
    ).current;

    const handleSearchInput = e => {
        let data = {query: e.target?.value, itemsPage: itemsPage, page: 1}; //no need to change page state (setPage(1))
        delayCallSearchApi(data);
    };

    const getDoctorData = () => {
        let data = {itemsPage: itemsPage, page: page};
        dispatch(getAllDoctor(data));
    };

    const openAddDialog = () => {
        setDialogVisible(true);
    };

    const openEditDialog = (action, data) => {
        setEditDialogVisible(true);
        if (action === 0) setCurrentData(data);
        if (specDialogVisible) setSpecDialogVisible(false);
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

    const openSpecDialog = (type, data) => {
        setEditDialogVisible(false);
        setSpecDialogVisible(true);
        setCurrentSpec(data);
        setSpecType(type);
    };

    const closeSpecDialog = () => {
        setSpecDialogVisible(false);
        setSpecType(null);
    };

    const toggleManagement = type => {
        if (type !== switchField) {
            setSwitchField(type);
        }
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const renderManagement = type => {
        switch (type) {
            case 0:
                return (
                    <div>
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
                                        // pagination: {
                                        //     labelDisplayedRows: "{from}-{to} / tổng {count} bác sĩ",
                                        //     labelRowsSelect: "hàng"
                                        // },
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
                                        Toolbar: props => (
                                            <div className="doctor-table-header">
                                                <div className="doctor-table-title">Đội ngũ Bác sĩ</div>
                                                <div className="doctor-table-searchBar">
                                                    <Tooltip title={searchData?.query ? "Xoá hết để hiện tất cả" : ""}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            placeholder="Tìm kiếm tên, địa chỉ,..."
                                                            defaultValue={searchData?.query ?? ""}
                                                            variant="outlined"
                                                            onChange={e => handleSearchInput(e)}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Search />
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        ),
                                        Pagination: props => (
                                            <div>
                                                <br />
                                                <Pagination
                                                    disabled={isLoad}
                                                    defaultPage={page}
                                                    onChange={handleChangePage}
                                                    count={count}
                                                    rowsPerPage={5}
                                                    color="primary"
                                                />
                                                <br />
                                            </div>
                                        ),
                                        Action: props => {
                                            const {data} = props;

                                            return (
                                                <div className="doctor-table-action">
                                                    <Button disabled={isLoad} size="small" onClick={() => openEditDialog(0, data)} color="primary">
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
                                        search: false,
                                        sorting: false,
                                        headerStyle: {
                                            fontWeight: "500"
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
                    </div>
                );
            case 1:
                return <ManageSpecification />;
            default:
                return <div className="statistic-no-data">Hiện chưa có dữ liệu cho kiểu thống kê này!</div>;
        }
    };

    useEffect(() => {
        dispatch(getAllDoctor(searchData));
    }, [searchData]);

    useEffect(() => {
        dispatch(getAllLanguage());
        getDoctorData();
    }, [page, itemsPage]);

    useEffect(() => {
        if (updateDocStatus || addDocStatus) {
            dispatch(getAllDoctor());
            setPage(1);
        }
    }, [addDocStatus, updateDocStatus]);

    useEffect(() => {
        dispatch(getAllLanguage());
        getDoctorData();
    }, []);

    return (
        <div>
            <MiniDrawer>
                <AddDoctor closeDialog={closeDialog} dialogVisible={dialogVisible} />
                <EditDoctor data={currentData} closeDialog={closeDialog} dialogVisible={editDialogVisible} openSpecification={openSpecDialog} />
                <SpecificationDoctor
                    data={currentSpec}
                    doctorData={currentData}
                    type={specType}
                    openPreviousDialog={openEditDialog}
                    closeDialog={closeSpecDialog}
                    dialogVisible={specDialogVisible}
                />
                <ActiveDoctor data={currentData} doctorID={currentData?.id} closeDialog={closeDialog} dialogVisible={activeDialogVisible} />
                <div className="doctor-management">
                    <div
                        className={`doctor-management-field ${switchField === 0 ? "doctor-management-field-active" : ""}`}
                        onClick={() => toggleManagement(0)}
                    >
                        Thông tin bác sĩ
                    </div>
                    <span></span>
                    <div
                        className={`doctor-management-field ${switchField === 1 ? "doctor-management-field-active" : ""}`}
                        onClick={() => toggleManagement(1)}
                    >
                        Quản lý kĩ năng
                    </div>
                </div>
                {renderManagement(switchField)}
            </MiniDrawer>
        </div>
    );
};

export default Doctor;

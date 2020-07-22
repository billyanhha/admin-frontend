import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";

import {getTopDoctor} from "../../redux/statistic";

import packageStatus from "../../config/package_status";
import MiniDrawer from "../../component/Drawer";
import LoadingPage from "../../component/BackDrop";

import DefaultAvatar from "../../assets/image/hhs-default_avatar.jpg";
import {Avatar, Button} from "@material-ui/core";
import {Person, AssignmentTurnedIn, AssignmentLate, Close} from "@material-ui/icons";
import "./style.css";
const Statistic = () => {
    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const topDoctor = useSelector(state => state.statistic.topDoctor);
    let statusOption = [
        {id: packageStatus.done, status: "đã hoàn thành", style: "status-done"},
        {id: packageStatus.running, status: "đang tiến hành", style: "status-running"},
        {id: packageStatus.doctorCancel, status: "bác sĩ đã hủy", style: "inherit"},
        {id: packageStatus.doctorReject, status: "bác sĩ đã từ chối", style: "secondary"},
        {id: packageStatus.systemCancel, status: "hệ thống đã hủy", style: "inherit"},
        {id: packageStatus.customerCancel, status: "khách hàng đã hủy", style: "secondary"},
    ];

    const [topNum, setTopNum] = useState(null);
    const [whichMonth, setWhichMonth] = useState(null);

    const getTopXDoctor = (top, when, statusID) => {
        dispatch(getTopDoctor(top, when, statusID));
    };

    const renderStatusOption = statusOption.map(values => (
        <div key={values.id}>
            <Button
                className={`statistic-status-button ${values.style !== "status-done" && values.style !== "status-running" ? "" : values.style}`}
                variant={values.style === "secondary" || values.style === "inherit" ? "outlined" : "contained"}
                color={values.style === "secondary" ? values.style : "inherit"}
                onClick={() => getTopXDoctor(topNum, whichMonth, values.id)}
            >
                {values.style === "status-done" ? <AssignmentTurnedIn /> : values.style === "inherit" ? <AssignmentLate /> : ""}
                {values.status === "khách hàng đã hủy" ? <Person /> : values.status.includes("từ chối") ? <Close /> : ""}­ ­
                {values.status}
            </Button>
        </div>
    ));

    useEffect(() => {
        getTopXDoctor(topNum, whichMonth, packageStatus.done);
    }, []);

    return (
        <div className="default-div">
            <LoadingPage />
            <MiniDrawer>
                <div className="statistic-wrapper">
                    Thống kê
                    {/* <button onClick={() => getTopXDoctor(topNum, whichMonth)}> Statistic </button> */}
                    <div className="all-statistic">
                        <div className="each-statistic">
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={DefaultAvatar} alt="" />
                            </div>
                            <div className="each-statistic-description">Bác Sĩ tích cực</div>
                        </div>
                        <div className="each-statistic">
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={DefaultAvatar} alt="" />
                            </div>
                            <div className="each-statistic-description">Thống kê gói</div>
                        </div>
                        <div className="each-statistic">
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={DefaultAvatar} alt="" />
                            </div>
                            <div className="each-statistic-description">Thống kê cuộc hẹn</div>
                        </div>
                        <div className="each-statistic">
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={DefaultAvatar} alt="" />
                            </div>
                            <div className="each-statistic-description">Xếp hạng Bác Sĩ tích cực</div>
                        </div>
                    </div>
                    <div>
                        {topDoctor ? (
                            <div className="statistic-table-wrapper">
                                Thống kê theo gói:
                                <div className="statistic-button-wrapper">{renderStatusOption}</div>
                                <MaterialTable
                                    isLoading={isLoad}
                                    title={"Thống kê theo gói " + topDoctor?.[0]?.status_name.toUpperCase()}
                                    columns={columns}
                                    data={topDoctor}
                                    localization={{
                                        body: {
                                            emptyDataSourceMessage: "Không có dữ liệu",
                                        },
                                        pagination: {
                                            labelDisplayedRows: "{from}-{to} / {count}",
                                            labelRowsSelect: "hàng",
                                        },
                                        toolbar: {
                                            searchPlaceholder: "Tìm kiếm tên/ID bác sĩ",
                                            exportAriaLabel: "Xuất file",
                                            exportName: "Xuất file",
                                            exportTitle: "Xuất file",
                                        },
                                    }}
                                    options={{
                                        headerStyle: {
                                            textAlign: "center",
                                        },
                                        cellStyle: {
                                            textAlign: "center",
                                        },
                                        exportButton: true,
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </MiniDrawer>
        </div>
    );
};

const columns = [
    // {
    //     title: "STT",
    //     field: "tableData.id",
    //     render: rowData => <p>{rowData??""}</p>,
    // },
    {
        title: "Bác Sĩ",
        field: "doctor_name",
        render: rowData => (
            <div className="statistic-table-avatar">
                <Avatar style={{width: "80px", height: "80px", borderRadius: "50%"}} alt={rowData.doctor_name} src={rowData.avatarurl} />
                <span>{rowData.doctor_name}</span>
            </div>
        ),
        sorting: false,
    },
    {
        title: "ID",
        field: "doctor_id",
        sorting: false,
    },
    {
        title: "Số lượng gói",
        field: "status_count",
        searchable: false,
    },
];
export default Statistic;

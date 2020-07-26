import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";
import _ from "lodash";

import {getTopDoctor} from "../../redux/statistic";
import packageStatus from "../../config/package_status";
import apmStatus from "../../config/appointment_status";

import {Avatar, Button, Select, MenuItem} from "@material-ui/core";
import {Person, AssignmentTurnedIn, AssignmentLate, Close, Timer, Today, Star} from "@material-ui/icons";

const TopDoctor = () => {
    const scrollToRef = ref => window.scrollTo(0, ref?.current?.offsetTop);

    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const topDoctor = useSelector(state => state.statistic.topDoctor);

    let statisticType = ["Theo gói", "Theo cuộc hẹn"];

    const myRef = useRef(null);
    const [type, setType] = useState(0);
    const [topNum, setTopNum] = useState(null);
    const [whichMonth, setWhichMonth] = useState(null);
    const [whichYear, setWhichYear] = useState(2020);
    const [whichStatus, setWhichStatus] = useState(packageStatus.done);

    const statusOption = type => {
        let statusOption0 = [
            {id: packageStatus.done, status: "đã hoàn thành", style: "status-done"},
            {id: packageStatus.running, status: "đang tiến hành", style: "status-running"},
            {id: packageStatus.doctorReject, status: "bác sĩ đã từ chối", style: "secondary"},
            {id: packageStatus.doctorCancel, status: "bác sĩ đã hủy", style: "inherit"},
            {id: packageStatus.systemCancel, status: "hệ thống đã hủy", style: "inherit"},
            {id: packageStatus.customerCancel, status: "khách hàng đã hủy", style: "secondary"},
            {id: packageStatus.waiting, status: "đang chờ", style: "status-waiting"}
        ];

        let statusOption1 = [
            {id: apmStatus.done, status: "đã hoàn thành", style: "status-done"},
            {id: apmStatus.dueDate, status: "sắp tới hạn", style: "status-dueDate"},
            {id: apmStatus.doctorCancel, status: "bác sĩ đã hủy", style: "inherit"},
            {id: apmStatus.systemCancel, status: "hệ thống đã hủy", style: "inherit"},
            {id: apmStatus.customerCancel, status: "khách hàng đã hủy", style: "secondary"},
            {id: apmStatus.pending, status: "đang xử lý", style: "status-waiting"}
        ];
        if (type == 0) {
            return statusOption0;
        }
        return statusOption1;
    };

    const generateTimeSelect = () => {
        let monthSelect = [];
        monthSelect.push({id: 0, value: "Toàn bộ"});
        for (let month = 1; month < 13; month++) {
            monthSelect.push({id: month, value: month});
        }
        // for (let quarter = 1; quarter < 5; quarter++) {
        //     monthSelect.push({id: quarter + 12, value: "Quý " + quarter});
        // }
        return monthSelect;
    };

    const getTopXDoctor = (top, month, year, statusID) => {
        dispatch(getTopDoctor(top, month, year, statusID, type));
    };

    const handleStatusChange = statusID => {
        setWhichStatus(statusID);
        getTopXDoctor(topNum, whichMonth, whichYear, statusID);
    };

    const handleMonthChange = event => {
        setWhichMonth(event.target.value === 0 ? null : event.target.value ?? null);
        getTopXDoctor(topNum, event.target.value === 0 ? null : event.target.value ?? null, whichYear, whichStatus);
    };

    const renderStatusOption = statusOption(type).map(values => (
        <div key={values.id}>
            <Button
                className={`statistic-status-button ${
                    values.style !== "status-done" && values.style !== "status-running" && values.style !== "status-waiting" ? "" : values.style
                }`}
                variant={!values.style === "secondary" && !values.style === "inherit" ? "contained" : "outlined"}
                color={values.style === "secondary" ? values.style : values.style === "status-dueDate" ? "primary" : "inherit"}
                onClick={() => handleStatusChange(values.id)}
            >
                {values.style === "status-done" ? <AssignmentTurnedIn /> : values.style === "inherit" ? <AssignmentLate /> : ""}
                {values.style === "status-waiting" ? <Timer /> : values.style === "status-dueDate" ? <Today /> : ""}
                {values.status === "khách hàng đã hủy" ? <Person /> : values.status.includes("từ chối") ? <Close /> : ""}­ ­{values.status}
            </Button>
        </div>
    ));

    const renderMonth = generateTimeSelect().map(data => (
        <MenuItem value={data.id}>{data.value > 0 && data.value < 13 ? "Tháng " + data.value : data.value}</MenuItem>
    ));

    useEffect(() => {
        if (type === 0) {
            getTopXDoctor(topNum, whichMonth, whichYear, packageStatus.done);
            setWhichStatus(packageStatus.done);
        } else {
            getTopXDoctor(topNum, whichMonth, whichYear, apmStatus.done);
            setWhichStatus(apmStatus.done);
        }
    }, [type]);

    // useEffect(() => {
    //     scrollToRef(myRef);
    // }, [topDoctor]);

    useEffect(() => {
        if (!isLoad) scrollToRef(myRef);
    }, [isLoad]);

    useEffect(() => {
        getTopXDoctor(topNum, whichMonth, whichYear, packageStatus.done);
    }, []);

    if (topDoctor)
        return (
            <div>
                <div className="statistic-name">Thống kê Bác sĩ</div>
                <div className="statistic-type" ref={myRef}>
                    <div className={type === 0 ? "statistic-type-active" : ""} onClick={() => setType(0)}>
                        {statisticType[0]}
                    </div>
                    <span></span>
                    <div className={type === 1 ? "statistic-type-active" : ""} onClick={() => setType(1)}>
                        {statisticType[1]}
                    </div>
                </div>
                {/* <div className="statistic-filter-name">Thống kê {statisticType?.[type].toLowerCase()}</div> */}
                <div className="statistic-button-wrapper">{renderStatusOption}</div>
                <div className="statistic-time-filter">
                    <div className="statistic-filter-name">
                        Lọc theo {statisticType?.[type].toLowerCase()} ­
                        <span>
                            {!_.isEmpty(topDoctor)
                                ? topDoctor?.[0]?.status_name.toUpperCase()
                                : statusOption(type)
                                      .find(data => data.id === whichStatus)
                                      ?.status.toUpperCase()}
                        </span>
                    </div>
                    <div className="statistic-filter-right-part">
                        <div className="statistic-filter-name">Lọc theo thời gian</div>
                        <Select defaultValue={0} onChange={handleMonthChange} style={{width: "100px"}}>
                            {renderMonth}
                        </Select>
                        ­ Năm 2020
                    </div>
                </div>
                <MaterialTable
                    isLoading={isLoad}
                    title={`Thống kê ${statisticType?.[type].toLowerCase()} ${
                        !_.isEmpty(topDoctor)
                            ? topDoctor?.[0]?.status_name.toUpperCase()
                            : statusOption(type)
                                  .find(data => data.id === whichStatus)
                                  ?.status.toUpperCase()
                    } ${whichMonth ? " (tháng " + whichMonth + ")" : ""}`}
                    columns={columns}
                    data={topDoctor}
                    localization={{
                        body: {
                            emptyDataSourceMessage: "Không có dữ liệu"
                        },
                        pagination: {
                            labelDisplayedRows: "{from}-{to} / Tổng: {count}",
                            labelRowsSelect: "hàng"
                        },
                        toolbar: {
                            searchPlaceholder: "Tìm kiếm tên/ID bác sĩ",
                            exportAriaLabel: "Xuất file",
                            exportName: "Xuất file",
                            exportTitle: "Xuất file"
                        }
                    }}
                    options={{
                        headerStyle: {
                            textAlign: "center"
                        },
                        cellStyle: {
                            textAlign: "center"
                        },
                        exportButton: true
                    }}
                    style={{marginTop: "20px"}}
                />
            </div>
        );
    return null;
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
                <Avatar
                    style={{width: "80px", height: "80px", borderRadius: "50%"}}
                    alt={rowData.doctor_name}
                    src={rowData.avatarurl ?? rowData.doctor_avatar}
                />
                <span>{rowData.doctor_name}</span>
            </div>
        ),
        sorting: false
    },
    {
        title: "ID Bác Sĩ",
        field: "doctor_id",
        sorting: false
    },
    {
        title: "Số lượng",
        field: "status_count",
        searchable: false
    },
    {
        title: "Đánh giá trung bình",
        field: "average_rating",
        render: rowData => (
            <div>
                <Star style={{color: "#fadb14", fontSize: "20px"}} /> ­ {rowData.average_rating ? rowData.average_rating + " / 5" : ""}
            </div>
        ),
        searchable: false
    }
];

export default TopDoctor;

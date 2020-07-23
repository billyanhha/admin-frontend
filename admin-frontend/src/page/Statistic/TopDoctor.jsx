import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";

import {getTopDoctor} from "../../redux/statistic";
import packageStatus from "../../config/package_status";

import {Avatar, Button, Select, MenuItem} from "@material-ui/core";
import {Person, AssignmentTurnedIn, AssignmentLate, Close, Timer} from "@material-ui/icons";

const scrollToRef = ref => window.scrollTo(0, ref?.current?.offsetTop);

const TopDoctor = () => {
    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const topDoctor = useSelector(state => state.statistic.topDoctor);
    let statusOption = [
        {id: packageStatus.done, status: "đã hoàn thành", style: "status-done"},
        {id: packageStatus.running, status: "đang tiến hành", style: "status-running"},
        {id: packageStatus.doctorReject, status: "bác sĩ đã từ chối", style: "secondary"},
        {id: packageStatus.doctorCancel, status: "bác sĩ đã hủy", style: "inherit"},
        {id: packageStatus.systemCancel, status: "hệ thống đã hủy", style: "inherit"},
        {id: packageStatus.customerCancel, status: "khách hàng đã hủy", style: "secondary"},
        {id: packageStatus.waiting, status: "đang chờ", style: "status-waiting"},
    ];
    let statisticType = ["Theo gói", "Theo cuộc hẹn"];

    // const [myRef, setmyRef] = useState();
    const myRef = useRef(null);
    const [type, setType] = useState(0);
    const [topNum, setTopNum] = useState(null);
    const [whichMonth, setWhichMonth] = useState(null);
    const [whichStatus, setWhichStatus] = useState(packageStatus.done);

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

    const getTopXDoctor = (top, when, statusID) => {
        dispatch(getTopDoctor(top, when, statusID));
    };

    const handleStatusChange = statusID => {
        setWhichStatus(statusID);
        getTopXDoctor(topNum, whichMonth, statusID);
    };

    const handleMonthChange = event => {
        setWhichMonth(event.target.value);
        getTopXDoctor(topNum, event.target.value === 0 ? null : event.target.value ?? null, whichStatus);
    };

    const renderStatusOption = statusOption.map(values => (
        <div key={values.id}>
            <Button
                className={`statistic-status-button ${
                    values.style !== "status-done" && values.style !== "status-running" && values.style !== "status-waiting" ? "" : values.style
                }`}
                variant={!values.style === "secondary" && !values.style === "inherit" ? "contained" : "outlined"}
                color={values.style === "secondary" ? values.style : "inherit"}
                onClick={() => handleStatusChange(values.id)}
            >
                {values.style === "status-done" ? <AssignmentTurnedIn /> : values.style === "inherit" ? <AssignmentLate /> : ""}
                {values.style === "status-waiting" ? <Timer /> : ""}
                {values.status === "khách hàng đã hủy" ? <Person /> : values.status.includes("từ chối") ? <Close /> : ""}­ ­{values.status}
            </Button>
        </div>
    ));

    const renderMonth = generateTimeSelect().map(data => (
        <MenuItem value={data.id}>{data.value > 0 && data.value < 13 ? "Tháng " + data.value : data.value}</MenuItem>
    ));

    useEffect(() => {
        scrollToRef(myRef);
    }, [topDoctor]);

    useEffect(() => {
        getTopXDoctor(topNum, whichMonth, packageStatus.done);
    }, []);

    if (topDoctor)
        return (
            <div>
                <div className="statistic-type" ref={myRef}>
                    <div className={type === 0 ? "statistic-type-active" : ""} onClick={() => setType(0)}>
                        {statisticType[0]}
                    </div>
                    <span></span>
                    <div className={type === 1 ? "statistic-type-active" : ""} onClick={() => setType(1)}>
                        {statisticType[1]}
                    </div>
                </div>
                <div className="statistic-filter-name">Thống kê {statisticType[type].toLowerCase()}</div>
                <div className="statistic-button-wrapper">{renderStatusOption}</div>
                <div className="statistic-time-filter">
                    <div className="statistic-filter-name">Lọc theo thời gian</div>
                    <Select defaultValue={0} onChange={handleMonthChange} style={{width: "100px"}}>
                        {renderMonth}
                    </Select>
                </div>
                <MaterialTable
                    isLoading={isLoad}
                    title={`Thống kê theo gói ${
                        topDoctor?.[0]
                            ? topDoctor?.[0]?.status_name.toUpperCase()
                            : statusOption.find(data => data.id === whichStatus).status.toUpperCase()
                    } ${whichMonth ? " (tháng " + whichMonth + ")" : ""}`}
                    columns={columns}
                    data={topDoctor}
                    localization={{
                        body: {
                            emptyDataSourceMessage: "Không có dữ liệu",
                        },
                        pagination: {
                            labelDisplayedRows: "{from}-{to} / Tổng: {count}",
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
                <Avatar style={{width: "80px", height: "80px", borderRadius: "50%"}} alt={rowData.doctor_name} src={rowData.avatarurl} />
                <span>{rowData.doctor_name}</span>
            </div>
        ),
        sorting: false,
    },
    {
        title: "ID Bác Sĩ",
        field: "doctor_id",
        sorting: false,
    },
    {
        title: "Số lượng gói",
        field: "status_count",
        searchable: false,
    },
    {
        title: "Đánh giá trung bình",
        field: "star",
        searchable: false,
        sorting: false,
    },
];

export default TopDoctor;

import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactApexChart from "react-apexcharts";
import _ from "lodash";

import {getStatisticDataApmPkg} from "../../redux/statistic";

import packageStatus from "../../config/package_status";
import apmStatus from "../../config/appointment_status";

import {Button, Select, MenuItem} from "@material-ui/core";
import {Person, AssignmentTurnedIn, AssignmentLate, Close, Timer, Today, ShowChart, Equalizer} from "@material-ui/icons";

const ChartApmPkg = () => {
    const scrollToRef = ref => window.scrollTo(0, ref?.current?.offsetTop);

    const dispatch = useDispatch();
    const dataGraph = useSelector(state => state.statistic.dataGraph);
    const {isLoad} = useSelector(state => state.ui);

    const [type, setType] = useState(0);
    const [viewOption, setViewOption] = useState(0);
    const [switchChartType, setSwitchChartType] = useState(0);

    let statisticType = ["gói", "cuộc hẹn"];

    const myRef1 = useRef(null);

    const [chartData, setChartData] = useState(null);
    const [whichMonth, setWhichMonth] = useState(null); //null = "all" (check statistic service)
    const [whichYear, setWhichYear] = useState(2020);
    const [whichStatus, setWhichStatus] = useState(null);
    const [statusName, setStatusName] = useState("đã hoàn thành");
    const [forceWaiting, setForceWaiting] = useState(false);

    //Type 0: Packages, 1: Apm
    const statusSampleOptions = type => {
        let statusOption0 = [
            {id: packageStatus.done, status: "đã hoàn thành", style: "status-done", data: 0},
            {id: packageStatus.running, status: "đang tiến hành", style: "status-running", data: 0},
            {id: packageStatus.doctorReject, status: "bác sĩ đã từ chối", style: "secondary", data: 0},
            {id: packageStatus.doctorCancel, status: "bác sĩ đã hủy", style: "inherit", data: 0},
            {id: packageStatus.systemCancel, status: "hệ thống đã hủy", style: "inherit", data: 0},
            {id: packageStatus.customerCancel, status: "khách hàng đã hủy", style: "secondary", data: 0},
            {id: packageStatus.waiting, status: "đang chờ", style: "status-waiting", data: 0}
        ];

        let statusOption1 = [
            {id: apmStatus.done, status: "đã hoàn thành", style: "status-done", data: 0},
            {id: apmStatus.dueDate, status: "sắp tới hạn", style: "status-dueDate", data: 0},
            {id: apmStatus.doctorCancel, status: "bác sĩ đã hủy", style: "inherit", data: 0},
            {id: apmStatus.systemCancel, status: "hệ thống đã hủy", style: "inherit", data: 0},
            {id: apmStatus.customerCancel, status: "khách hàng đã hủy", style: "secondary", data: 0},
            {id: apmStatus.pending, status: "đang xử lý", style: "status-waiting", data: 0}
        ];
        if (type == 0) {
            return statusOption0;
        }
        return statusOption1;
    };

    const generateChartCategories = () => {
        let categories = [];
        for (let month = 1; month < 13; month++) {
            categories.push(month);
        }
        return categories;
    };

    const generateTimeSelect = () => {
        let monthSelect = [];
        monthSelect.push({id: 0, value: "Toàn bộ"});
        for (let month = 1; month < 13; month++) {
            monthSelect.push({id: month, value: month});
        }
        return monthSelect;
    };

    const renderMonth = generateTimeSelect().map(data => (
        <MenuItem value={data.id}>{data.value > 0 && data.value < 13 ? "Tháng " + data.value : data.value}</MenuItem>
    ));

    //      Handle logic process data from backend
    const processChartAllStatus = type => {
        //
        //      This function is not optimized yet, it takes 1.5s average (depend on device) to process then fill data to Chart.
        //
        //      This is a dirty way to process array :( Loops take too long.
        //

        let dataSample = statusSampleOptions(type);
        let dataStandard = [];

        if (type === 0) {
            dataSample.map(sample => {
                for (const data of dataGraph) {
                    if (sample.id == data.id) {
                        dataStandard.push({id: data.id, data: data.status_count});
                        break;
                    }
                }
            });
        } else if (type === 1) {
            dataSample.map(sample => {
                for (const data of dataGraph) {
                    if (sample.id == data.status_id) {
                        dataStandard.push({id: data.status_id, data: data.status_count});
                        break;
                    }
                }
            });
        }

        let compareData = dataSample.filter(({id: id1}) => !dataStandard.some(({id: id2}) => id2 === id1));
        // let compareData = dataSample.filter(({id: id1}) => !dataStandard.some(({id: id2}) => id2 === id1))?.[0];
        if (!_.isEmpty(compareData)) {
            compareData.map(values => {
                dataStandard.push(values);
            });
        }

        let sortingData = [];
        dataSample.map(sample => {
            for (const data of dataStandard) {
                if (sample.id == data.id) {
                    sortingData.push({id: data.id, data: data.data});
                    break;
                }
            }
        });

        let dataSeries = [];
        sortingData.map(data => {
            dataSeries.push(data.data);
        });

        setChartData(dataSeries);
    };

    const processChartEachStatus = type => {
        let dataSample = [];
        for (let count = 1; count < 13; count++) {
            dataSample.push({month: count, status_count: 0});
        }

        let dataStandard = dataSample;

        if (type === 0) {
            dataSample.map((sample, index) => {
                for (const data of dataGraph) {
                    if (sample.month == data.month) {
                        dataStandard[index].status_count = data.count;
                        break;
                    }
                }
            });
        } else {
            dataSample.map((sample, index) => {
                for (const data of dataGraph) {
                    if (sample.month == data.month) {
                        dataStandard[index].status_count = data.status_count;
                        break;
                    }
                }
            });
        }

        let dataSeries = [];
        dataStandard.map(data => {
            dataSeries.push(data.status_count);
        });
        setChartData(dataSeries);
    };

    let chartOptions = {
        title: {
            text:
                "Biểu đồ thống kê " +
                (viewOption === 0 ? "tất cả trạng thái " : "") +
                statisticType[type] +
                (viewOption === 0 ? "" : " " + statusName.toUpperCase()) +
                (whichMonth ? ` (tháng ${whichMonth}, ${whichYear})` : ""),
            align: "center",
            margin: 20,
            floating: false,
            style: {
                fontSize: "18px",
                fontWeight: "bold",
                color: "#263238"
            }
        },
        chart: {
            fontFamily: "Open Sans, sans-serif",
            fontSize: "16px",
            zoom: {
                enabled: false
            },
            offsetX: switchChartType === 0 ? 0 : 5
        },
        noData: {
            text: "Không có dữ liệu",
            align: "center",
            verticalAlign: "middle",
            style: {
                color: "#263238",
                fontSize: "50px"
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "45%",
                distributed: true
            }
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: viewOption === 0 ? statusSampleOptions(type).map(data => data.status.toUpperCase()) : generateChartCategories(),
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: "bold"
                }
            },
            title: {
                text: viewOption === 0 ? "Trạng thái" : "Tháng"
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "14px"
                },
                formatter: value => {
                    return ~~value; //☢ Caution: ❝  ~~ : This thing will cut out all number after "," without rounding!❞
                }
            },
            title: {
                text: "Số " + statisticType[type] + (viewOption === 0 ? "" : " " + statusName.toUpperCase())
            }
        }
    };

    const getChartData = (whichMonth, whichYear, whichStatus, type) => {
        dispatch(getStatisticDataApmPkg(whichMonth, whichYear, whichStatus, type));
    };

    const handleMonthChange = event => {
        setWhichMonth(event.target.value === 0 ? null : event.target.value ?? null);
        getChartData(event.target.value === 0 ? null : event.target.value ?? null, whichYear, null, type);
    };

    const handleStatusView = () => {
        setForceWaiting(true);
        if (viewOption === 0) setViewOption(1);
        else setViewOption(0);
    };

    const handleSwitchChartType = () => {
        if (switchChartType === 0) setSwitchChartType(1);
        else setSwitchChartType(0);
    };

    const handleStatusChange = (statusID, statusName) => {
        setWhichStatus(statusID);
        setStatusName(statusName);
        getChartData(null, whichYear, statusID, type);
    };

    const renderStatusOption = statusSampleOptions(type).map(values => (
        <div key={values.id}>
            <Button
                className={`statistic-status-button ${
                    values.style !== "status-done" && values.style !== "status-running" && values.style !== "status-waiting" ? "" : values.style
                }`}
                variant={!values.style === "secondary" && !values.style === "inherit" ? "contained" : "outlined"}
                color={values.style === "secondary" ? values.style : values.style === "status-dueDate" ? "primary" : "inherit"}
                onClick={() => handleStatusChange(values.id, values.status)}
            >
                {values.style === "status-done" ? <AssignmentTurnedIn /> : values.style === "inherit" ? <AssignmentLate /> : ""}
                {values.style === "status-waiting" ? <Timer /> : values.style === "status-dueDate" ? <Today /> : ""}
                {values.status === "khách hàng đã hủy" ? <Person /> : values.status.includes("từ chối") ? <Close /> : ""}­ ­{values.status}
            </Button>
        </div>
    ));

    useEffect(() => {
        //  ****    NOTES: if status != null → month (must be) = "all"
        //          month != "all" when status != null → will cause conflic logic at backend.

        if (viewOption === 0) {
            if (!_.isEmpty(dataGraph)) {
                processChartAllStatus(type);
            } else setChartData(type === 0 ? [0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0]);
        } else {
            if (!_.isEmpty(dataGraph)) {
                processChartEachStatus(type);
            } else setChartData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }, [dataGraph]);

    // useEffect(() => {
    //     scrollToRef(myRef1);
    // }, [chartData]);

    useEffect(() => {
        if (viewOption === 0) {
            getChartData(whichMonth, whichYear, null, type);
            setWhichStatus(null);
        } else {
            getChartData(null, whichYear, type === 0 ? packageStatus.done : apmStatus.done, type);
            setWhichMonth(null);
            setWhichStatus(packageStatus.done);
            setStatusName("đã hoàn thành")
        }
    }, [type, viewOption]);

    useEffect(() => {
        if (!isLoad) {
            setForceWaiting(false);
            scrollToRef(myRef1);
        }
    }, [isLoad]);

    useEffect(() => {
        getChartData(whichMonth, whichYear, null, 0);
    }, []);

    return (
        <div>
            <div className="statistic-name" ref={myRef1}>
                Biểu đồ theo {statisticType[type]}
            </div>
            <div className="statistic-type">
                <div className={type === 0 ? "statistic-type-active" : ""} onClick={() => setType(0)}>
                    Theo {statisticType[0]}
                </div>
                <span></span>
                <div className={type === 1 ? "statistic-type-active" : ""} onClick={() => setType(1)}>
                    Theo {statisticType[1]}
                </div>
            </div>

            <div className="statistic-filter-name">Đổi kiểu thống kê</div>
            <div>
                <Button
                    disabled={isLoad || forceWaiting}
                    className="statistic-status-button chart-switch-type"
                    variant="contained"
                    color="inherit"
                    onClick={() => handleStatusView()}
                >
                    {viewOption === 0 ? `Tất cả trạng thái` : `Từng trạng thái`}
                </Button>
            </div>
            <div className="statistic-view-each-status">
                {viewOption === 1 ? (
                    <div>
                        <div className="statistic-filter-name">Lọc theo trạng thái</div>
                        <div className="statistic-button-wrapper">{renderStatusOption}</div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="statistic-time-filter">
                <div className="statistic-filter-left-part">
                    <div className="statistic-filter-name">Biểu đồ {switchChartType === 0 ? "cột" : "đường"}</div>
                    <button
                        disabled={isLoad}
                        className={`statistic-switch-button  ${switchChartType === 0 ? " chart-switch-actived" : ""}`}
                        onClick={() => handleSwitchChartType()}
                    >
                        <Equalizer />
                    </button>
                    <button
                        disabled={isLoad}
                        className={`statistic-switch-button  ${switchChartType === 1 ? " chart-switch-actived" : ""}`}
                        onClick={() => handleSwitchChartType()}
                    >
                        ­<ShowChart />
                    </button>
                </div>
                <div className="statistic-filter-right-part">
                    <div className="statistic-filter-name">Lọc theo thời gian</div>
                    {viewOption === 0 ? (
                        <Select defaultValue={0} onChange={handleMonthChange} style={{width: "100px"}}>
                            {renderMonth}
                        </Select>
                    ) : (
                        ""
                    )}
                    <div>­{viewOption === 0 ? (whichMonth ? " Năm 2020" : "") : "Năm 2020"}</div>
                </div>
            </div>
            {!_.isEmpty(chartData) ? (
                <div>
                    {/* {chartData == [0, 0, 0, 0, 0, 0, 0] || chartData == [0, 0, 0, 0, 0, 0] ? <div>Không có dữ liệu</div> : ""} */}
                    <div className="chart-wrapper">
                        <ReactApexChart
                            className={switchChartType === 1 ? "chart-hidden" : ""}
                            options={chartOptions}
                            series={[{name: `Số ${statisticType[type]}`, data: chartData}]}
                            type="bar"
                            height={380}
                        />

                        <ReactApexChart
                            className={switchChartType === 0 ? "chart-hidden" : ""}
                            options={chartOptions}
                            series={[{name: `Số ${statisticType[type]}`, data: chartData}]}
                            type="line"
                            height={380}
                        />
                    </div>
                </div>
            ) : (
                <div>Không có dữ liệu</div>
            )}
        </div>
    );
};

export default ChartApmPkg;

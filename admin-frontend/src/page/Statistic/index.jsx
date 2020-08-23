import React, {useState,useEffect} from "react";
import PropTypes from "prop-types";
import MiniDrawer from "../../component/Drawer";
import LoadingPage from "../../component/BackDrop";
import TopDoctor from "./TopDoctor";
import ChartApmPkg from "./ChartApmPkg";

import {Fab, Zoom, useScrollTrigger} from "@material-ui/core";
import {KeyboardArrowUp} from "@material-ui/icons";

// import DefaultAvatar from "../../assets/image/hhs-default_avatar.jpg";
import Chart1 from "../../assets/icon/combo-chart-50-2.png";
import PieChart from "../../assets/icon/pie-chart-report-50.png";
import NumberReport from "../../assets/icon/graph-report-50.png";

import {makeStyles} from "@material-ui/core/styles";
import "./style.css";

const Statistic = () => {
    const [switchStatistic, setSwitchStatistic] = useState(0);

    let statisticName = ["Thống kê Bác sĩ tích cực", "Biểu đồ gói / cuộc hẹn", "Thống kê truy cập & Đánh giá Website"];

    const useStyles = makeStyles(theme => ({
        root: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }));

    const ScrollTop = props => {
        const {children} = props;
        const classes = useStyles();
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 100,
        });

        const handleClick = event => {
            const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");

            if (anchor) {
                anchor.scrollIntoView({behavior: "smooth", block: "start"});
            }
        };

        return (
            <Zoom in={trigger}>
                <div onClick={handleClick} role="presentation" className={classes.root}>
                    {children}
                </div>
            </Zoom>
        );
    };

    ScrollTop.propTypes = {
        children: PropTypes.element.isRequired,
    };

    const renderStatistic = type => {
        switch (type) {
            case 0:
                return <TopDoctor />;
            case 1:
                return <ChartApmPkg />;
            default:
                return <div className="statistic-no-data">Hiện chưa có dữ liệu cho kiểu thống kê này!</div>;
        }
    };

    return (
        <div className="default-div" id="back-to-top-anchor">
            <LoadingPage />
            <MiniDrawer>
                <div className="statistic-wrapper">
                    <div className="all-statistic">
                        <div className="each-statistic" onClick={() => setSwitchStatistic(0)}>
                            <div className="each-statistic-image">
                                <img
                                    className="statistic-image-wrapper"
                                    src={"https://img.icons8.com/fluent/100/000000/conference-call.png"}
                                    alt="statistic-doctor"
                                />
                            </div>
                            <div className="each-statistic-description">{statisticName[0]}</div>
                        </div>
                        <div className="each-statistic" onClick={() => setSwitchStatistic(1)}>
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={Chart1} alt="statistic-package" />
                            </div>
                            <div className="each-statistic-description">{statisticName[1]}</div>
                        </div>
                        <div className="each-statistic" onClick={() => setSwitchStatistic(2)}>
                            <div className="each-statistic-image">
                                <img
                                    className="statistic-image-wrapper"
                                    src={NumberReport}
                                    alt="evaluate-website"
                                />
                            </div>
                            <div className="each-statistic-description">{statisticName[2]}</div>
                        </div>
                    </div>
                    <div className="statistic-specific-wrapper">
                        {renderStatistic(switchStatistic)}
                    </div>
                    <ScrollTop>
                        <Fab color="primary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUp />
                        </Fab>
                    </ScrollTop>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Statistic;

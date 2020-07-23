import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MiniDrawer from "../../component/Drawer";
import LoadingPage from "../../component/BackDrop";
import TopDoctor from "./TopDoctor";

import DefaultAvatar from "../../assets/image/hhs-default_avatar.jpg";
import {Fab, Zoom, useScrollTrigger} from "@material-ui/core";
import {KeyboardArrowUp} from "@material-ui/icons";

import {makeStyles} from "@material-ui/core/styles";
import "./style.css";

const Statistic = () => {
    const [switchStatistic, setSwitchStatistic] = useState(0);
    let statisticName = ["Thống kê Bác sĩ", "Biểu đồ cuộc hẹn", "Biểu đồ gói", "Thống kê lượt truy cập"];

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
                                <img className="statistic-image-wrapper" src={"https://img.icons8.com/fluent/100/000000/pie-chart-report.png"} alt="" />
                            </div>
                            <div className="each-statistic-description">{statisticName[0]}</div>
                        </div>
                        <div className="each-statistic" onClick={() => setSwitchStatistic(1)}>
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={"https://img.icons8.com/clouds/100/000000/maintenance-date.png"} alt="" />
                            </div>
                            <div className="each-statistic-description">{statisticName[1]}</div>
                        </div>
                        <div className="each-statistic" onClick={() => setSwitchStatistic(2)}>
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={"https://img.icons8.com/dusk/100/000000/package.png"} alt="" />
                            </div>
                            <div className="each-statistic-description">{statisticName[2]}</div>
                        </div>
                        <div className="each-statistic" onClick={() => setSwitchStatistic(3)}>
                            <div className="each-statistic-image">
                                <img className="statistic-image-wrapper" src={"https://img.icons8.com/fluent/100/000000/conference-call.png"} alt="" />
                            </div>
                            <div className="each-statistic-description">{statisticName[3]}</div>
                        </div>
                    </div>
                    <div className="statistic-specific-wrapper">
                        <div className="statistic-name">{statisticName[switchStatistic]}</div>
                        {renderStatistic(switchStatistic)}
                    </div>
                    <ScrollTop>
                        <Fab color="primary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUp  />
                        </Fab>
                    </ScrollTop>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default Statistic;

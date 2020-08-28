import React, { useEffect, useState, Fragment } from 'react';
import "./style.css"
import MiniDrawer from '../../component/Drawer';
import LoadingPage from '../../component/BackDrop';
import { withRouter, Redirect } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, Avatar, makeStyles, Tabs, Tab, Paper, useTheme, Chip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPackageInfo, getPackageStatus } from '../../redux/package';
import moment from "moment"
import History from './History';
import Appointment from './Appointment';
import _ from "lodash"
import package_status from "../../config/package_status"
import CancelPackage from './CancelPackage';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        border: `1px solid #dadada`,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

}));

const PackageDetail = (props) => {
    const classes = useStyles();
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const { packageInfo, packageData } = useSelector(state => state.package);

    const [tabIndex, settabIndex] = useState(0);
    const [redirect, setredirect] = useState(false);
    const [dialogVisible, setdialogVisible] = useState(false);

    const handleChange = (event, newValue) => {
        settabIndex(newValue);
    };

    useEffect(() => {

        dispatch(getPackageInfo(id))
        dispatch(getPackageStatus(id));


    }, []);

    const goBack = () => {
        setredirect(true)
    }

    if (redirect) {
        return <Redirect
            to={{
                pathname: "/",
                state: { from: props.location }
            }}
        />
    }

    const openDialog = () => {
        setdialogVisible(true)
    }

    const closeDialog = () => {
        setdialogVisible(false)
    }

    const renderCancelButton = () => {
        if (
            packageData?.status[packageData?.status.length - 1]?.package_status_detail_id === package_status.running
            ||
            packageData?.status[packageData?.status.length - 1]?.package_status_detail_id === package_status.waiting

        ) {
            return (
                <div className="package-detail-header-operator">
                    <Button onClick={openDialog} variant="outlined" color="secondary">
                        Hủy gói
                </Button>
                </div>
            )
        }
    }

    return (
        <div>
            <LoadingPage />
            <MiniDrawer>
                <div>
                    <Button onClick={goBack} variant="outlined" color="primary" startIcon={<ArrowBackIcon />}>
                        Trở lại
                    </Button>
                    <h3>Thông tin gói mã số {packageInfo?.id}   <Chip
                        variant="outlined"
                        size="large"
                        label={!_.isEmpty(packageData?.status) ? packageData?.status[packageData.status.length - 1]?.status_name : ''}
                        color="primary"
                    /></h3>
                    <div className="package-detail-header">
                        <div className="package-detail-header-info">
                            <div className="package-detail-header-info-item">
                                Ngày tạo : <span className="highlight"> {moment(packageInfo?.created_at).format('DD-MM-YYYY [vào] HH [giờ] mm [phút]')}</span>
                            </div>
                            <div className="package-detail-header-info-item">
                                Bác sĩ : <span className="highlight">
                                    <Avatar className={classes.large} alt={packageInfo?.doctor_name} src={packageInfo?.doctor_avatar} />
                                </span>
                                <span className="highlight">
                                    {packageInfo?.doctor_name}
                                </span>
                            </div>
                            <div className="package-detail-header-info-item">
                                Bệnh nhân: <span className="highlight">
                                    <Avatar className={classes.large} alt={packageInfo?.patient_name} src={packageInfo?.avatarurl} />
                                </span>
                                <span className="highlight">
                                    {packageInfo?.patient_name}
                                </span>
                            </div>
                            <div className="package-detail-header-info-item">
                                Địa chỉ: <span className="highlight">
                                    {packageInfo?.address}
                                </span>
                            </div>
                            <div className="package-detail-header-info-item">
                                Số điện thoại liên lạc: <span className="highlight">
                                    {packageInfo?.phone}
                                </span>
                            </div>
                            <div className="package-detail-header-info-item">
                                Lý do: <span className="highlight">
                                    {packageInfo?.reason}
                                </span>
                            </div>
                            <div className="package-detail-header-info-item package-detail-header-info-rating">
                                Đánh giá của khách hàng :
                                {packageInfo?.star ? (
                                    <span className="highlight">
                                        <Rating size="medium" readOnly defaultValue={packageInfo?.star} />
                                        <br />
                                        {packageInfo?.comment ?? ''}
                                    </span>
                                ) : ' Chưa có đánh giá'}
                            </div>
                        </div>
                        {renderCancelButton()}
                    </div>
                    <br />
                    <br />
                    <div>
                        <Tabs
                            className={classes.root}
                            value={tabIndex}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Các cuộc hẹn" />
                            <Tab label="Lịch sử" />
                        </Tabs>
                    </div>
                    <br />
                    <Fragment>
                        <Appointment tabIndex={tabIndex} />
                        <History tabIndex={tabIndex} />
                    </Fragment>
                    <CancelPackage dialogVisible={dialogVisible} closeDialog={closeDialog} openDialog={openDialog} />
                </div>
            </MiniDrawer>
        </div>
    );
};

export default withRouter(PackageDetail);
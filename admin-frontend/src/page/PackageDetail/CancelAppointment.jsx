import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import package_status from "../../config/package_status"
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import appointment_status from "../../config/appointment_status"
import { updateAppointmentPackage } from '../../redux/package';

const CancelAppointment = (props) => {

    const dispatch = useDispatch()

    const submitCancel = () => {
        const data = {};
        data.appointmentId = props?.appointmentId;
        data.packageId = props.match.params.id;
        data.appointment_status_id = appointment_status.systemCancel;
        dispatch(updateAppointmentPackage(data))
        props.closeDialog()
    }

    return (
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Xác nhận hủy gói</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hãy chắc chắn rằng bạn đã có sự đồng ý của cả bệnh nhân và bác sĩ
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Hủy
                </Button>
                <Button onClick={submitCancel} color="secondary">
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(CancelAppointment);
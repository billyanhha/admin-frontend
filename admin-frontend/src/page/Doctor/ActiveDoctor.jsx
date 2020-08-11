import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import {updateDoctor, updateDoctorSuccessful} from "../../redux/staff";

const ActiveDoctor = props => {
    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const updateStatus = useSelector(state => state.doctor.updateStatus);

    const onSubmit = () => {
        let data = {active: props?.data?.active ? "false" : "true"};
        dispatch(updateDoctor(props.doctorID, data));
    };

    useEffect(() => {
        if (updateStatus) {
            props.closeDialog();
            dispatch(updateDoctorSuccessful(false));
        }
    }, [updateStatus]);

    return (
        <Dialog maxWidth="md" open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thay đổi thạng thái</DialogTitle>
            <DialogContent>
                {props?.data?.active ? (
                    <div className="doctor-active-msg-warning">
                        <Alert severity="warning">
                            <AlertTitle><strong>Cảnh báo!</strong></AlertTitle>
                            Vô hiệu hoá tài khoản sẽ <strong>HUỶ TẤT CẢ</strong> cuộc hẹn và gói sắp tới của Bác sĩ {props?.data?.fullname}!
                        </Alert>
                    </div>
                ) : (
                    ""
                )}
                <div className="doctor-active-msg">
                    Bạn chắc chắn muốn{" "}
                    {props?.data?.active ? (
                        <b className="showoff-status-deactive">vô hiệu hóa tài khoản</b>
                    ) : (
                        <b className="showoff-status-active">kích hoạt tài khoản</b>
                    )}{" "}
                    này?
                </div>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoad} onClick={props.closeDialog} color="secondary">
                    Hủy
                </Button>
                <Button disabled={isLoad} onClick={() => onSubmit()} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(ActiveDoctor);

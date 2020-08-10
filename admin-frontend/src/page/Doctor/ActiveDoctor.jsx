import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {ErrorOutlineOutlined} from "@material-ui/icons";
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
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thay đổi thạng thái</DialogTitle>
            <DialogContent>
                {props?.data?.active ? (
                    <div className="doctor-active-msg-warning">
                        <b className="showoff-status-deactive">
                            <ErrorOutlineOutlined style={{fontSize: 20}} />
                            {" ­ "} Cảnh báo!
                        </b>{" "}
                        Vô hiệu hoá tài khoản Bác sĩ sẽ huỷ tất cả cuộc hẹn / gói sắp tới của Bác sĩ này!
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

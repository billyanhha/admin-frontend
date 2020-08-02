import React, {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {NotificationManager} from "react-notifications";
import Select from "react-select";

import {CallOutlined, HomeOutlined, ContactMailOutlined, AccountCircleOutlined, CardMembership, EditOutlined} from "@material-ui/icons";
import {CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment} from "@material-ui/core";


const SpecificationDoctor = props => {
    const {control, handleSubmit, register, errors, reset} = useForm(props.data);
    const dispatch = useDispatch();
    const [needEdit, setNeedEdit] = useState(false);

    const handleCloseDialog = () => {
        props.closeDialog();
        setNeedEdit(false);
    };

    const onSubmit = data => {
        console.log(data);
        //     data.id = props.data.id;
        //     data.role = "coordinator";
        //     dispatch(editStaff(data));
        //     handleCloseDialog();
    };

    useEffect(() => {
        console.log(props.data);
        // reset(props.data);
    }, [props.data]);

    return (
        <Dialog open={props.dialogVisible} onClose={() => handleCloseDialog()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{needEdit ? "Chỉnh sửa thông tin đặc tả" : "Thông tin đặc tả"}</DialogTitle>
            <DialogContent>
                <div className={!needEdit ? "doctor-form-disable-edit" : ""}>
                    spec
                </div>
            </DialogContent>
            <DialogActions>
                <div className="doctor-edit-button">
                    <div>
                        {needEdit ? (
                            ""
                        ) : (
                            <Button variant="outlined" color="primary" onClick={() => setNeedEdit(true)}>
                                <EditOutlined /> ­ Chỉnh sửa thông tin
                            </Button>
                        )}
                    </div>
                    <Button onClick={() => handleCloseDialog()} color="secondary">
                        {needEdit ? "Huỷ chỉnh sửa và đóng" : "Đóng"}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(SpecificationDoctor);
import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Select from "react-select";
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { InputAdornment } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import ContactsIcon from '@material-ui/icons/Contacts';
import PhoneIcon from '@material-ui/icons/Phone';
import { NotificationManager } from 'react-notifications';
import { registerStaff, editStaff, changeStaffStatus } from '../../redux/user';

const ActiveStaff = (props) => {



    const dispatch = useDispatch()

    useEffect(() => {


    }, [props.data]);

    const onSubmit = () => {
        dispatch(changeStaffStatus(props?.data))
        props.closeDialog()
    };

    return (
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thay đổi thạng thái</DialogTitle>
            <DialogContent>
                Bạn chắc chắn muốn <span className="highlight">
                    {props?.data?.active ? ' vô hiệu tài khoản hóa' : ' bât tài khoản'}
                </span> này chứ
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Hủy
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(ActiveStaff);
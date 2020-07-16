import React, { useState, useRef } from 'react';
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
import { registerStaff } from '../../redux/user';

const AddStaff = (props) => {

    const { control, handleSubmit, register } = useForm();
    const dispatch = useDispatch()

    const onSubmit = data => {
        if (data.password !== data.password_repeat) {
            NotificationManager.error('Mật khẩu không trùng khớp', 'Thông báo')
        } else {
            data.role = 'coordinator'
            dispatch(registerStaff(data))
            props.closeDialog()
        }
    };

    return (
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thêm điều phối viên</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label='Tên đầy đủ'
                            name="fullname"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            control={control}
                            defaultValue=""
                            required
                        />
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            control={control}
                            defaultValue=""
                            required
                        />
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            name="address"
                            label="Địa chỉ"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ContactsIcon />
                                    </InputAdornment>
                                ),
                            }}
                            control={control}
                            defaultValue=""
                            required
                        />
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            name="phone"
                            label="Số điện thoại"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                            type="number"
                            control={control}
                            defaultValue=""
                            required
                        />
                        <h4>Giới tính
                        <select className="staff-gender-select" name="gender" ref={register}>
                                <option value="Female">Nữ</option>
                                <option value="Male">Nam</option>
                            </select>
                        </h4>
                        <div className="staff-password">
                            <Controller
                                as={TextField}
                                variant="outlined"
                                margin="normal"
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                control={control}
                                defaultValue=""
                                required
                            />
                            <Controller
                                as={TextField}
                                variant="outlined"
                                margin="normal"
                                name="password_repeat"
                                label="Confirm mật khẩu"
                                type="password"
                                control={control}
                                defaultValue=""
                                required
                            />
                        </div>
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Thêm
                    </Button>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(AddStaff);
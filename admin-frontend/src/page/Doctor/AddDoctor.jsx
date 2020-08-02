import React, {useState, useRef, useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {NotificationManager} from "react-notifications";
import InputMask from "react-input-mask";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

import AccountCircle from "@material-ui/icons/AccountCircle";
import ContactsIcon from "@material-ui/icons/Contacts";

import {CardMembership} from "@material-ui/icons";
import {CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment} from "@material-ui/core";

import {createDoctor, createDoctorSuccessful} from "../../redux/staff";

const AddStaff = props => {
    const {isLoad} = useSelector(state => state.ui);
    const status = useSelector(state => state.doctor.status);

    const {control, handleSubmit, register, errors, watch} = useForm();
    const dispatch = useDispatch();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {
        let phone = data.phone.replace(/\s+/g, "").substring(1);
        data.phone = phone;

        dispatch(createDoctor(data));
    };

    useEffect(() => {
        if (status) {
            props.closeDialog();
            dispatch(createDoctorSuccessful(false));
        }
    }, [status]);

    return (
        <Dialog open={props.dialogVisible} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thêm & Tạo tài khoản cho Bác sĩ</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="doctor-create-title">Thông tin cá nhân</div>
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label="Tên đầy đủ"
                            name="fullname"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                            control={control}
                            defaultValue=""
                            required
                        />

                        <p className="doctor-form-label">Số điện thoại *</p>
                        <Controller
                            as={InputMask}
                            className="doctor-form-input"
                            name="phone"
                            control={control}
                            mask="+84 999 999 999"
                            placeholder="+84 912 345 678"
                            autoComplete="off"
                            defaultValue=""
                            maskChar={null}
                            rules={{required: "Bạn hãy điền số điện thoại "}}
                            required
                        />
                        <ErrorMessage errors={errors} name="phone">
                            {({messages}) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <span className="error-text" key={type}>
                                        {message}
                                    </span>
                                ))
                            }
                        </ErrorMessage>

                        <div className="doctor-sex-session">
                            Giới tính *
                            <select className="staff-gender-select" name="gender" ref={register}>
                                <option value="Female">Nữ</option>
                                <option value="Male">Nam</option>
                            </select>
                        </div>

                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            name="license"
                            label="Giấy phép hành nghề"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CardMembership />
                                    </InputAdornment>
                                )
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
                                )
                            }}
                            control={control}
                            defaultValue=""
                            required
                        />

                        <div className="doctor-create-session">
                            <div className="doctor-create-title">Tài khoản</div>
                            <Controller
                                as={TextField}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                control={control}
                                defaultValue=""
                                required
                            />
                            <div className="staff-password">
                                <Controller
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    defaultValue=""
                                    control={control}
                                />
                                <Controller
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="password_repeat"
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    defaultValue=""
                                    control={control}
                                    rules={{validate: value => value === watch("password", "") || "Mật khẩu không khớp "}}
                                />
                            </div>
                            <ErrorMessage errors={errors} name="password_repeat">
                                {({messages}) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <span className="error-text" key={type}>
                                            {message}
                                        </span>
                                    ))
                                }
                            </ErrorMessage>
                        </div>
                        <Button disabled={isLoad} type="submit" fullWidth variant="contained" color="primary">
                            {isLoad ? <CircularProgress size={20} /> : ""} ­ Thêm Bác sĩ
                        </Button>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="secondary">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(AddStaff);

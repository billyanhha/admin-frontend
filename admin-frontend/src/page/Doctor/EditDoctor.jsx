import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";

import {CallOutlined, HomeOutlined, ContactMailOutlined, AccountCircleOutlined, CardMembership, EditOutlined} from "@material-ui/icons";
import {CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment} from "@material-ui/core";

import {updateDoctor, updateDoctorSuccessful} from "../../redux/staff";

const EditDoctor = props => {
    const {isLoad} = useSelector(state => state.ui);
    const {control, handleSubmit, register, errors, reset} = useForm(props.data);
    const updateStatus = useSelector(state => state.doctor.updateStatus);

    const dispatch = useDispatch();
    const [needEdit, setNeedEdit] = useState(false);

    const sampleData = [{lang: "May gioi vl", li: "1234"}];

    const handleCloseDialog = () => {
        props.closeDialog();
        setNeedEdit(false);
    };

    const onSubmit = data => {
        let req = {
            id: data.id,
            fullname: data.fullname,
            email: data.email,
            gender: data.gender,
            address: data.address,
            phone: data.phone,
            license: data.license,
            doctorAvatar: data.avatarurl
        };

        dispatch(updateDoctor(req));
    };

    useEffect(() => {
        console.log(props.data);
        reset(props.data);
    }, [props.data]);

    useEffect(() => {
        if (updateStatus) {
            handleCloseDialog();
            dispatch(updateDoctorSuccessful(false));
        }
    }, [updateStatus]);

    return (
        <Dialog open={props.dialogVisible} onClose={() => handleCloseDialog()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{needEdit ? "Chỉnh sửa thông tin Bác sĩ" : "Thông tin cơ bản"}</DialogTitle>
            <DialogContent>
                <div className={!needEdit || isLoad ? "doctor-form-disable-edit" : ""}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label="Tên đầy đủ"
                            name="fullname"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlined />
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
                            label={needEdit ? "Email (không thể thay đổi)" : "Email"}
                            name="email"
                            type="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ContactMailOutlined />
                                    </InputAdornment>
                                ),
                                readOnly: true
                            }}
                            control={control}
                            defaultValue=""
                        />
                        <div className="doctor-sex-session">
                            Giới tính
                            {needEdit ? (
                                <select className="staff-gender-select" name="gender" ref={register}>
                                    <option value="Female">Nữ</option>
                                    <option value="Male">Nam</option>
                                </select>
                            ) : (
                                <span>{props.data.gender === "Male" ? " Nam" : " Nữ"}</span>
                            )}
                        </div>
                        <Controller
                            as={TextField}
                            margin="normal"
                            fullWidth
                            name="address"
                            label="Địa chỉ"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeOutlined />
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
                            name="phone"
                            label="Số điện thoại"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CallOutlined />
                                    </InputAdornment>
                                )
                            }}
                            type="number"
                            control={control}
                            defaultValue=""
                            required
                        />
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

                        <div className="doctor-submit-session">
                            {needEdit ? (
                                <Button disabled={isLoad} type="submit" fullWidth variant="contained" color="primary">
                                    {isLoad ? <CircularProgress size={20} /> : ""} ­ Lưu chỉnh sửa
                                </Button>
                            ) : (
                                ""
                            )}
                        </div>
                    </form>
                </div>
                <Button fullWidth variant="contained" color="primary" onClick={() => props.openSpecification(sampleData)}>
                    Xem thông tin đặc tả
                </Button>
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

export default withRouter(EditDoctor);

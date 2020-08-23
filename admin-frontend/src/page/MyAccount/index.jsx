import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

import {editStaffProfile, setStatus, changePassword} from "../../redux/staff";
import {getUser} from "../../redux/user";

import MiniDrawer from "../../component/Drawer";
import LoadingPage from "../../component/BackDrop";

import {NotificationContainer, NotificationManager} from "react-notifications";

import {Modal, CircularProgress} from "@material-ui/core";
import {Visibility, VisibilityOff, Close} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

import "./style.css";

const ProfileStaff = () => {
    const {register, handleSubmit, watch, errors, control, reset} = useForm({validateCriteriaMode: "all"});
    const password = useRef({});
    const old_password = useRef({});
    password.current = watch("password", "");
    old_password.current = watch("old_password", "");

    const dispatch = useDispatch();
    const {isLoad} = useSelector(state => state.ui);
    const token = useSelector(state => state.auth.token);
    const {currentUser} = useSelector(state => state.user);
    const uploadStatus = useSelector(state => state.staff.updateStatus);

    const [email, setEmail] = useState(null);
    const [passwordShown, setPasswordShown] = useState({
        password: false,
        new_password: false,
        confirm_password: false
    });
    const [updateToggle, setUpdateToggle] = useState(false);
    const [visiablePassword, setVisiablePassword] = useState(false);

    const handleChangePassword = data => {
        let formPassword = {
            password: data.old_password,
            new_password: data.password,
            confirm_password: data.password_repeat
        };
        dispatch(changePassword(token, currentUser?.id, formPassword));
    };

    const handleChangeEmail = data => {
        let formEmail = {
            email: data.email
        };
        dispatch(editStaffProfile(token, currentUser?.id, formEmail));
    };

    const handleCancelModal = () => {
        setVisiablePassword(false);
    };

    const handleToggleEmail = () => {
        if (currentUser?.role === "admin") setUpdateToggle(true);
        else {
            NotificationManager.warning("", "Chỉ Admin có quyền thay đổi Email!", 3000);
        }
    };

    useEffect(() => {
        if (uploadStatus) {
            handleCancelModal();
            setUpdateToggle(false);
            dispatch(setStatus(false));
            dispatch(getUser(token));
        }
    }, [uploadStatus]);

    useEffect(() => {
        setEmail(currentUser?.email);
    }, [currentUser]);

    return (
        <div>
            <LoadingPage />
            <MiniDrawer>
                <div className="account-wrapper">
                    <div className="dashboard-component-header">Tài khoản của tôi</div>
                    <div className="account-content">
                        {/* <div className="account-content-header">Bảo mật</div> */}
                        <div className="account-element">
                            <div className="account-email">
                                <form onSubmit={handleSubmit(handleChangeEmail)}>
                                    <div className="account-form-field">
                                        <p>Email</p>
                                        {updateToggle ? (
                                            <>
                                                <input
                                                    type="email"
                                                    className="account-form-input"
                                                    placeholder="abc@tenmien.com"
                                                    name="email"
                                                    defaultValue={email}
                                                    ref={register({
                                                        pattern: {
                                                            value: /[\S+@\S+\.\S+]{6}/,
                                                            message: "Email không hợp lệ "
                                                        }
                                                    })}
                                                />
                                                <ErrorMessage errors={errors} name="email">
                                                    {({messages}) =>
                                                        messages &&
                                                        Object.entries(messages).map(([type, message]) => (
                                                            <span className="error-text" key={type}>
                                                                {message}
                                                            </span>
                                                        ))
                                                    }
                                                </ErrorMessage>
                                                <div>
                                                    <Button disabled={isLoad} variant="outlined" color="primary" type="submit">
                                                        {isLoad ? <CircularProgress size={20} /> : ""} ­ Cập nhật
                                                    </Button>
                                                    <Button color="default" disableElevation onClick={() => setUpdateToggle(false)}>
                                                        <Close />
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>{currentUser?.email ?? ""}</div>
                                                <div className="account-element-action" onClick={() => handleToggleEmail()}>
                                                    Thay đổi
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="account-element account-form-field">
                            <div className="account-element-name">Mật khẩu</div>
                            <div className="account-element-action" onClick={() => setVisiablePassword(true)}>
                                Thay đổi
                            </div>
                            <Modal open={visiablePassword} onClose={() => handleCancelModal()}>
                                <div className="profile-modal account-modal">
                                    <div className="modal-title">Đổi mật khẩu</div>
                                    <form onSubmit={handleSubmit(handleChangePassword)}>
                                        <div className="profile-form-field">
                                            <p className="profile-form-label">Mật khẩu hiện tại</p>
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={passwordShown.password ? "text" : "password"}
                                                    className="profile-form-input"
                                                    name="old_password"
                                                    autoFocus
                                                    ref={register({
                                                        required: "Bạn hãy điền password ",
                                                        minLength: {
                                                            value: 6,
                                                            message: "Password phải có ít nhất 6 kí tự "
                                                        },
                                                        maxLength: {
                                                            value: 14,
                                                            message: "Password nhiều nhất là 14 kí tự "
                                                        }
                                                    })}
                                                />
                                                {passwordShown.password ? (
                                                    <Visibility onClick={() => setPasswordShown({...passwordShown, password: false})} />
                                                ) : (
                                                    <VisibilityOff onClick={() => setPasswordShown({...passwordShown, password: true})} />
                                                )}
                                            </div>
                                            <ErrorMessage errors={errors} name="old_password">
                                                {({messages}) =>
                                                    messages &&
                                                    Object.entries(messages).map(([type, message]) => (
                                                        <span className="error-text" key={type}>
                                                            {message}
                                                        </span>
                                                    ))
                                                }
                                            </ErrorMessage>

                                            <p className="profile-form-label">Mật khẩu mới</p>
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={passwordShown.new_password ? "text" : "password"}
                                                    className="profile-form-input"
                                                    name="password"
                                                    ref={register({
                                                        required: "Bạn hãy điền password ",
                                                        minLength: {
                                                            value: 6,
                                                            message: "Password phải có ít nhất 6 kí tự "
                                                        },
                                                        maxLength: {
                                                            value: 14,
                                                            message: "Password nhiều nhất là 14 kí tự "
                                                        },
                                                        validate: value => value !== old_password.current || "Mật khẩu mới giống hiện tại "
                                                    })}
                                                />
                                                {passwordShown.new_password ? (
                                                    <Visibility onClick={() => setPasswordShown({...passwordShown, new_password: false})} />
                                                ) : (
                                                    <VisibilityOff onClick={() => setPasswordShown({...passwordShown, new_password: true})} />
                                                )}
                                            </div>
                                            <ErrorMessage errors={errors} name="password">
                                                {({messages}) =>
                                                    messages &&
                                                    Object.entries(messages).map(([type, message]) => (
                                                        <span className="error-text" key={type}>
                                                            {message}
                                                        </span>
                                                    ))
                                                }
                                            </ErrorMessage>

                                            <p className="profile-form-label">Nhập lại mật khẩu</p>
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={passwordShown.confirm_password ? "text" : "password"}
                                                    name="password_repeat"
                                                    className="profile-form-input"
                                                    ref={register({
                                                        // required: "Bạn hãy điền password ",
                                                        validate: value => value === password.current || "Mật khẩu mới không khớp "
                                                    })}
                                                />
                                                {passwordShown.confirm_password ? (
                                                    <Visibility onClick={() => setPasswordShown({...passwordShown, confirm_password: false})} />
                                                ) : (
                                                    <VisibilityOff onClick={() => setPasswordShown({...passwordShown, confirm_password: true})} />
                                                )}
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
                                        <div className="account-submit">
                                            <Button disabled={isLoad} variant="outlined" color="primary" type="submit">
                                                {isLoad ? <CircularProgress size={20} /> : ""} ­ Đổi mật khẩu
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </MiniDrawer>
        </div>
    );
};

export default ProfileStaff;

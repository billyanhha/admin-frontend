import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, withRouter, Redirect} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

import {CircularProgress, Button, TextField} from "@material-ui/core";

import {sendMailReset, sendPasswordReset, checkEmailExpired} from "../../redux/staff";

import "./style.css";

const ForgotPassword = props => {
    const {isLoad} = useSelector(state => state.ui);
    const sendMailStatus = useSelector(state => state.staff.sendMailStatus);
    const resetPasswordStatus = useSelector(state => state.staff.resetPassStatus);
    const expiredStatus = useSelector(state => state.staff.expiredStatus);
    const tokenUser = useSelector(state => state.auth.token);

    const tokenMail = props.match.params?.token === "privacy" ? null : props.match.params?.token;

    const history = useHistory();
    const dispatch = useDispatch();
    const {register, handleSubmit, watch, errors, control} = useForm({validateCriteriaMode: "all"});

    const handleSendEmail = data => {
        let request = {role: "staff", recipient: data.email};
        dispatch(sendMailReset(request));
    };

    const handleResetPassword = data => {
        let request = {new_password: data.password, confirm_password: data.password_repeat};
        dispatch(sendPasswordReset(tokenMail, request));
    };

    useEffect(() => {
        if (resetPasswordStatus) {
            history.push("/login");
        }
    }, [resetPasswordStatus]);

    useEffect(() => {

        if (tokenUser) {
            history.push("/");
        } else {
            if (tokenMail) dispatch(checkEmailExpired(tokenMail));
        }
    }, []);

    if (tokenMail) {
        if (expiredStatus === false) {
            return <Redirect to="/forgot-password/privacy" />;
        } else if (expiredStatus === null) {
            return "";
        }
    }

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-wrapper">
                <div>
                    <div className="forgot-password-img">
                        <img src="https://img.icons8.com/nolan/100/forgot-password.png" />
                    </div>
                    <div className="forgot-password-title"> {!sendMailStatus ? "Đặt lại mật khẩu" : "Đã gửi Email xác nhận"}</div>

                    {!tokenMail ? (
                        <div>
                            {!sendMailStatus ? (
                                <div>
                                    <form onSubmit={handleSubmit(handleSendEmail)}>
                                        <div className="forgot-form-field">
                                            <Controller
                                                as={TextField}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                autoFocus
                                                control={control}
                                                defaultValue=""
                                                ref={register({
                                                    required: "Bạn hãy nhập Email "
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
                                        </div>
                                        <div className="forgot-form-submit">
                                            <Button disabled={isLoad} className="forgot-button" variant="outlined" color="inherit" type="submit">
                                                {isLoad ? <CircularProgress size={20} /> : ""} ­ Gửi yêu cầu
                                            </Button>
                                        </div>
                                    </form>
                                    <div className="link-to-login">
                                        <Link to="/login">Đến trang đăng nhập</Link>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="forgot-msg">
                                        Email sẽ hết hạn trong <span>10 phút!</span>
                                        <br />
                                        <br />
                                        Xin kiểm tra mục Thư rác (SPAM) hoặc Quảng cáo nếu bạn không thấy Email gửi đến sau 1 phút.
                                    </div>
                                    <Button
                                        disabled={isLoad}
                                        className="forgot-button"
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => history.push("/login")}
                                    >
                                        Đến trang đăng nhập
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(handleResetPassword)}>
                            <div className="forgot-form-field">
                                <Controller
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu mới"
                                    type="password"
                                    defaultValue=""
                                    control={control}
                                    ref={register({
                                        required: "Bạn hãy nhập mật khẩu ",
                                        minLength: {
                                            value: 6,
                                            message: "Mật khẩu phải có ít nhất 6 kí tự "
                                        },
                                        maxLength: {
                                            value: 14,
                                            message: "Mật khẩu nhiều nhất là 14 kí tự "
                                        }
                                    })}
                                />
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

                                <Controller
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password_repeat"
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    defaultValue=""
                                    control={control}
                                    rules={{validate: value => value === watch("password", "") || "Mật khẩu không khớp "}}
                                />
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
                            <div className="forgot-form-submit">
                                <Button disabled={isLoad} className="forgot-button" variant="outlined" color="inherit" type="submit">
                                    {isLoad ? <CircularProgress size={20} /> : ""} Đặt lại mật khẩu
                                </Button>
                            </div>

                            <div className="link-to-login">
                                <Link to="/login">Đến trang đăng nhập</Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withRouter(ForgotPassword);

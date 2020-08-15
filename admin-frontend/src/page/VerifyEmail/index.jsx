import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, withRouter} from "react-router-dom";

import {CircularProgress, Button} from "@material-ui/core";
import {verifyEmail} from "../../redux/email";

import logo from "../../assets/image/Ikemen_staff.png";
import "./style.css";

const VerifyEmail = props => {
    const {isLoad} = useSelector(state => state.ui);
    const verifyStatus = useSelector(state => state.user.verifyEmail);

    const tokenMail = props.match.params?.token;

    const history = useHistory();
    const dispatch = useDispatch();

    const redirectToLogin = () => {
        history.replace("/login");
    };

    useEffect(() => {
        console.log(verifyStatus)
        if (tokenMail) {
            dispatch(verifyEmail(tokenMail));
        }
    }, []);

    return (
        <div className="verify-email-page">
            <div className="verify-email-logo" onClick={() => redirectToLogin()}>
                <img alt="logo" src={logo} />
            </div>
            <div className="verify-email-wrapper">
                <div>
                    {isLoad ? (
                        <>
                            <div className="verify-email-img">
                                <img src="https://img.icons8.com/cotton/100/000000/-message-exchange.png" />
                            </div>
                            <div className="verify-email-msg">
                                <CircularProgress size={20} /> Đang gửi yêu cầu...
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="verify-email-img">
                                <img
                                    src={
                                        verifyStatus === true
                                            ? "https://img.icons8.com/cotton/100/000000/reading-confirmation.png"
                                            : "https://img.icons8.com/cotton/100/000000/mail-error.png"
                                    }
                                />
                            </div>
                            {verifyStatus === true ? (
                                <>
                                    <div className="verify-email-title">Đã xác thực Email của bạn!</div>
                                    <div>Những cập nhật, thông báo mới nhất sẽ được gửi đến Email của bạn.</div>
                                </>
                            ) : (
                                <>
                                    <div className="verify-email-title verify-email-error">{verifyStatus ?? "Có lỗi khi xác thực Email"}</div>
                                    <div>{!verifyStatus ? "Xin hãy vào lại link trong Email, hoặc liên hệ với hệ thống qua tin nhắn" : ""}</div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="verify-email-to-login">
                    <Button disabled={isLoad} className="forgot-button" variant="outlined" color="inherit" onClick={() => redirectToLogin()}>
                        Đến trang đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(VerifyEmail);

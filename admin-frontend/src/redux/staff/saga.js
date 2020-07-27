import {put, takeLatest} from "redux-saga/effects";
import {EDIT_PROFILE, CHANGE_PASSWORD, FORGOT_PASSWORD_SEND_MAIL, FORGOT_PASSWORD_SEND_PASSWORD, CHECK_EMAIL_EXPIRED} from "./action";
import {editStaffProfileSuccessful, changePasswordSuccessful, sendMailResetSuccessful, sendPasswordResetSuccessful, checkEmailExpiredSuccessful} from ".";
import staffService from "../../service/staffService";

import {NotificationContainer, NotificationManager} from "react-notifications";
import {openLoading, closeLoading} from "../ui";

function* watchEditStaffProfile(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.editStaffProfile(action.token, action.id, action.data);
        if (result && result?.staffUpdated) {
            yield put(editStaffProfileSuccessful());
            NotificationManager.success("Cập nhật thành công", "Thông báo", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchChangePassword(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.changeStaffPassword(action.token, action.id, action.data);
        console.log(result);
        if (result) {
            yield put(changePasswordSuccessful());
            NotificationManager.success("Đổi mật khẩu thành công", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchSendMailReset(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.sendMailReset(action);
        if (result) {
            yield put(sendMailResetSuccessful());
            NotificationManager.success("Gửi yêu cầu thành công, xin hãy kiểm tra Email!", "", 5000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchSendPasswordReset(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.sendPasswordReset(action.token, action.data);
        console.log(result);
        if (result) {
            yield put(sendPasswordResetSuccessful());
            NotificationManager.success("Đặt lại mật khẩu thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}
function* watchCheckEmailExpired(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.checkEmailExpired(action.token);
        console.log(result);
        if (result) {
            yield put(checkEmailExpiredSuccessful(true));
        }
    } catch (error) {
        yield put(checkEmailExpiredSuccessful(false));
        console.log(error?.response?.data?.err)
        // NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
        NotificationManager.error("Email xác nhận đã hết hạn, Xin hãy gửi lại yêu cầu!", "Thông báo", 5000);
    } finally {
        yield put(closeLoading());
    }
}

export function* staffSaga() {
    yield takeLatest(EDIT_PROFILE, watchEditStaffProfile);
    yield takeLatest(CHANGE_PASSWORD, watchChangePassword);
    yield takeLatest(FORGOT_PASSWORD_SEND_MAIL, watchSendMailReset);
    yield takeLatest(FORGOT_PASSWORD_SEND_PASSWORD, watchSendPasswordReset);
    yield takeLatest(CHECK_EMAIL_EXPIRED, watchCheckEmailExpired);
}

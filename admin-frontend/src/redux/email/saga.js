import {put, takeLatest} from "redux-saga/effects";
import {openLoading, closeLoading} from "../ui";
import {NotificationManager} from "react-notifications";

import {VERIFY_EMAIL} from "./action";
import userService from "../../service/userService";
import { verifyEmailSuccessful } from ".";

function* watchVerifyEmail(action) {
    try {
        yield put(openLoading());
        const result = yield userService.verifyEmail(action.tokenEmail);
        if (result) {
            yield put(verifyEmailSuccessful(true));
            NotificationManager.success("Giờ bạn có thể nhận email từ hệ thống", "Xác thực email thành công! ", 4000);
        }
    } catch (error) {
        yield put(verifyEmailSuccessful(error?.response?.data?.err ?? false));
        NotificationManager.error(error?.response?.data?.err, '', 5000)
    } finally {
        yield put(closeLoading());
    }
}

export function* emailSaga() {
    yield takeLatest(VERIFY_EMAIL, watchVerifyEmail);
}

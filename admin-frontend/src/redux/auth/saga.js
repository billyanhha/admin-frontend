import { put, takeLatest, select } from 'redux-saga/effects';
import authService from '../../service/authService'
import { openLoading, closeLoading } from '../ui';
import { USER_LOGIN, USER_LOGOUT } from './action';
import { userLoginSuccessful } from '.';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { clearUserInfo } from '../user';
import { clearIoInstance } from '../notification';

function* watchUserLoginWorker(action) {
    try {
        yield put(openLoading())
        const result = yield authService.login(action.data);
        if (result && result.token) {
            yield put(userLoginSuccessful(result.token));
            NotificationManager.success('Đăng nhập thành công', 'Thông báo');
        }

    } catch (error) {
        NotificationManager.error(error?.response?.data?.err || error?.response?.data?.message, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading())
        // message.d
    }
}


function* watchUserLogoutWorker(action) {
    try {
        yield put(openLoading())
        const { io } = yield select(state => state.notify)
        if(io){
            io.emit("logout", "");
        }
        yield put(clearUserInfo());
        yield put(clearIoInstance());

    } catch (error) {
        NotificationManager.error(error?.response?.data?.err || error?.response?.data?.message, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading())
        // message.d
    }
}

export function* authSaga() {
    yield takeLatest(USER_LOGIN, watchUserLoginWorker);
    yield takeLatest(USER_LOGOUT, watchUserLogoutWorker);
}
import { put, takeLatest, select, all, takeEvery } from 'redux-saga/effects';
import userService from "../../service/userService";
import {
    GET_USER, GET_STAFF, REGISTER_STAFF, EDIT_STAFF, CHANGE_STAFF_STATUS,
} from './action';
import {
    getUserSuccessful, saveStaff, getStaff
} from '.'
import { userLogout } from '../auth';
import { openLoading, closeLoading } from '../ui';
import _ from "lodash"
import { NotificationManager } from 'react-notifications';

function* wachGetUserbWorker(action) {
    try {
        yield put(openLoading())
        if (action.token) {
            const result = yield userService.getuserByJwt(action.token);
            if (result && result.data) {
                yield put(getUserSuccessful(result.data));
            }
        }
    } catch (error) {
        if (error?.response?.data?.err?.toString().includes('Phiên đăng nhập đã hết hạn')) {
            yield put(userLogout());
            NotificationManager.error('Phiên đã hết hạn , vui lòng đăng nhập lại', 'Thông báo')
        }
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}

function* wachGetStaffbWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield userService.getStaff(action.data, token);
        if(!_.isEmpty(result?.staff)){
            yield put(saveStaff(result?.staff));

        } else {
            yield put(saveStaff([]));

        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}

function* wachRegisterStaffbWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield userService.registerStaff(action.data, token);
        if(!_.isEmpty(result?.token)) {
            NotificationManager.success('Tạo mới thành công', 'Thông báo')
            let data = { role: 'coordinator', itemsPage: 10, page: 1 };
            yield put(getStaff(data))
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}


function* wachEditStaffbWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield userService.editStaff(action.data, token);        
        if(!_.isEmpty(result?.staffUpdated)) {
            NotificationManager.success('Sửa  thành công', 'Thông báo')
            let data = { role: 'coordinator', itemsPage: 10, page: 1 };
            yield put(getStaff(data))
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}

function* wachChangeStaffStatusWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield userService.changeStaffStatus(action.data, token);                
        if(!_.isEmpty(result?.staffUpdated)) {
            NotificationManager.success('Sửa  thành công', 'Thông báo')
            let data = { role: 'coordinator', itemsPage: 10, page: 1 };
            yield put(getStaff(data))
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}


export function* userSaga() {
    yield takeLatest(GET_USER, wachGetUserbWorker);
    yield takeLatest(GET_STAFF, wachGetStaffbWorker);
    yield takeLatest(REGISTER_STAFF, wachRegisterStaffbWorker);
    yield takeLatest(EDIT_STAFF, wachEditStaffbWorker);
    yield takeLatest(CHANGE_STAFF_STATUS, wachChangeStaffStatusWorker);
}
import { put, takeLatest, select, all, takeEvery } from 'redux-saga/effects';
import userService from "../../service/userService";
import {
    GET_USER,
} from './action';
import {
    getUserSuccessful
} from '.'
import { userLogout } from '../auth';
import { openLoading, closeLoading } from '../ui';
import _ from "lodash"
import { NotificationManager} from 'react-notifications';

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
        if (error.toString().includes('status code 401')) {
            yield put(userLogout());
            NotificationManager.error('Phiên đã hết hạn , vui lòng đăng nhập lại', 3)
        }
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}


export function* userSaga() {
    yield takeLatest(GET_USER, wachGetUserbWorker);

}
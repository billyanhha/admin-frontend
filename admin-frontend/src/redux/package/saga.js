import { put, takeLatest, select } from 'redux-saga/effects';
import { openLoading, closeLoading } from '../ui';
import { GET_PACKAGE } from './action';
import packageService from '../../service/packageService'

import _ from 'lodash'
import { NotificationManager } from 'react-notifications';
import { savePackage } from '.';


function* watchGetPackageWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield packageService.getDoctorPackage(action.data, token);
        yield put(savePackage(result?.packages))
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading())
    }
}

export function* packageSaga() {
    yield takeLatest(GET_PACKAGE, watchGetPackageWorker);
}
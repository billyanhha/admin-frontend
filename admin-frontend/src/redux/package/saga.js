import { put, takeLatest, select } from 'redux-saga/effects';
import { openLoading, closeLoading } from '../ui';
import { GET_PACKAGE, GET_PACKAGE_INFO, GET_ALL_APPOINTMENT, GET_PACKAGE_STATUS, CHANGE_PACKAGE_STATUS, UPDATE_APPOINTMENT_PACKAGE } from './action';
import packageService from '../../service/packageService'

import _ from 'lodash'
import { NotificationManager } from 'react-notifications';
import { savePackage, getPackageInfoSuccessful, getAllAppointmentByPackageSuccessful, getPackageStatusSuccessful, getPackageStatus, getAllAppointmentByPackage } from '.';


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

function* watchgetPackageInfoQuery(action) {
    try {
        yield put(openLoading());
        const { token } = yield select(state => state.auth)
        const result = yield packageService.getPackageInfo(action?.id, token);
        if (!_.isEmpty(result?.package)) {
            yield put(getPackageInfoSuccessful(result?.package?.[0]));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}


function* watchGetAllAppointmentByPackageId(action) {
    try {
        yield put(openLoading());
        const { token } = yield select(state => state.auth)
        const result = yield packageService.getAllAppointmentByPackageID(action?.packageId, token);
        yield put(getAllAppointmentByPackageSuccessful(result?.appointments));
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}

function* watchgetPackageStatussWorker(action) {
    try {
        yield put(openLoading());
        const { token } = yield select(state => state.auth)
        const result = yield packageService.getPackageStatus(action?.id, token);
        yield put(getPackageStatusSuccessful(result?.status));
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}

function* watchChangePackageStatusWorker(action) {
    try {
        yield put(openLoading());
        const { token } = yield select(state => state.auth)
        const result = yield packageService.changePackageStatus(action?.data, token);
        NotificationManager.success("Thay đổi trạng thái thành công", 'Thông báo');
        if (!_.isEmpty(result)) {
            yield put(getPackageStatus(action?.data?.packageId))
            yield put(getAllAppointmentByPackage(action?.data?.packageId))
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}



function* watchUpdateAppointmentPackageWorker(action) {
    try {
        yield put(openLoading());
        
        const { token } = yield select(state => state.auth)

        const result = yield packageService.updateAppointmentPackage(
            action?.data,
            token
        );
        if (!_.isEmpty(result)) {
            yield put(getAllAppointmentByPackage(action?.data?.packageId))
            NotificationManager.success("Thay đổi trạng thái thành công", 'Thông báo');
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}



export function* packageSaga() {
    yield takeLatest(GET_PACKAGE, watchGetPackageWorker);
    yield takeLatest(GET_PACKAGE_INFO, watchgetPackageInfoQuery);
    yield takeLatest(GET_ALL_APPOINTMENT, watchGetAllAppointmentByPackageId);
    yield takeLatest(GET_PACKAGE_STATUS, watchgetPackageStatussWorker);
    yield takeLatest(CHANGE_PACKAGE_STATUS, watchChangePackageStatusWorker);
    yield takeLatest(UPDATE_APPOINTMENT_PACKAGE, watchUpdateAppointmentPackageWorker);
}
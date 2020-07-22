import { put, takeLatest, select } from 'redux-saga/effects';
import { GET_FORM, EDIT_FORM } from './action';
import { openLoading, closeLoading } from '../ui';
import _ from 'lodash'
import formService from "../../service/formService"
import { getPackageResultFormSuccessful, getAppointmentResultFormSuccessful, getForm } from '.';
import { NotificationManager } from 'react-notifications';

function* watchGetFormWorker(action) {
    try {

        yield put(openLoading());
        const { token } = yield select(state => state.auth)
        const result = yield formService.getForm(action.name, token);

        if (!_.isEmpty(result?.forms)) {

            switch (action.name) {
                case 'package_result_form': {
                    yield put(getPackageResultFormSuccessful(result?.forms[0]));
                    break;
                }
                case 'appointment_result_form': {
                    yield put(getAppointmentResultFormSuccessful(result?.forms[0]));
                    break;
                }
                default:
                    break;
            }
        }

    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", 'Thông báo');
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}

function* watchEditFormWorker(action) {
    try {

        yield put(openLoading());
        const { token } = yield select(state => state.auth)
        const result = yield formService.editForm(action.data, token);
        console.log(result);
        if (!_.isEmpty(result)) {
            NotificationManager.success("Sửa thành công", 'Thông báo');
            yield put(getForm(action.data?.name));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", 'Thông báo');
        console.log(error);
    } finally {
        yield put(closeLoading());
    }
}


export function* formSaga() {
    yield takeLatest(GET_FORM, watchGetFormWorker);
    yield takeLatest(EDIT_FORM, watchEditFormWorker);

}
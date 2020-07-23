import { put, takeLatest } from 'redux-saga/effects';
import { GET_TOP_DOCTOR } from './action';
import { getTopDoctorSuccessful } from '.';
import statisticService from '../../service/statisticService';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import { openLoading, closeLoading } from '../ui';

function* watchGetTopDoctor(action) {
    try {
        yield put(openLoading())
        const result = yield statisticService.getTopDoctor(action);
        if (result.result) {
            yield put(getTopDoctorSuccessful(result.result));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", 'Thông báo');
    } finally {
        yield put(closeLoading())
    }
}

export function* statisticSaga() {
    yield takeLatest(GET_TOP_DOCTOR, watchGetTopDoctor);
}
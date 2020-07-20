import { put, takeLatest, select } from 'redux-saga/effects';
import { GET_CUSTOMER, CHANGE_CUSTOMER_STATUS } from './action';
import customerService from '../../service/customerService';
import { saveCustomer, getCustomer } from '.';
import {NotificationManager} from 'react-notifications';
import { openLoading, closeLoading } from '../ui';
import _ from "lodash";

function* watchGetCustomerWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield customerService.getCustomer(action.data, token);
        if(!_.isEmpty(result?.customers)){
            yield put(saveCustomer(result?.customers));

        } else {
            yield put(saveCustomer([]));

        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}


function* watchChangeCustomerStatusWorker(action) {
    try {
        yield put(openLoading())
        const { token } = yield select(state => state.auth)
        const result = yield customerService.changeCustomerStatus(action.data, token);
        if(!_.isEmpty(result)){
            yield put(getCustomer(action?.data?.query))
            NotificationManager.success('Thay đổi thành công', 'Thông báo')
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, 'Thông báo')
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading())
    }
}

export function* customerSaga() {
    yield takeLatest(GET_CUSTOMER, watchGetCustomerWorker);
    yield takeLatest(CHANGE_CUSTOMER_STATUS, watchChangeCustomerStatusWorker);
}
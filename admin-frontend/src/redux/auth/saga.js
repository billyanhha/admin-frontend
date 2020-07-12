import { put, takeLatest} from 'redux-saga/effects';
import authService from '../../service/authService'
import { openLoading, closeLoading } from '../ui';
import { message } from 'antd';



function* watchDoctorLoginWorker(action) {

}


export function* authSaga() {
    // yield takeLatest(DOCTOR_LOGIN, watchDoctorLoginWorker);
}
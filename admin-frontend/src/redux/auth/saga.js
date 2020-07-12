import { put, takeLatest} from 'redux-saga/effects';
import authService from '../../service/authService'
import { openLoading, closeLoading } from '../ui';



function* watchDoctorLoginWorker(action) {

}


export function* authSaga() {
    // yield takeLatest(DOCTOR_LOGIN, watchDoctorLoginWorker);
}
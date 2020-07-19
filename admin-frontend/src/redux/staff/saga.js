import { put, takeLatest } from 'redux-saga/effects';
import { EDIT_PROFILE, CHANGE_PASSWORD } from './action';
import { editStaffProfileSuccessful, changePasswordSuccessful } from '.';
import staffService from '../../service/staffService';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import { openLoading, closeLoading } from '../ui';

function* watchEditStaffProfile(action) {
    try {
        yield put(openLoading())
        const result = yield staffService.editStaffProfile(action.token, action.id, action.data);
        if (result && result?.staffUpdated) {
            yield put(editStaffProfileSuccessful());
            NotificationManager.success('Cập nhật thành công', 'Thông báo', 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", 'Thông báo');
    } finally {
        yield put(closeLoading())
    }
}

function* watchChangePassword(action) {
    try {
        yield put(openLoading())
        const result = yield staffService.changeStaffPassword(action.token, action.id, action.data);
        console.log(result)
        if (result) {
            yield put(changePasswordSuccessful());
            NotificationManager.success('Đổi mật khẩu thành công', '', 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", 'Thông báo');
    } finally {
        yield put(closeLoading())
    }
}

export function* staffSaga() {
    yield takeLatest(EDIT_PROFILE, watchEditStaffProfile);
    yield takeLatest(CHANGE_PASSWORD, watchChangePassword);
}
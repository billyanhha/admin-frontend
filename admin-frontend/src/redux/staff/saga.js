import {put, takeLatest, select} from "redux-saga/effects";
import _ from "lodash";

import {
    EDIT_PROFILE,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD_SEND_MAIL,
    FORGOT_PASSWORD_SEND_PASSWORD,
    CHECK_EMAIL_EXPIRED,
    GET_DOCTOR,
    CREATE_DOCTOR,
    UPDATE_DOCTOR,
    GET_DOCTOR_EXPERIENCE,
    GET_DOCTOR_LANGUAGE,
    GET_ALL_LANGUAGE,
    UPDATE_DOCTOR_LANGUAGE,
    UPDATE_DOCTOR_EXPERIENCE,
    CHANGE_DOCTOR_STATUS,
    CREATE_LANGUAGE,
    UPDATE_LANGUAGE,
    DELETE_LANGUAGE,
    GET_ALL_DEGREE,
    DELETE_DEGREE,
    UPDATE_DEGREE,
    CREATE_DEGREE,
    GET_DOCTOR_DEGREE,
    UPDATE_DOCTOR_DEGREE
} from "./action";

import {
    editStaffProfileSuccessful,
    changePasswordSuccessful,
    sendMailResetSuccessful,
    sendPasswordResetSuccessful,
    checkEmailExpiredSuccessful,
    getAllDoctorSuccessful,
    createDoctorSuccessful,
    updateDoctorSuccessful,
    getDoctorExperienceSuccessful,
    getDoctorLanguageSuccessful,
    getAllLanguageSuccessful,
    updateDoctorLanguageSuccessful,
    updateDoctorExperienceSuccessful,
    createLanguageSuccessful,
    updateLanguageSuccessful,
    deleteLanguageSuccessful,
    getAllLanguage,
    getAllDegreeSuccessful,
    getAllDegree,
    createDegreeSuccessful,
    updateDegreeSuccessful,
    updateDoctorDegreeSuccessful,
    getDoctorDegreeSuccessful
} from ".";

import staffService from "../../service/staffService";

import {NotificationManager} from "react-notifications";
import {openLoading, closeLoading} from "../ui";

function* watchEditStaffProfile(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.editStaffProfile(action.token, action.id, action.data);
        if (result && result?.staffUpdated) {
            yield put(editStaffProfileSuccessful());
            NotificationManager.success("Cập nhật thành công", "Thông báo", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchChangePassword(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.changeStaffPassword(action.token, action.id, action.data);
        console.log(result);
        if (result) {
            yield put(changePasswordSuccessful());
            NotificationManager.success("Đổi mật khẩu thành công", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchSendMailReset(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.sendMailReset(action);
        if (result) {
            yield put(sendMailResetSuccessful());
            NotificationManager.success("Gửi yêu cầu thành công, xin hãy kiểm tra Email!", "", 5000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchSendPasswordReset(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.sendPasswordReset(action.token, action.data);
        if (result) {
            yield put(sendPasswordResetSuccessful());
            NotificationManager.success("Đặt lại mật khẩu thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchCheckEmailExpired(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.checkEmailExpired(action.token);
        if (result) {
            yield put(checkEmailExpiredSuccessful(true));
        }
    } catch (error) {
        yield put(checkEmailExpiredSuccessful(false));
        NotificationManager.error("Email xác nhận đã hết hạn, Xin hãy gửi lại yêu cầu!", "Thông báo", 5000);
    } finally {
        yield put(closeLoading());
    }
}

function* watchGetAllDoctor(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.getAllDoctor(action.data);
        if (result && result?.doctors?.result) {
            yield put(getAllDoctorSuccessful(result.doctors.result));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchCreateDoctor(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.createDoctor(token, action.data);
        if (result?.doctorCreated?.doctor) {
            yield put(createDoctorSuccessful(true));
            NotificationManager.success("Thêm bác sĩ thành công!", "", 3000);
        } else {
            NotificationManager.error(result ?? "Hệ thống quá tải", "Thông báo");
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchUpdateDoctor(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateDoctor(token, action.id, action.data);
        if (result?.doctorUpdated) {
            yield put(updateDoctorSuccessful(true));
            NotificationManager.success("Cập nhật thông tin thành công!", "", 5000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchGetDoctorExperience(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.getDoctorExperience(action.id);
        if (result?.doctorExperience) {
            yield put(getDoctorExperienceSuccessful(result?.doctorExperience));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchUpdateDoctorExperience(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateDoctorExperience(token, action.id, action.data);
        if (result?.expsCreated) {
            yield put(updateDoctorExperienceSuccessful(true));
            NotificationManager.success("Thành công cập nhật kinh nghiệm!", "", 4000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchGetDoctorLanguage(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.getDoctorLanguage(action.id);
        if (result?.doctorLanguage) {
            yield put(getDoctorLanguageSuccessful(result?.doctorLanguage));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchUpdateDoctorLanguage(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateDoctorLanguage(token, action.id, action.data);
        if (!_.isEmpty(result?.doctorLanguageCreated)) {
            yield put(updateDoctorLanguageSuccessful(true));
            NotificationManager.success("Thành công cập nhật kĩ năng ngôn ngữ!", "", 4000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchGetDoctorDegree(action) {
    try {
        yield put(openLoading());
        const result = yield staffService.getDoctorDegree(action.id);
        if (result?.doctorDegrees) {
            yield put(getDoctorDegreeSuccessful(result?.doctorDegrees));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchUpdateDoctorDegree(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateDoctorDegree(token, action.id, action.data);
        console.log(result)
        if (!_.isEmpty(result?.doctorDegreeCreated)) {
            yield put(updateDoctorDegreeSuccessful(true));
            NotificationManager.success("Thành công cập nhật bằng cấp cho bác sĩ!", "", 4000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchChangeDoctorStatus(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateDoctor(token, action.data);
        if (result?.doctorUpdated) {
            yield put(updateDoctorSuccessful(true));
            NotificationManager.success("Cập nhật thông tin thành công!", "", 5000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err, "Thông báo");
        console.log(error);
    } finally {
        // do long running stuff
        yield put(closeLoading());
    }
}

function* watchGetAllLanguage(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.getAllLanguage(token);
        if (!_.isEmpty(result?.languages)) {
            yield put(getAllLanguageSuccessful(result.languages));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchCreateLanguage(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.createLanguage(token, action.data);
        if (result?.languageCreated) {
            yield put(createLanguageSuccessful(true));
            yield put(getAllLanguage());
            NotificationManager.success("Thêm ngôn ngữ thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}
function* watchUpdateLanguage(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateLanguage(token, action.lang_id, action.data);
        if (!_.isEmpty(result?.languageUpdated)) {
            yield put(updateLanguageSuccessful(true));
            yield put(getAllLanguage());
            NotificationManager.success("Sửa ngôn ngữ thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchDeleteLanguage(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.removeLanguage(token, action.lang_id);
        if (!_.isEmpty(result?.languageDeleted)) {
            yield put(getAllLanguage());
            NotificationManager.success("Xoá ngôn ngữ thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchGetAllDegree(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.getAllDegree(token);
        if (!_.isEmpty(result?.degrees)) {
            yield put(getAllDegreeSuccessful(result.degrees));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchCreateDegree(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.createDegree(token, action.data);
        if (result?.degreeCreated) {
            yield put(createDegreeSuccessful(true));
            yield put(getAllDegree());
            NotificationManager.success("Thêm bằng cấp thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}
function* watchUpdateDegree(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.updateDegree(token, action.degree_id, action.data);
        if (!_.isEmpty(result?.degreeUpdated)) {
            yield put(updateDegreeSuccessful(true));
            yield put(getAllDegree());
            NotificationManager.success("Sửa thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchDeleteDegree(action) {
    try {
        yield put(openLoading());
        const {token} = yield select(state => state.auth);
        const result = yield staffService.removeDegree(token, action.degree_id);
        if (!_.isEmpty(result?.degreeDeleted)) {
            yield put(getAllDegree());
            NotificationManager.success("Xoá thành công!", "", 3000);
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

export function* staffSaga() {
    yield takeLatest(EDIT_PROFILE, watchEditStaffProfile);
    yield takeLatest(CHANGE_PASSWORD, watchChangePassword);
    yield takeLatest(FORGOT_PASSWORD_SEND_MAIL, watchSendMailReset);
    yield takeLatest(FORGOT_PASSWORD_SEND_PASSWORD, watchSendPasswordReset);
    yield takeLatest(CHECK_EMAIL_EXPIRED, watchCheckEmailExpired);
    yield takeLatest(GET_DOCTOR, watchGetAllDoctor);
    yield takeLatest(CREATE_DOCTOR, watchCreateDoctor);
    yield takeLatest(UPDATE_DOCTOR, watchUpdateDoctor);
    yield takeLatest(GET_DOCTOR_EXPERIENCE, watchGetDoctorExperience);
    yield takeLatest(UPDATE_DOCTOR_EXPERIENCE, watchUpdateDoctorExperience);
    yield takeLatest(GET_DOCTOR_LANGUAGE, watchGetDoctorLanguage);
    yield takeLatest(UPDATE_DOCTOR_LANGUAGE, watchUpdateDoctorLanguage);
    yield takeLatest(GET_DOCTOR_DEGREE, watchGetDoctorDegree);
    yield takeLatest(UPDATE_DOCTOR_DEGREE, watchUpdateDoctorDegree);
    yield takeLatest(GET_ALL_LANGUAGE, watchGetAllLanguage);
    yield takeLatest(CREATE_LANGUAGE, watchCreateLanguage);
    yield takeLatest(UPDATE_LANGUAGE, watchUpdateLanguage);
    yield takeLatest(DELETE_LANGUAGE, watchDeleteLanguage);
    yield takeLatest(GET_ALL_DEGREE, watchGetAllDegree);
    yield takeLatest(CREATE_DEGREE, watchCreateDegree);
    yield takeLatest(UPDATE_DEGREE, watchUpdateDegree);
    yield takeLatest(DELETE_DEGREE, watchDeleteDegree);
    yield takeLatest(CHANGE_DOCTOR_STATUS, watchChangeDoctorStatus);
}

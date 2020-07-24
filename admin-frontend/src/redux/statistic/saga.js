import {put, takeLatest} from "redux-saga/effects";
import {GET_TOP_DOCTOR, GET_STATISTIC_DATA_APMPKG} from "./action";
import {getTopDoctorSuccessful, getStatisticDataApmPkgSuccessful} from ".";
import statisticService from "../../service/statisticService";

import {NotificationContainer, NotificationManager} from "react-notifications";
import {openLoading, closeLoading} from "../ui";

function* watchGetTopDoctor(action) {
    try {
        yield put(openLoading());
        const result = yield statisticService.getTopDoctor(action);
        if (result.result) {
            yield put(getTopDoctorSuccessful(result.result));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

function* watchGetStatisticDataApmPkg(action) {
    try {
        yield put(openLoading());
        const result = yield statisticService.getStatisticDataApmPkg(action);
        console.log(result);
        if (result.result) {
            yield put(getStatisticDataApmPkgSuccessful(result.result));
        }
    } catch (error) {
        NotificationManager.error(error?.response?.data?.err ?? "Hệ thống quá tải", "Thông báo");
    } finally {
        yield put(closeLoading());
    }
}

export function* statisticSaga() {
    yield takeLatest(GET_TOP_DOCTOR, watchGetTopDoctor);
    yield takeLatest(GET_STATISTIC_DATA_APMPKG, watchGetStatisticDataApmPkg);
}

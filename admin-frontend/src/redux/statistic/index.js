import {GET_TOP_DOCTOR, GET_TOP_DOCTOR_SUCCESSFUL, GET_STATISTIC_DATA_APMPKG, GET_STATISTIC_DATA_APMPKG_SUCCESSFUL} from "./action";

export const getTopDoctor = (top, month, statusID, typeStatistic) => {
    return {
        type: GET_TOP_DOCTOR,
        top,
        month,
        statusID,
        typeStatistic
    };
};

export const getTopDoctorSuccessful = result => {
    return {
        type: GET_TOP_DOCTOR_SUCCESSFUL,
        result
    };
};

export const getStatisticDataApmPkg = (month, typeStatistic) => {
    return {
        type: GET_STATISTIC_DATA_APMPKG,
        month,
        typeStatistic
    };
};

export const getStatisticDataApmPkgSuccessful = result => {
    return {
        type: GET_STATISTIC_DATA_APMPKG_SUCCESSFUL,
        result
    };
};

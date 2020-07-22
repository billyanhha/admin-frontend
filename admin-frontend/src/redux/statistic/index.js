import { GET_TOP_DOCTOR, GET_TOP_DOCTOR_SUCCESSFUL } from "./action";

export const getTopDoctor = (top, month, statusID) => {
    return {
        type: GET_TOP_DOCTOR,
        top,
        month,
        statusID
    };
};

export const getTopDoctorSuccessful = (result) => {
    return {
        type: GET_TOP_DOCTOR_SUCCESSFUL,
        result
    };
};

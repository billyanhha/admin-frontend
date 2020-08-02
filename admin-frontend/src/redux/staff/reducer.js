import {
    EDIT_PROFILE_SUCCESSFUL,
    SET_STATUS,
    CHANGE_PASSWORD_SUCCESSFUL,
    FORGOT_PASSWORD_SEND_MAIL_SUCCESSFUL,
    FORGOT_PASSWORD_SEND_PASSWORD_SUCCESSFUL,
    CHECK_EMAIL_EXPIRED_SUCCESSFUL,
    GET_DOCTOR_SUCCESSFUL,
    CREATE_DOCTOR_SUCCESSFUL,
    UPDATE_DOCTOR_SUCCESSFUL
} from "./action";

import _ from "lodash";

const initialState = {
    updateStatus: false,
    sendMailStatus: false,
    resetPassStatus: false,
    expiredStatus: null
};

const doctorState = {
    doctors: null,
    status: false,
    updateStatus: false,
};

export const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_SUCCESSFUL: {
            let newState = {...state, updateStatus: true};
            return newState;
        }
        case CHANGE_PASSWORD_SUCCESSFUL: {
            let newState = {...state, updateStatus: true};
            return newState;
        }
        case SET_STATUS: {
            let newState = {...state, updateStatus: action?.status};
            return newState;
        }
        case FORGOT_PASSWORD_SEND_MAIL_SUCCESSFUL: {
            let newState = {...state, sendMailStatus: true};
            return newState;
        }
        case FORGOT_PASSWORD_SEND_PASSWORD_SUCCESSFUL: {
            let newState = {...state, resetPassStatus: true};
            return newState;
        }
        case CHECK_EMAIL_EXPIRED_SUCCESSFUL: {
            let newState = {...state, expiredStatus: action?.result};
            return newState;
        }
        default: {
            return state;
        }
    }
};

export const doctorReducer = (state = doctorState, action) => {
    switch (action.type) {
        case GET_DOCTOR_SUCCESSFUL: {
            state = {...state, doctors: action?.result};
            return state;
        }
        case CREATE_DOCTOR_SUCCESSFUL: {
            state = {...state, status: action?.result};
            return state;
        }
        case UPDATE_DOCTOR_SUCCESSFUL: {
            state = {...state, updateStatus: action?.result};
            return state;
        }
        default:
            return state;
    }
};

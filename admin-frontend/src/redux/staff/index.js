import { EDIT_PROFILE, EDIT_PROFILE_SUCCESSFUL, SET_STATUS, CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESSFUL } from "./action"

export const editStaffProfile = (token, id, data) => {
    return {
        type: EDIT_PROFILE,
        token,
        id,
        data
    }
}

export const editStaffProfileSuccessful = (result) => {
    return {
        type: EDIT_PROFILE_SUCCESSFUL,
        result
    }
}

export const changePassword = (token, id, data) => {
    return {
        type: CHANGE_PASSWORD,
        token,
        id,
        data
    }
}

export const changePasswordSuccessful = (result) => {
    return {
        type: CHANGE_PASSWORD_SUCCESSFUL,
        result
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}
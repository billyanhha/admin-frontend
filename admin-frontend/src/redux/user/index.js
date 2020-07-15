import {
    GET_USER_SUCCESSFUL, GET_USER, CLEAR_USER_INFO, GET_STAFF, SAVE_STAFF, REGISTER_STAFF, EDIT_STAFF, CHANGE_STAFF_STATUS,

} from "./action"

export const getUser = (token) => {
    return {
        type: GET_USER,
        token
    }
}

export const clearUserInfo = () => {
    return {
        type: CLEAR_USER_INFO,
    }
}

export const getUserSuccessful = (currentUser) => {
    return {
        type: GET_USER_SUCCESSFUL,
        currentUser: currentUser
    }
}

export const getStaff = (data) => {
    return {
        type: GET_STAFF,
        data
    }
}


export const saveStaff = (data) => {
    return {
        type: SAVE_STAFF,
        data
    }
}

export const registerStaff = (data) => {
    return {
        type: REGISTER_STAFF,
        data
    }
}

export const editStaff = (data) => {
    return {
        type: EDIT_STAFF,
        data
    }
}

export const changeStaffStatus = (data) => {
    return {
        type: CHANGE_STAFF_STATUS,
        data
    }
}



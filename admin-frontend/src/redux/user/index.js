import {
    GET_USER_SUCCESSFUL, GET_USER, CLEAR_USER_INFO,

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

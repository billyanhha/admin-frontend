import { USER_LOGIN, USER_LOGOUT, USER_LOGIN_SUCCESSFUL  } from "./action"


export const userLogin = (data) => {
    return {
        type: USER_LOGIN,
        data: data,
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}

export const userLoginSuccessful = (token) => {
    return {
        type: USER_LOGIN_SUCCESSFUL,
        token
    }
}
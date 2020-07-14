import {
    SAVE_PACKAGE,
    GET_PACKAGE,
    GET_PACKAGE_INFO,
    GET_PACKAGE_INFO_SUCCESSFUL,
    GET_ALL_APPOINTMENT,
    GET_ALL_APPOINTMENT_SUCCESSFUL,
    GET_PACKAGE_STATUS,
    GET_PACKAGE_STATUS_SUCCESSFUL,
    CHANGE_PACKAGE_STATUS,
    UPDATE_APPOINTMENT_PACKAGE,
} from "./action";


export const getPackage = (data) => {
    return {
        type: GET_PACKAGE,
        data
    }
}

export const savePackage = (packages) => {
    return {
        type: SAVE_PACKAGE,
        packages
    }
}

export const getPackageInfo = (id) => {
    return {
        type: GET_PACKAGE_INFO,
        id
    }
}

export const getPackageInfoSuccessful = (packageInfo) => {
    return {
        type: GET_PACKAGE_INFO_SUCCESSFUL,
        packageInfo
    }
}

export const getAllAppointmentByPackage = (packageId) => {
    return {
        type: GET_ALL_APPOINTMENT,
        packageId
    }
}

export const getAllAppointmentByPackageSuccessful = (appointments) => {
    return {
        type: GET_ALL_APPOINTMENT_SUCCESSFUL,
        appointments
    }
}

export const getPackageStatus = (id) => {
    return {
        type: GET_PACKAGE_STATUS,
        id
    }
}

export const getPackageStatusSuccessful = (status) => {
    return {
        type: GET_PACKAGE_STATUS_SUCCESSFUL,
        status
    }
}

export const changePackageStatus = (data) => {
    return {
        type: CHANGE_PACKAGE_STATUS,
        data
    }
}

export const updateAppointmentPackage = (data) => {
    return {
        type: UPDATE_APPOINTMENT_PACKAGE,
        data,
    }
}
















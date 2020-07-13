import {
    SAVE_PACKAGE,
    GET_PACKAGE,
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














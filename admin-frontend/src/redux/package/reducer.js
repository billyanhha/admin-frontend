import {
    SAVE_PACKAGE, GET_PACKAGE_INFO_SUCCESSFUL, GET_ALL_APPOINTMENT_SUCCESSFUL, GET_PACKAGE_STATUS_SUCCESSFUL
} from "./action";
import _ from "lodash"


const initialState = {
    packages: [],
    packageInfo: {},
    packageData: {services: [] , appointments: [], status: []}
}

export const packageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PACKAGE:
            {
                let newState = { ...state, packages: action?.packages }
                return newState;
            }
        case GET_PACKAGE_INFO_SUCCESSFUL: {
            state = { ...state, packageInfo: action?.packageInfo }
            return state;
        }
        case GET_ALL_APPOINTMENT_SUCCESSFUL: {
            const newPackageData= {...state.packageData, appointments:action?.appointments }
            state = { ...state, packageData: newPackageData }
            return state;
        } 
        case GET_PACKAGE_STATUS_SUCCESSFUL: {
            let {packageData} = state;
            packageData.status = action.status
            state = { ...state, packageData:  packageData}
            return state;
        }
        default:
            return state;
    }
}

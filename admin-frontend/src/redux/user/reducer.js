import {
    GET_USER_SUCCESSFUL, CLEAR_USER_INFO, SAVE_STAFF,
} from "./action";

const initialState = {
    currentUser: {},
}

const userStaffState = {
    staffs: []
}

export const userStaffReducer = (state = userStaffState, action) => {
    switch (action.type) {
        case SAVE_STAFF: {
            state = { ...state, staffs: action.data }
            return state;
        }
        default:
            return state;
    }
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESSFUL:
            state = { ...state, currentUser: action.currentUser }
            return state;
        case CLEAR_USER_INFO:
            return initialState;
        default:
            return state;
    }
}
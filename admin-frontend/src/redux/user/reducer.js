import {
    GET_USER_SUCCESSFUL, CLEAR_USER_INFO,
} from "./action";

const initialState = {
    currentUser: {},
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
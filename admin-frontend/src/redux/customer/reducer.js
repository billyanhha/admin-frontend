import { SAVE_CUSTOMER } from "./action";

const initialState = {
    customers: []
}

export const customerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_CUSTOMER : {
            state = {...state , customers: action.customers};
            return state
        }
        default:  {
            return state;
        }
    }
}

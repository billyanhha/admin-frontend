import { SAVE_CUSTOMER, SAVE_CUSTOMER_PATIENT } from "./action";

const initialState = {
    customers: [],
    patients: []
}

export const customerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_CUSTOMER : {
            state = {...state , customers: action.customers};
            return state
        }
        case SAVE_CUSTOMER_PATIENT : {
            state = {...state , patients: action.patients};
            return state
        }
        default:  {
            return state;
        }
    }
}

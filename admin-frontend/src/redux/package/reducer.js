import {
    SAVE_PACKAGE
} from "./action";
import _ from "lodash"


const initialState = {
    packages: []
}

export const packageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PACKAGE:
            {
                let newState = { ...state, packages: action?.packages }
                return newState;
            }    
        default:
            return state;
    }
}

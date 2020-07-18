import { SET_CURRENT_SERVICE_PAGE, SAVE_SERVICE, SAVE_SERVICE_CATEGORY } from "./action";



const initialState = {
    currentServicePage: '2',
    services: [],
    categorires: []
}

export const serviceReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_SERVICE_PAGE : {
            state = {...state , currentServicePage: action.index};
            return state
        }
        case SAVE_SERVICE : {
            state = {...state , services: action.services};
            return state
        }
        case SAVE_SERVICE_CATEGORY : {
            state = {...state , categorires: action.categorires};
            return state
        }
        default:  {
            return state;
        }
    }
}

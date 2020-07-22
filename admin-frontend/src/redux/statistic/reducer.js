import { GET_TOP_DOCTOR_SUCCESSFUL } from "./action";

import _ from "lodash"

const initialState = {
   topDoctor: null
}

export const statisticReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_TOP_DOCTOR_SUCCESSFUL: {
         let newState = { ...state, topDoctor: action?.result }
         return newState;
      }
      default: {
         return state;
      }
   }
}

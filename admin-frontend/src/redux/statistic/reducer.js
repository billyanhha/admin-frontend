import { GET_TOP_DOCTOR_SUCCESSFUL, GET_STATISTIC_DATA_APMPKG_SUCCESSFUL } from "./action";

import _ from "lodash"

const initialState = {
   topDoctor: null,
   dataGraph: null
}

export const statisticReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_TOP_DOCTOR_SUCCESSFUL: {
         let newState = { ...state, topDoctor: action?.result }
         return newState;
      }
      case GET_STATISTIC_DATA_APMPKG_SUCCESSFUL: {
         let newState = { ...state, dataGraph: action?.result }
         return newState;
      }
      default: {
         return state;
      }
   }
}

import { EDIT_PROFILE_SUCCESSFUL, SET_STATUS, CHANGE_PASSWORD_SUCCESSFUL } from "./action";

import _ from "lodash"

const initialState = {
   updateStatus: false
}

export const staffReducer = (state = initialState, action) => {
   switch (action.type) {
      case EDIT_PROFILE_SUCCESSFUL: {
         let newState = { ...state, updateStatus: true }
         return newState;
      }
      case CHANGE_PASSWORD_SUCCESSFUL: {
         let newState = { ...state, updateStatus: true }
         return newState;
      }
      case SET_STATUS: {
         let newState = { ...state, updateStatus: action?.status }
         return newState;
      }
      default: {
         return state;
      }
   }
}

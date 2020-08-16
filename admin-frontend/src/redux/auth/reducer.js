
import _ from "lodash"
import { USER_LOGIN_SUCCESSFUL, USER_LOGOUT } from "./action";


const initialState = {
   isLoggedIn: false,
   token: '',
}
 
export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case USER_LOGIN_SUCCESSFUL: {
         let newState = { ...state, isLoggedIn: true, token: action?.token }
         return newState;
      } 
      case USER_LOGOUT: {
         let newState = { ...state, isLoggedIn: false, token: '' }
         return newState;
      }
      default: {
         return state;
      }
   }
}

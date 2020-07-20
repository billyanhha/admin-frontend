import { GET_CUSTOMER, SAVE_CUSTOMER, CHANGE_CUSTOMER_STATUS } from "./action"

export const getCustomer = (data) => {    
    return {
        type: GET_CUSTOMER,
        data
    }
}

export const saveCustomer = (customers) => {    
    return {
        type: SAVE_CUSTOMER,
        customers
    }
}

export const changeCustomerStatus = (data) => {    
    return {
        type: CHANGE_CUSTOMER_STATUS,
        data
    }
}






import { GET_CUSTOMER, SAVE_CUSTOMER, CHANGE_CUSTOMER_STATUS, SAVE_CUSTOMER_PATIENT, GET_CUSTOMER_PATIENT } from "./action"

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

export const getCustomerPatient = (data) => {    
    return {
        type: GET_CUSTOMER_PATIENT,
        data
    }
}

export const saveCustomerPatient = (patients) => {    
    return {
        type: SAVE_CUSTOMER_PATIENT,
        patients
    }
}







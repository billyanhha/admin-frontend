import axios from "../axios";
import _ from "lodash"
const customerService = {};

customerService.getCustomer = (data, token) => new Promise((reslove, reject) => {
    const api = "/api/customer";
    axios.get(api, {
        params: data,
        headers: {
            Authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => {
            reslove(result.data)
        })
        .catch(err => reject(err))
});

customerService.changeCustomerStatus = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/customer/${data?.id}`;
    axios.put(api, {active: data?.active}, {
        headers: {
            Authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => {
            reslove(result.data)
        })
        .catch(err => reject(err))
});

customerService.getCustomerPatient = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/customer/${data.id}/patient`;
    axios.get(api, {
        headers: {
            Authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => {
            reslove(result.data)
        })
        .catch(err => reject(err))
});

export default customerService;
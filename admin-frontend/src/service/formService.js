import axios from "../axios";

const formService = {};

formService.getForm = (name, token) => new Promise((resolve, reject) => {
    const api = '/api/form';

    axios.get(api, {
        params: {
            name: name
        }
        ,
        headers: {
            Authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => {

            resolve(result.data);
        })
        .catch(err => {
            reject(err);
        })
})

formService.editForm = (data, token) => new Promise((resolve, reject) => {
    const api = `/api/form/${data?.id}`;

    axios.put(api, data,
        {
            headers: {
                Authorization: "Bearer " + token,
                Accept: '*/*'
            }
        })
        .then(result => {

            resolve(result.data);
        })
        .catch(err => {
            reject(err);
        })
})

export default formService

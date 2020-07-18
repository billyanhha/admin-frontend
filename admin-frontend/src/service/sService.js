import axios from "../axios";

const sService = {};

sService.getService = (data, token) => new Promise((reslove, reject) => {
    const api = "/api/service";
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

sService.getServiceCategory = (data) => new Promise((reslove, reject) => {
    const api = "/api/service-category";
    axios.get(api, {
        params: data,
    })
        .then(result => {
            reslove(result.data)
        })
        .catch(err => reject(err))
});

sService.addService = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/service-category/${data.category_id}/service`;
    axios.post(api, data, {
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


sService.editService = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/service/${data.id}`;
    axios.put(api, data, {
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

sService.getServiceCategory = (data, token) => new Promise((reslove, reject) => {
    const api = "/api/service-category";
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

export default sService;
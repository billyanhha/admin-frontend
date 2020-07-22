import axios from "../axios";
import _ from "lodash"
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

sService.addServiceCategory = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/service-category`;
    let form = new FormData();
    form.append('image', data?.image);
    form.append('name', data?.name);
    form.append('description', data?.description);

    axios.post(api, form, {
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


sService.editServiceCategory = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/service-category/${data?.id}`;
    let form = new FormData();
    if (data?.image?.name) {
        form.append('image', data?.image);
    }
    form.append('active', data?.active);
    form.append('name', data?.name);
    form.append('description', data?.description);

    axios.put(api, form, {
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

sService.getServiceRequest = (data, token) => new Promise((reslove, reject) => {
    const api = "/api/service-request";
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

sService.editServiceRequest = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/service-request/${data?.id}`;
    axios.put(api , data, {
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
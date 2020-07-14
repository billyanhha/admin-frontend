import axios from "../axios";
import _ from "lodash";
const packageService = {};

packageService.getDoctorPackage = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/package`;

    axios.get(api, {
        params: data,
        headers: {
            authorization: "Bearer " + token,
            Accept: '*/*'
        }
    }
    )
        .then(result => reslove(result.data))
        .catch(err => reject(err))
})


packageService.getPackageInfo = (id, token) => new Promise((reslove, reject) => {
    const api = `/api/package/${id}`;

    axios.get(api, {
        headers: {
            authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => reslove(result.data))
        .catch(err => reject(err))
})

packageService.getAllAppointmentByPackageID = (packageId, token) => new Promise((reslove, reject) => {
    axios.get(`/api/package/${packageId}/appointments`, {
        params: {

        },
        headers: {
            authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => reslove(result.data))
        .catch(err => reject(err))
});

packageService.getPackageStatus = (id, token) => new Promise((reslove, reject) => {
    const api = `/api/package/${id}/status`;

    axios.get(api, {
        headers: {
            authorization: "Bearer " + token,
            Accept: '*/*'
        },
    })
        .then(result => reslove(result.data))
        .catch(err => reject(err))
})


packageService.changePackageStatus = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/package/${data.packageId}/status/${data.statusId}`;

    axios.post(api, data, {
        headers: {
            authorization: "Bearer " + token,
            Accept: '*/*'
        }
    })
        .then(result => reslove(result.data))
        .catch(err => reject(err))
})


packageService.updateAppointmentPackage = (data, token) => new Promise((reslove, reject) => {
    const api = `/api/appointment/${data?.appointmentId}`;


    axios.put(api, {
        appointment_status_id: data?.appointment_status_id
    }, {
        headers: {
            authorization: "Bearer " + token,
            Accept: '*/*'
        },
    })
        .then(result => {
            reslove(result.data)
        })
        .catch(err => reject(err))
})



export default packageService;
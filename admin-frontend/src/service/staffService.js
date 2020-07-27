import axios from "../axios";

const staffService = {};

staffService.editStaffProfile = (token, id, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/staff/${id}`;
        const headers = {
            Authorization: `Bearer ${token}`
        };
        axios
            .put(api, data, {headers: headers})
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.changeStaffPassword = (token, id, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/staff/${id}/change-password`;
        const headers = {
            Authorization: `Bearer ${token}`
        };
        axios
            .put(api, data, {headers: headers})
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.sendMailReset = (data) =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/mail-reset-password`;
        console.log(data)
        axios
            .post(api, data.data)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.sendPasswordReset = (token, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/doctor/account/reset-password/${token}`;
        axios
            .put(api, data)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.checkEmailExpired = (token) =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/check-mail-token`;
        axios
            .get(api, {
                params: {
                    token: token
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

export default staffService;

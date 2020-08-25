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

staffService.sendMailReset = data =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/mail-reset-password`;
        console.log(data);
        axios
            .post(api, data.data)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.sendPasswordReset = (token, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/staff/account/reset-password/${token}`;
        axios
            .put(api, data)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.checkEmailExpired = token =>
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

staffService.getAllDoctor = data =>
    new Promise((resolve, reject) => {
        const api = "/api/doctor";
        axios
            .get(api, {
                params: data
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.createDoctor = (token, data) =>
    new Promise((resolve, reject) => {
        const api = "/api/doctor";
        axios
            .post(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.updateDoctor = (token, id, data) =>
    new Promise((resolve, reject) => {
        const api = "/api/doctor/" + id;
        axios
            .put(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.getDoctorExperience = id =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/experiences`;
        axios
            .get(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.createDoctorExperience = (token, id, content) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/experiences`;
        axios
            .get(api, content, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.updateDoctorExperience = (token, doc_id, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${doc_id}/experiences`;
        axios
            .post(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.deleteDoctorExperience = (token, id) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/experiences/${id}`;
        axios
            .delete(api, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.getDoctorLanguage = id =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/languages`;
        axios
            .get(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.updateDoctorLanguage = (token, doc_id, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${doc_id}/languages`;
        axios
            .post(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.addDoctorLanguage = (id, language_id) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/languages/${language_id}`;
        axios
            .post(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.removeDoctorLanguage = (id, language_id) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/languages/${language_id}`;
        axios
            .delete(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.getDoctorDegree = id =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/degrees`;
        axios
            .get(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.updateDoctorDegree = (token, doc_id, data) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${doc_id}/degrees`;
        axios
            .post(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.addDoctorDegree = (id, degree_id) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/degrees/${degree_id}`;
        axios
            .post(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.removeDoctorDegree = (id, degree_id) =>
    new Promise((resolve, reject) => {
        const api = `/api/doctor/${id}/degrees/${degree_id}`;
        axios
            .delete(api)
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.getAllLanguage = token =>
    new Promise((resolve, reject) => {
        const api = "/api/language";
        axios
            .get(api, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.createLanguage = (token, data) =>
    new Promise((resolve, reject) => {
        const api = "/api/language";
        axios
            .post(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.updateLanguage = (token, lang_id, data) =>
    new Promise((resolve, reject) => {
        const api = "/api/language/" + lang_id;
        axios
            .put(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.removeLanguage = (token, lang_id) =>
    new Promise((resolve, reject) => {
        const api = "/api/language/" + lang_id;
        axios
            .delete(api, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.getAllDegree = token =>
    new Promise((resolve, reject) => {
        const api = "/api/degree";
        axios
            .get(api, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.createDegree = (token, data) =>
    new Promise((resolve, reject) => {
        const api = "/api/degree";
        axios
            .post(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.updateDegree = (token, degree_id, data) =>
    new Promise((resolve, reject) => {
        const api = "/api/degree/" + degree_id;
        axios
            .put(api, data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

staffService.removeDegree = (token, degree_id) =>
    new Promise((resolve, reject) => {
        const api = "/api/degree/" + degree_id;
        axios
            .delete(api, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "*/*"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });

export default staffService;

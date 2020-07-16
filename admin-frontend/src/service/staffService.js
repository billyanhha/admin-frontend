import axios from "../axios";

const staffService = {};

staffService.editStaffProfile = (token, id, data) => new Promise((resolve, reject) => {
    const api = `/api/staff/${id}`;
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    axios.put(api, data, { headers: headers })
        .then(result => {
            resolve(result.data);
        })
        .catch(err => reject(err));
});

staffService.changeStaffPassword = (token, id, data) => new Promise((resolve, reject) => {
    const api = `/api/auth/staff/${id}/change-password`;
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    axios.put(api, data, { headers: headers })
        .then(result => {
            resolve(result.data);
        })
        .catch(err => reject(err));
});



export default staffService;
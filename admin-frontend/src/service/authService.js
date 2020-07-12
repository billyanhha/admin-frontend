import axios from "../axios";


const authService = {};


authService.login = (values) => new Promise((resolve, reject) => {
    const api = '/api/auth/staff/signin';

    axios.post(api, values)
        .then(result => {
            resolve(result.data);
        })
        .catch(err => {
            reject(err);
        })
}) 



export default authService;
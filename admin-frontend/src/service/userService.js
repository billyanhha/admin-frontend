import axios from "../axios";

const userService = {};

userService.getuserByJwt = (token) => new Promise((reslove, reject) => {
    const api = "/api/staff/users/one";
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

userService.getStaff = (data, token) => new Promise((reslove, reject) => {
    const api = "/api/staff";
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

userService.registerStaff = (data, token) => new Promise((reslove, reject) => {
    const api = "api/auth/staff/signup";
    axios.post(api, data,  {
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

userService.editStaff = (data, token) => new Promise((reslove, reject) => {
    const api = `api/staff/${data?.id}`;
    axios.put(api, data,  {
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


userService.changeStaffStatus = (data, token) => new Promise((reslove, reject) => {
    const api = `api/staff/${data?.id}/toggle-activate`;
    axios.put(api,  {}, {
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

userService.verifyEmail = token =>
    new Promise((resolve, reject) => {
        const api = `/api/auth/verify-email/${token} `;
        axios
            .put(api, {role: "staff"})
            .then(result => {
                resolve(result.data);
            })
            .catch(err => reject(err));
    });


export default userService;
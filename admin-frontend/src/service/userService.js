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


export default userService;
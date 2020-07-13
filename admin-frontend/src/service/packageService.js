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



export default packageService;
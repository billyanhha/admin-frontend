import axios from "../axios";

const statisticService = {};

statisticService.getTopDoctor = values =>
    new Promise((resolve, reject) => {
        const api = "/api/doctor/top/package";
        axios
            .get(api, {
                params: {
                    top: values.top,
                    month: values.month,
                    status: values.statusID
                },
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });

export default statisticService;

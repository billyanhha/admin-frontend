import axios from "../axios";

const statisticService = {};

statisticService.getTopDoctor = values =>
    new Promise((resolve, reject) => {
        const api = values.typeStatistic == 0 ? "/api/doctor/top/package" : "/api/doctor/top/appointment";
        axios
            .get(api, {
                params: {
                    top: values.top,
                    month: values.month,
                    status: values.statusID
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });

statisticService.getStatisticDataApmPkg = values =>
    new Promise((resolve, reject) => {
        const api = `/api/${values.typeStatistic==0?"appointment":"package"}/statistic/graph`;
        axios
            .get(api, {
                params: {
                    month: values.month
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });

export default statisticService;

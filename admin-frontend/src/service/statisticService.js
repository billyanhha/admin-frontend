import axios from "../axios";

const statisticService = {};

statisticService.getTopDoctor = values =>
    new Promise((resolve, reject) => {
        const api = values.typeStatistic == 0 ? "/api/doctor/top/package" : "/api/doctor/top/appointment";
        axios
            .get(api, {
                params: {
                    top: values.top,
                    month: values.month ?? "all",
                    year: values.year,
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
        const api = `/api/${values.typeStatistic == 0 ? "package" : "appointment"}/statistic/graph`;

        //  ****    NOTES: if status != null → month (must be) = "all"
        //          month != "all" when status != null → cause conflic logic at backend.
        //
        //      PAY ATTENTION TO THIS SH!!!
        /*  
            typeStatistic: 
                0: Statistic by package
                1: Statistic by appointment
        

            typeGraph: 
                0: View all package status
                1: View all appointment status
                2: View each status of package
                3: View each status of appointment
        */

        axios
            .get(api, {
                params: {
                    status: values.statusID,
                    month: values.statusID ? null : values.month ?? "all",
                    year: values.year ?? "all"
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

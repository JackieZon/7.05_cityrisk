import axios from 'axios'

export const axiosApi = (url)=>{
    const api = new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                if(res.data.status){
                    resolve(res.data.info);
                }
            }
        }).catch((res) => {
            reject(res);
        })
    });
    return api;
}
import axios from 'axios';

export default class Axios {
    static axios(options){
        let baseAPI = 'http://119.29.223.55:18888/uwbmwr/search';
        return new Promise((resolve,reject)=>{
            axios({
                method:'get',
                baseURL: baseAPI,
                url:options.url,
                timeout:5000,
                params:(options.data && options.data.params ) || ''
            }).then((response)=>{
                if(response.status == '200'){
                    let res = response.data;
                    resolve(res);
                }else{
                    reject(response.data)
                }
            })
        })
    }
}
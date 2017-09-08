/**
 * Created by mapbar_front on 2017/9/6.
 */
import 'whatwg-fetch';
import 'es6-promise';


let request = () => {

};
function isObject(value) {
    return typeof value === 'object';
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function dealData(jsonData) {
    let str = '';
    if(isObject(jsonData)){
        str+='?';
        let strs = '';
        for(let i in jsonData){
            strs += `${i}=${jsonData[i]}&`
        }
        strs.length = strs.length - 1 ;
        str += strs;
        return str;
    }else{
        return str;
    }
}
function fetchData(url,data,type) {
    if(type == "POST"){

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:'cors',
            body: data && JSON.stringify(data) || null
        });
    }else{
        let requestUrl = data ? url : url +  dealData(data);
        return fetch(requestUrl,{
            mode:'cors'
        }).then(res => {
            return res.json()
        });
    }

}
export let RequestService = {
    get: function (url,data,) {
        return fetchData(url,data)
    },
    post: function (url,data) {
        return fetchData(url,data,'POST')
    },
    request: fetchData
};



export default RequestService;

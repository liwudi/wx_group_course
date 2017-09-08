/**
 * Created by mapbar_front on 2017/9/6.
 */
import RequestService from './BaseServices';

import serverConfig from '../config';
const serviceUrl = serverConfig.server.main_url
function makeUrl(url) {
    if(url){
        return serviceUrl + url
    }
    return serviceUrl;

}
export function getList() {
    return RequestService.get(
        makeUrl(),
        {}
    )
}
/**
 * Created by mapbar_front on 2017/9/6.
 */


//线上环境
const service = {
    main_url:`http://datainfo.duapp.com/shopdata/getclass.php`
};


//内网环境
const service_test = {
    main_url:`http://112.126.68.167:8080`
};


export default {
    server: service_test
}
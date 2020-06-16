import axios from "axios";
import qs from "qs";
import store from "../../store";
import router from "../../router";
import { getCookie, delAllCookie } from "./mUtils";

let baseUrl = "";
axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};
const errorHaddle = (res, fn, errFn) => {
    res = res.data;
    let errMsg = "";
    console.log(res);

    if (res.message == "ok" || res.msg == "ok" || res.status == true) {
        fn(res.data);
        // console.log();
    } else {
        errMsg = res.msg ? res.msg : res.message;
        if (errFn) {
            errFn(res);
        }
        if (res.code == -1) {
            delAllCookie();
            localStorage[
                "userface"
            ] = require("../../components/header/images/userHeaderPic@2x.jpg");

            router.push({ name: "home" });
            store.commit("loginStatusCtr", false);
            store.commit(
                "errorCtr",
                "你的账号在其他装置进行登录，如不是本人操作，请重新登录后尽快修改密码，确保账号安全。"
            );
        } else {
            store.commit("errorCtr", errMsg);
        }
    }
    // if(res.code!=undefined){
    //   if(res.code==0){
    //     fn(res.data)
    //   }else{
    //     errMsg = res.msg?res.msg:res.message
    //   }
    // }else if(res.status!=undefined){
    //   if(res.status==1){
    //     fn(res.info)
    //   }else{
    //     errMsg = res.info
    //   }
    // }
    store.commit("errorCtr", errMsg);
    // if(res.code==0){
    //   fn(res.data)
    // }else{
    //    errMsg = res.msg?res.msg:res.message
    //   store.commit('errorCtr',errMsg)
    // }
};
export default (
    type = "GET",
    url = "",
    data = {},
    fn,
    errFn = function() {}
) => {
    data.terminal = "pc";
    // let baseUrl = "http://admin.intelligentjoy.com/";
    // let baseUrl = "http://test.intelligentjoy.com/";
    let baseUrl = "http://www.intelligentjoy.com/";
    if (url.indexOf("php") == -1) {
        baseUrl = "http://www.intelligentjoy.com/sub/";
        // baseUrl = "http://test.intelligentjoy.com/sub/";
        // url = url + '?api_version=V3'
    }
    if (url.indexOf("mock") != -1) {
        baseUrl = "https://www.easy-mock.com/mock/5afb9e8ec02bdb07c894d49c/pc/";
    }
    type = type.toUpperCase();
    data.oauth_token = getCookie("oauth_token") || "";
    data.oauth_token_secret = getCookie("oauth_token_secret") || "";
    data.uid = getCookie("uid") || "";
    data.user_id = getCookie("uid") || "";
    data.api_version = "V3";

    if (type === "GET") {
        axios
            .get(baseUrl + url, {
                params: data
            })
            .then(function(res) {
                errorHaddle(res, fn, errFn);
            })
            .catch(function(err) {
                console.log(err);
                errFn();
            });
    }
    if (type === "POST") {
        axios
            .post(baseUrl + url, qs.stringify(data))
            .then(function(res) {
                errorHaddle(res, fn);
            })
            .catch(function(err) {
                console.log(err);
            });
    }
};

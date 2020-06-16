<template lang="html">
  <div id="login" v-if="login.display">
    <el-dialog
    :visible.sync="login.display"
    @close="closeLogin()"
    width="28rem">
    <div slot="title" class="loginHeader">
        <div :class="['tab',tabIndexClass]">
        <a href="javascript:;" @click="tab(1)" :class="[mobileOrEmail==1?'active':'']">
            {{optionsType==1?$t('login.1'):''}}{{optionsType==2?$t('login.2'):''}}{{optionsType==3?$t('login.3'):''}}
        </a>
        <a v-if='optionsType==1 || optionsType==3' href="javascript:;" @click="tab(2)" :class="[mobileOrEmail==2?'active':'']">
            {{optionsType==1?$t('login.4'):''}}{{optionsType==2?$t('login.5'):''}}{{optionsType==3?$t('login.6'):''}}
        </a>
        </div>
        <!-- <span class="register" v-show="optionsType==1" @click="optionsType = 2;tab(mobileOrEmail)">{{$t('login.7')}}</span> -->
    </div>
    <div class="">
        <el-form :model="loginAndRegister"  :rules="rules2" ref="loginAndRegister"  >
        <!-- 手机号输入框 -->
    <el-form-item label="" prop="mobile" class="mobile" v-if="mobileOrEmail==1">
        <div class="mobileAreaSelect">
        <img src="./images/arrowDown@2x.png" alt="">
        <el-select class="p-a-select" v-model="loginAndRegister.area" @click="loginAndRegister.mobile=''">
            <el-option v-for="(item,index) in phoneArea" :key="index" :value="item" :label="item"></el-option>
        </el-select>
        </div>
        <el-input  v-model="loginAndRegister.mobile" auto-complete="off" :placeholder="$t('login.8')"></el-input>
    </el-form-item>
    <!-- 邮箱输入框 -->
    <el-form-item label="" prop="email" v-if="mobileOrEmail==2">
        <el-input  v-model="loginAndRegister.email" auto-complete="off" :placeholder="$t('login.9')"></el-input>
    </el-form-item>
    <!-- 验证码输入框 -->
    <el-form-item label="" prop="code" class="code" v-if="optionsType!=1">
        <el-input v-model="loginAndRegister.code" :placeholder="$t('login.10')"></el-input>
        <button type="button" name="button" v-show="canSendCode" :class="[isTrue?'able':'disable']" @click="sendCode()">{{$t('login.11')}}</button>
        <button type="button" name="button" v-show="!canSendCode" class="disable">{{$t('login.12')}}({{CodeCountDown}})</button>
    </el-form-item>
    <!-- 用户名输入框 -->
    <el-form-item label=""  prop="name" class="pass" v-if="optionsType==2">
        <el-input v-model="loginAndRegister.name"  :placeholder="$t('login.29')" ></el-input>
    </el-form-item>
    <!-- 密码输入框 -->
    <el-form-item label=""  prop="pass" class="pass">
        <el-input v-model="loginAndRegister.pass" :type="inputType" :placeholder="optionsType==3?$t('login.13'):$t('login.14')" auto-complete="new-password" ></el-input>
        <div class="passCtr">
        <img v-show='!passVisible' src="./images/Login_passwordvisual@2x.png" alt="" @click="passVisible=!passVisible;inputType=''">
        <img v-show='passVisible' src="./images/Login_passwordinvisible@2x.png" alt="" @click="passVisible=!passVisible;inputType='password'">
        </div>
    </el-form-item>
    <div class="remenberPass" v-if="optionsType==1">
        <div class="left">
        <img src="./images/remenber@2x.png" alt="" v-show="remenberPass" @click="remenberPass=!remenberPass">
        <img src="./images/unRemenber@2x.png" alt="" v-show="!remenberPass" @click="remenberPass=!remenberPass">
        <span>{{$t('login.15')}}</span>
        </div>
        <span  @click="optionsType=3;tab(mobileOrEmail)">{{$t('login.16')}}</span>
    </div>
    <button type="button" class="button loginBtn" @click="submitForm('loginAndRegister')" v-if="optionsType==1">{{$t('login.17')}}</button>
    <p class="register" v-show="optionsType==1">{{$t("login.30")}}？<span @click="optionsType = 2;tab(1)">立即{{$t('login.7')}}</span></p>
    <button type="button" :class="['button',agreement?'loginBtn':'']" @click="submitForm('loginAndRegister')" v-if="optionsType==2">{{$t('login.7')}}</button>
    <button type="button" class="button loginBtn" @click="submitForm('loginAndRegister')" v-if="optionsType==3">{{$t('login.18')}}</button>
    <div class="agreement" v-if="optionsType==2">
        <img src="./images/remenber@2x.png" alt="" v-show="agreement" @click="agreement=!agreement">
        <img src="./images/unRemenber@2x.png" alt="" v-show="!agreement" @click="agreement=!agreement">
        <span >{{$t('login.19')}}</span>
        <a href="javascript:;" @click="toAgreement">《{{$t('login.20')}}》</a>
    </div>
    <div class="toLogin" v-if="optionsType!=1">
        <span>{{$t('login.21')}}</span>
        <span @click="optionsType=1;tab(mobileOrEmail)">{{$t('login.22')}}</span>
    </div>
    </el-form>
    </div>
    </el-dialog>
  </div>
</template>
<style>
    * {
      font-size: 14px;
      box-sizing: border-box;
    }
</style>
<!--<script>-->

<!--  // !function(n){-->
<!--  //   var e=document.getElementsByTagName("html")[0],i=0;function o(){var n=Math.min(document.documentElement.getBoundingClientRect().width,window.innerWidth);520<n?n=520:n||i<9&&(n=375,setTimeout(function(){i++,o()},200));var t=n/(750/100);e.style.fontSize=t+"px"}o(),n.addEventListener("resize",function(){o()})}(window);-->

<!--  // document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';-->
<!--</script>-->
<script>

import { mapState } from "vuex";
// import store from "../../store/index";
import { getCookie, setCookie } from "../../assets/js/mUtils";
import { md5 } from "../../assets/js/md5.min";
export default {
    name: "login",
    data() {
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                this.isTrue = false;
                return callback(new Error(this.$t("login.23")));
            }
            if (this.loginAndRegister.area == "+86") {
                //内地
                if (!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value)) {
                    this.isTrue = false;
                    return callback(new Error(this.$t("login.24")));
                }
            } else {
                //香港
                if (!/^([2|3|4|5|6|7|8|9])\d{7}$/.test(value)) {
                    this.isTrue = false;
                    return callback(new Error(this.$t("login.24")));
                }
            }
            this.isTrue = true;
            callback();
        };
        var checkEmail = (rule, value, callback) => {
            //验证邮箱
            if (value === "") {
                callback(new Error(this.$t("login.25")));
                this.isTrue = false;
            } else if (
                /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
                    value
                )
            ) {
                this.isTrue = true;
            } else {
                this.isTrue = false;
                callback(new Error(this.$t("login.26")));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            //第一次输入密码
            if (value === "") {
                callback(new Error(this.$t("login.27")));
            }
            if (this.optionsType != 1) {
                if (value.length < 6 || value.length > 20) {
                    callback(new Error(this.$t("login.28")));
                }
            }
            callback();
        };
        return {
            // loginVisible: false,
            mobileOrEmail: 1, // 1 手机 2 邮箱
            optionsType: 1, //1 登录 2 注册 3 找回密码
            tabIndexClass: "tab_1",
            canSendCode: true, //true 可以发送验证码 false 不可发送验证码
            CodeCountDown: 60, //验证码倒计时
            passVisible: false, //false 密码不可见 true 密码可见
            remenberPass: false, //true 记住密码 false 不记住密码
            agreement: true, //true 同意协议 false 不同意
            inputType: "password",
            isTrue: false, //是否可以发送验证码
            phoneArea: ["+852", "+86", "+853"],
            loginAndRegister: {
                mobile: "",
                area: "+852",
                email: "",
                code: "",
                pass: "",
                checkPass: "",
                name: ""
            },
            rules2: {
                mobile: [
                    {
                        validator: checkMobile,
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        validator: checkEmail,
                        trigger: "blur change"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }
                ],
                pass: [{ validator: validatePass, trigger: "blur" }],
                name: [
                    {
                        required: true,
                        message: "请输入用戶名",
                        trigger: "blur"
                    }
                ]
            },
            to: {}, //登录后路由信息
            reload: false //登录后刷新页面
        };
    },
    computed: {
        ...mapState(["login"])
    },
    created() {
        // let loadingCtr;
        this.$router.beforeEach((to, from, next) => {
            this.next = next;
            this.reload = false;
            // loadingCtr = this.$loading({
            //     background: "rgba(0, 0, 0, 0.4)"
            // });
            this.sendMsgParent(to);
            this.loagin(to, next);
        });
        this.$router.afterEach((to, from) => {
            if (!from.name) {
                //刷新页面
                this.reload = true;
                this.$router.options.routes.forEach((item, index) => {
                    if (item.children) {
                        //嵌套路由
                        item.children.forEach((Item, Index) => {
                            if (to.name == Item.name) {
                                this.sendMsgParent(Item);
                                this.loagin(to);
                            }
                        });
                    } else {
                        if (to.name == item.name) {
                            this.sendMsgParent(item);
                            this.loagin(to);
                        }
                    }
                });
            } else {
                // setTimeout(() => {
                //     loadingCtr.close();
                // }, 300);
            }
        });
    },
    mounted() {
        this.optionsType = this.login.type;
        if (localStorage.getItem("loginInfo")) {
            let tempObj = JSON.parse(localStorage.getItem("loginInfo"));
            this.mobileOrEmail = tempObj.type;
            if (this.mobileOrEmail == 1) {
                //手机登录
                this.loginAndRegister.mobile = tempObj.name;
            } else {
                //邮箱登录
                this.loginAndRegister.email = tempObj.name;
            }
            this.tabIndexClass = "tab_" + tempObj.type;
        }
    },
    methods: {
        tab(type) {
            this.mobileOrEmail = type;
            this.tabIndexClass = "tab_" + type;
            this.$refs["loginAndRegister"].resetFields();
            this.loginAndRegister.mobile = "";
            this.loginAndRegister.email = "";
            this.loginAndRegister.pass = "";
            this.loginAndRegister.code = "";
        },
        toAgreement() {
            this.$store.commit("loginCtr", {
                display: false
            });
            this.$router.push({ name: "agreement" });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    switch (+this.optionsType) {
                        case 1: //登录
                            this.loginSubbmit();
                            break;
                        case 2: //注册
                            this.registerSumit();
                            break;
                        case 3: //找回密码
                            this.resetPassword();
                            break;
                    }
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        loginSubbmit() {
            //登录
            let uname =
                this.mobileOrEmail == 1
                    ? this.loginAndRegister.mobile
                    : this.loginAndRegister.email;
            let pass = this.loginAndRegister.pass;
            this.http(
                "get",
                "index.php?app=api&mod=Login&act=login",
                {
                    uname: uname,
                    upwd: pass
                },
                data => {
                    this.$store.commit("loginStatusCtr", true);
                    console.log(data);
                    setCookie("uid", data.uid);
                    console.log('uid', getCookie('uid'))
                    setCookie("phone", data.phone);
                    setCookie("email", data.email);
                    setCookie("uname", data.uname);
                    setCookie("oauth_token", data.oauth_token);
                    setCookie("oauth_token_secret", data.oauth_token_secret);

                    sessionStorage["uname"] = data.uname;
                    sessionStorage["phone"] = data.phone;
                    sessionStorage["email"] = data.email;

                    localStorage["userface"] = data.userface;
                    localStorage["phone"] = data.phone;
                    localStorage["email"] = data.email;
                    this.$root.$emit("updateTx", data.userface);

                    this.$store.commit("loginCtr", {
                        display: false
                    });

                    this.loginVisible = false
                    if (this.reload) {
                        location.reload();
                    } else {
                        this.$router.push({
                            name: this.to.name,
                            query: this.to.query,
                            parmas: this.to.params
                        });
                    }

                    if (this.remenberPass) {
                        setCookie("uid", data.uid, 7);
                        setCookie("uname", data.uname, 7);
                        setCookie("oauth_token", data.oauth_token, 7);
                        setCookie(
                            "oauth_token_secret",
                            data.oauth_token_secret,
                            7
                        );

                        let passObj = {
                            type: this.mobileOrEmail //1 手机登录 2 邮箱登录
                        };
                        passObj.name =
                            this.mobileOrEmail == 1
                                ? this.loginAndRegister.mobile
                                : this.loginAndRegister.email;
                        localStorage.setItem(
                            "loginInfo",
                            JSON.stringify(passObj)
                        );
                    } else {
                        localStorage.removeItem("loginInfo");
                    }
                }
            );
        },
        sendCode() {
            //发送验证码
            if (!this.isTrue) {
                return;
            }
            this.canSendCode = false;
            let timer = setInterval(() => {
                this.CodeCountDown--;
                if (this.CodeCountDown <= 0) {
                    clearInterval(timer);
                    this.canSendCode = true;
                    this.CodeCountDown = 60;
                }
            }, 1000);
            let url = "";
            let parmas = {};
            if (this.mobileOrEmail == 1) {
                //手机验证码
                if (this.optionsType == 3) {
                    //找回密码
                    url = "index.php?app=api&app=api&mod=Login&act=phoneGetPwd";
                } else {
                    //注册
                    url = "index.php?app=api&mod=Login&act=getRegphoneCode";
                }
                parmas.phone = this.loginAndRegister.mobile;
                parmas.phone_area_code = this.loginAndRegister.area.substr(1);
            } else {
                //邮箱验证码
                if (this.optionsType == 3) {
                    //找回密码
                    url = "index.php?app=api&mod=Login&act=emailGetPwd";
                } else {
                    //注册
                    url = "index.php?app=api&mod=Login&act=getRegEmailCode";
                }
                parmas.from = "web";
                parmas.email = this.loginAndRegister.email;
            }
            this.http("post", url, parmas, data => {
                // console.log(data)
                this.$message.success("验证码发送成功，请注意查收");
            });
        },
        registerSumit() {
            //验证验证码
            let parmas = {};
            parmas.code = this.loginAndRegister.code.replace(/\s+/g, "");
            if (this.mobileOrEmail == 1) {
                //手机注册
                parmas.phone = this.loginAndRegister.mobile;
                parmas.phone_area_code = this.loginAndRegister.area.substr(1);
            } else {
                //邮箱注册
                parmas.email = this.loginAndRegister.email;
            }
            this.http(
                "post",
                "index.php?app=api&mod=Login&act=checkCode",
                parmas,
                data => {
                    this.setPassword();
                }
            );
        },
        setPassword() {
            //设置密码
            let parmas = {
                code: this.loginAndRegister.code,
                password: this.loginAndRegister.pass,
                uname: this.loginAndRegister.name
            };
            if (this.mobileOrEmail == 1) {
                //手机注册
                parmas.phone_area_code = this.loginAndRegister.area.substr(1);
                parmas.login = this.loginAndRegister.mobile;
                parmas.type = 2;
            } else {
                //邮箱注册
                parmas.login = this.loginAndRegister.email;
                parmas.type = 1;
            }
            this.http(
                "post",
                "index.php?app=api&mod=Login&act=app_regist&terminal=pc",
                parmas,
                data => {
                    this.$message.success("注册成功，请登录");
                    this.optionsType = 1;
                    if (confirm('立即下载慧悦港股APP，亲身体验更多精彩免费内容')) {
                        location.href = 'http://m.intelligentjoy.com/downPage';
                    }
                }
            );
        },
        resetPassword() {
            //找回密码
            let url = "";
            let pwd = md5(this.loginAndRegister.pass);
            let parmas = {
                code: this.loginAndRegister.code,
                pwd: pwd,
                repwd: pwd
            };
            if (this.mobileOrEmail == 1) {
                //手机注册
                url = "index.php?app=api&mod=Login&act=savePwd";
                parmas.phone_area_code = this.loginAndRegister.area.substr(1);
                parmas.phone = this.loginAndRegister.mobile;
            } else {
                //邮箱注册
                url = "index.php?app=api&mod=Login&act=resetByEmail";
                parmas.email = this.loginAndRegister.email;
            }
            this.http("post", url, parmas, data => {
                this.$message.success("修改成功，请登录");
                this.optionsType = 1;
            });
        },
        closeLogin() {
            //关闭弹窗回调
            this.tab(1);
            this.mobileOrEmail = 1; // 1 手机 2 邮箱
            this.optionsType = 1; //1 登录 2 注册 3 找回密码
            this.tabIndexClass = "tab_1";
            this.$refs["loginAndRegister"].resetFields();
            this.$store.commit("loginCtr", {
                display: false,
                to: "",
                type: 1
            });
        },
        sendMsgParent(to) {
            let footerCtr = true;
            let headerCtr = true;
            document.title = this.$i18n.messages[this.$i18n.locale].title[
                to.meta.title
            ]; //设置title
            if (to.meta.hiddenFooter) {
                footerCtr = false;
            }
            if (to.meta.hiddenHeader) {
                headerCtr = false;
            }
            let parmas = {
                headerCtr: headerCtr,
                footerCtr: footerCtr
            };
            this.$emit("watchPageCtr", parmas);
        },
        loagin(to, next) {
            if (
                !getCookie("uid") ||
                !getCookie("oauth_token") ||
                !getCookie("oauth_token_secret")
            ) {
                this.$store.commit("loginStatusCtr", false);
            } else {
                this.$store.commit("loginStatusCtr", true);
                sessionStorage["uname"] = getCookie("uname");
            }

            if (to.meta.needLogin) {
                if (
                    !getCookie("uid") ||
                    !getCookie("oauth_token") ||
                    !getCookie("oauth_token_secret")
                ) {
                    if (!this.reload) {
                        // setTimeout(() => {
                        //     loadingCtr.close();
                        // }, 100);
                        this.to = to;
                    }
                    this.$store.commit("loginCtr", {
                        display: true
                    });
                } else {
                    if (!this.reload) {
                        next();
                    }
                }
            } else {
                if (!this.reload) {
                    next();
                }
            }
        }
    },
    watch: {
        "login.type"(val) {
            this.optionsType = val || 1;
        }
    }
    // watch:{
    //   login(val){
    //     if(val.display){
    //       this.loginVisible = val.display
    //       this.optionsType = val.type
    //       // alert(this.optionsType)
    //       if(this.optionsType==1){//如果为登录，则从localStorage获取登录信息
    //         let passObj = JSON.parse(localStorage.getItem('loginInfo'))
    //         this.$nextTick(() => {
    //           if(passObj.type){
    //             this.mobileOrEmail = passObj.type
    //             this.tabIndexClass = 'tab_'+passObj.type
    //             if(this.mobileOrEmail==1){//手机登录
    //               this.loginAndRegister.mobile = passObj.name
    //             }else{
    //               this.loginAndRegister.email = passObj.name
    //             }
    //             this.loginAndRegister.pass = passObj.password
    //           }
    //         })
    //       }
    //     }
    //   },
    //   optionsType(val){//重置参数
    //     this.$refs['loginAndRegister'].resetFields()
    //   }
    // }
};
</script>

<style lang="less">
#login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    .el-form{
        width: 24rem;
        max-width: 100%;
    }
    .el-dialog{
        margin: 0 auto;
        max-width: 100%;
        margin-top: 10vh!important;
    }
    .el-dialog__wrapper{
        width: 98vw;
        margin-left: 1vw;
    }
    .el-dialog__header {
        padding: 0;
    }
    .loginHeader {
        margin: 0 2rem;
        max-width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #dedede;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        .tab {
            display: flex;
            position: relative;
            &::after {
                position: absolute;
                content: "";
                bottom: 0;
                left: 0;
                height: 2px;
                width: 100px;
                background-color: #63acff;
                transition: all 0.4s;
            }
            a {
                width: 100px;
                padding: 32px 0 25px;
                font-size: 16px;
                color: #999;
                text-align: center;
                line-height: 16px;
                &:hover {
                    color: #333;
                }
            }
            .active {
                color: #333333;
            }
        }
        .tab_1 {
            &::after {
                left: 0;
            }
        }
        .tab_2 {
            &::after {
                left: 100px;
            }
        }
    }
    .el-dialog__body {
        padding: 2rem 2rem .8rem;
        box-sizing: border-box;
        width: 28rem;
        max-width: 100%;
        margin: 0 auto;
    }
    .el-form-item {
        height: 42px;
        margin-bottom: 30px;
        .el-input {
            input {
                height: 42px;
                background-color: #eee;
                border: 1px solid #ccc;
            }
        }
    }
    .mobile {
        .el-form-item__content {
            // position:
            .mobileAreaSelect {
                position: absolute;
                top: 0;
                left: 1px;
                z-index: 10;
                height: 42px;
                width: 60px;
                .p-a-select {
                    .el-input__inner {
                        height: 42px;
                        padding: 0 0 0 15px;
                        font-size: 12px;
                        border: none;
                        background: none;
                    }
                    .el-input__suffix {
                        display: none;
                    }
                }
                img {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    height: 12px;
                }
            }
            .el-input__inner {
                padding-left: 68px;
            }
        }
    }
    .code {
        .el-form-item__content {
            width: 336px;
            max-width: 100%;
            .el-input {
                width: 11rem;
                margin: 0;
                float: left;
            }
            button {
                width: 6rem;
                height: 42px;
                float: right;
                border-radius: 4px;
                border: none;
                outline: none;
                background-color: #63acff;
                font-size: 12px;
            }
            .able {
                color: #fff;
            }
            .disable {
                background-color: #eee;
                border: 1px solid #ccc;
                color: #bbb;
                cursor: not-allowed;
            }
        }
    }
    .pass {
        .el-form-item__content {
            .passCtr {
                position: absolute;
                right: 0;
                top: 0;
                height: 42px;
                display: flex;
                align-items: center;
                padding-right: 13px;
                img {
                    height: 20px;
                    cursor: pointer;
                }
            }
        }
    }
    .remenberPass {
        display: flex;
        justify-content: space-between;
        margin-bottom: 36px;
        .left {
            display: flex;
            align-items: center;

            img {
                height: 16px;
                margin-right: 10px;
                cursor: pointer;
            }
            span {
                font-size: 16px;
                color: #333;
            }
        }
        > span {
            font-size: 16px;
            color: #999;
            cursor: pointer;
        }
    }
    .button {
        width: 100%;
        height: 42px;
        border-radius: 4px;
        border: none;
        outline: none;
        font-size: 16px;
        background-color: #eee;
        color: #bbb;
        cursor: not-allowed;
    }
    .loginBtn {
        background-color: #63acff;
        color: #fff;
        cursor: pointer;
    }
    .agreement {
        display: flex;
        align-items: center;
        margin-top: 30px;
        img {
            height: 14px;
        }
        span {
            font-size: 16px;
            color: #333;
            margin-left: 10px;
        }
        a {
            font-size: 16px;
            color: #63acff;
            text-decoration: underline;
        }
    }
    .toLogin {
        margin-top: 30px;
        span:first-child {
            font-size: 16px;
            color: #333;
        }
        span:last-child {
            font-size: 16px;
            color: #63acff;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .register {
        margin-top: 30px;
        font-size: 16px;
        color: #333;
        span {
            text-decoration: underline;
            color: #63acff;
            cursor: pointer;
        }
    }
}
</style>

<style lang="less" >
.el-select-dropdown {
    z-index: 9999!important;
    span {
        font-size: 12px;
        font-weight: normal;
    }
    .popper__arrow {
        left: 100% !important;
    }
}
</style>

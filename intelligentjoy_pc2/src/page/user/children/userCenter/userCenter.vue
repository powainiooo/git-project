<template lang="html">
  <div id="userCenter">
    <div :class="['tab',tabIndexClass]">
      <a href="javascript:;" @click="tab(1)" :class="[courseType==1?'active':'']">
        {{$t("userCenter.1")}}
      </a>
      <a href="javascript:;" @click="tab(2)" :class="[courseType==2?'active':'']">
        {{$t("userCenter.2")}}
      </a>
    </div>
    <div class="personalInformation" v-show="courseType==1">
      <el-form :model="userInfo" :rules="rules" ref="userInfo" >
        <el-form-item :label="$t('userCenter.3')" prop="uname">
          <el-input v-model="userInfo.uname" :placeholder="$t('userCenter.11')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userCenter.4')" class="bd-item">
          <span :class="[userInfo.phone ? '' : 'no-bd']">{{userInfo.phone ? userInfo.phone : '您尚未'+$t('popTitle.2')}}</span>
          <a href="javascript:;" @click="$store.commit('qrCtr', {'title':$t('popTitle.2'),'show':true});">{{userInfo.phone ? '修改'+$t('popTitle.6') : '去'+$t('popTitle.2')}}</a>
        </el-form-item >
        <el-form-item :label="$t('userCenter.5')" prop="email" class="bd-item">
          <span :class="[userInfo.email ? '' : 'no-bd']">{{userInfo.email ? userInfo.email : '您尚未'+$t('popTitle.3')}}</span>
          <a href="javascript:;" @click="$store.commit('qrCtr', {'title':$t('popTitle.3'),'show':true});">{{userInfo.email ? '修改'+$t('popTitle.6') : '去'+$t('popTitle.6')}}</a>
        </el-form-item>
        <el-form-item :label="$t('userCenter.6')" class="sex" >
          <el-radio v-model="userInfo.sex" label="1">男</el-radio>
          <el-radio v-model="userInfo.sex" label="2">女</el-radio>
          <el-radio v-model="userInfo.sex" label="3">保密</el-radio>
        </el-form-item >
        <el-form-item :label="$t('userCenter.7')" id="introduce">
          <textarea v-model="userInfo.intro" :placeholder="$t('userCenter.14')"></textarea>
        </el-form-item>
        <el-form-item class="commitButton">
          <button type="button" name="button" @click="submitUserInfo('userInfo')">{{$t('userCenter.15')}}</button>
        </el-form-item>
      </el-form>
      <img :src="userInfo.avatar_big" />
    </div>
    <div class="changePassword" v-show='courseType==2'>
      <el-form :model="changePWD" :rules="rules2" ref="changePWD" label-width="100px" :label-position="'right'">
        <el-form-item :label="$t('userCenter.8')" prop="oldPassword" ref="oldPassword">
          <el-input :type="oldInputType" auto-complete="new-password" v-model="changePWD.oldPassword" autofocus="autofocus" @focus="hideVtip('oldPassword')" :placeholder="$t('userCenter.16')"></el-input>
          <div class="passCtr">
            <img v-show='!passVisible1' src="./images/Login_passwordinvisible@2x.png" alt="" @click="passVisible1=!passVisible1;oldInputType=''">
            <img v-show='passVisible1' src="./images/Login_passwordvisual@2x.png" alt="" @click="passVisible1=!passVisible1;oldInputType='password'">
          </div>
        </el-form-item>
        <el-form-item :label="$t('userCenter.9')" prop="password" ref="password">
          <el-input :type="newInputType" auto-complete="new-password" v-model="changePWD.password" @focus="hideVtip('password')" :placeholder="$t('userCenter.17')"></el-input>
          <div class="passCtr">
            <img v-show='!passVisible2' src="./images/Login_passwordinvisible@2x.png" alt="" @click="passVisible2=!passVisible2;newInputType=''">
            <img v-show='passVisible2' src="./images/Login_passwordvisual@2x.png" alt="" @click="passVisible2=!passVisible2;newInputType='password'">
          </div>
        </el-form-item>
        <el-form-item :label="$t('userCenter.10')" prop="checkPass" ref="checkPass">
          <el-input :type="checkInputType" auto-complete="new-password" v-model="changePWD.checkPass" @focus="hideVtip('checkPass')"  :placeholder="$t('userCenter.18')"></el-input>
          <div class="passCtr">
            <img v-show='!passVisible3' src="./images/Login_passwordinvisible@2x.png" alt="" @click="passVisible3=!passVisible3;checkInputType=''">
            <img v-show='passVisible3' src="./images/Login_passwordvisual@2x.png" alt="" @click="passVisible3=!passVisible3;checkInputType='password'">
          </div>
        </el-form-item>
        <el-form-item>
          <button type="button" name="button" @click="canSubmit?submitChangePwd('changePWD'):''">提交</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    name: "userCenter",
    data() {
        var oldPasswordCheck = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("userCenter.19")));
            } else {
                callback();
            }
        };
        var password = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("userCenter.19")));
            } else {
                if (this.changePWD.checkPass !== "") {
                    this.$refs.changePWD.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("userCenter.20")));
            } else if (value !== this.changePWD.password) {
                callback(new Error(this.$t("userCenter.21")));
            } else {
                callback();
            }
        };
        return {
            canSubmit: true, //能否提交
            courseType: 1, // 1 个人资料 2 修改密码
            tabIndexClass: "tab_1",
            oldInputType: "password",
            newInputType: "password",
            checkInputType: "password",
            passVisible1: false, //false 密码不可见 true 密码可见
            passVisible2: false, //false 密码不可见 true 密码可见
            passVisible3: false, //false 密码不可见 true 密码可见
            userInfo: {}, //用户信息
            rules: {
                uname: [
                    {
                        required: true,
                        message: this.$t("userCenter.11"),
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        type: "email",
                        message: this.$t("userCenter.22"),
                        trigger: "blur"
                    }
                ]
            },
            changePWD: {
                oldPassword: "",
                password: "",
                checkPass: ""
            },
            rules2: {
                oldPassword: [
                    {
                        validator: oldPasswordCheck,
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        message: "密码太短了，最少6位",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        validator: password,
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        message: "密码太短了，最少6位",
                        trigger: "blur"
                    }
                ],
                checkPass: [
                    {
                        validator: validatePass2,
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        message: "密码太短了，最少6位",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        tab(type) {
            this.courseType = type;
            this.tabIndexClass = "tab_" + type;
        },
        hideVtip(formName) {
            this.$refs[formName].clearValidate();
        },
        getUserInfo() {
            this.http(
                "get",
                "index.php?app=api&mod=User&act=show",
                {},
                data => {
                    this.userInfo = data;
                    localStorage["userface"] = data.avatar_small;
                    this.$root.$emit("updateTx", data.avatar_small);
                },
                errMsg => {}
            );
        },
        submitUserInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.canSubmit = false;
                    this.http(
                        "get",
                        "index.php?app=api&mod=User&act=saveUserInfo",
                        {
                            intro: this.userInfo.intro,
                            sex: this.userInfo.sex,
                            uname: this.userInfo.uname
                        },
                        data => {
                            this.canSubmit = true;
                            sessionStorage["uname"] = this.userInfo.uname;

                            this.$message({
                                type: "success",
                                message: "个人资料修改成功!"
                            });
                        },
                        errMsg => {
                            this.canSubmit = true;
                        }
                    );
                } else {
                    return false;
                }
            });
        },
        submitChangePwd(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.canSubmit = false;
                    this.http(
                        "get",
                        "index.php?app=api&mod=User&act=doModifyPassword",
                        {
                            oldpassword: this.changePWD.oldPassword,
                            password: this.changePWD.password,
                            repassword: this.changePWD.checkPass
                        },
                        data => {
                            this.canSubmit = true;
                            this.changePWD.oldPassword = "";
                            this.changePWD.password = "";
                            this.changePWD.checkPass = "";

                            this.$message({
                                type: "success",
                                message: "密码修改成功!"
                            });
                        },
                        errMsg => {
                            this.canSubmit = true;
                        }
                    );
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getUserInfo();
    }
};
</script>

<style lang="less">
#userCenter {
    margin-bottom: 122px;
    min-height: 240px;
    .tab {
        display: flex;
        border-bottom: 1px solid #dedede;
        position: relative;
        &::after {
            position: absolute;
            content: "";
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100px;
            background-color: #fc893d;
            transition: all 0.4s;
        }
        a {
            width: 100px;
            padding: 20px 0;
            font-size: 16px;
            color: #666;
            text-align: center;
            line-height: 16px;
            &:hover {
                color: #fc893d;
            }
        }
        .active {
            color: #fc893d;
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
    .personalInformation {
        display: flex;
        justify-content: space-between;
        padding: 15px 38px 144px 60px;
        .el-form {
            width: 643px;
            .el-form-item {
                height: 45px;
                display: flex;
                align-items: center;
                margin-bottom: 0;
                .el-form-item__label {
                    font-size: 16px;
                    color: #666;
                    width: 60px;
                    height: 16px;
                    line-height: 16px;
                    overflow: hidden;
                    // float: left;
                    text-align: justify;
                    position: relative;
                    margin-right: 6px;

                    &::after {
                        content: ":";
                        width: 100%;
                        display: inline-block;
                        height: 0;
                        overflow: hidden;
                    }
                    &::before {
                        content: ":";
                        position: absolute;
                        right: 0;
                    }
                }
                .el-form-item__content {
                    height: 26px;
                    display: flex;
                    align-items: center;
                    .el-input {
                        height: 26px;
                        display: flex;

                        input {
                            border: 0;
                            padding: 0;
                            // background-color: pink;
                            height: 26px;
                            border-bottom: 1px solid #ccc;
                            padding-left: 6px;
                            border-radius: 0;
                        }
                    }
                    .el-form-item__error {
                        left: 170px;
                        top: 3px;
                        // right: 200px;
                        width: 200px;
                    }
                }
            }
            // .is-required {
            //     .el-form-item__label:before {
            //         display: none;
            //     }
            // }
            .bd-item {
                display: flex;
                align-items: center;
                span {
                    font-size: 16px;
                    color: #666;
                    margin-right: 20px;
                    &.no-bd {
                        color: #999;
                    }
                }
                a {
                    font-size: 16px;
                    color: #63acff;
                }
            }
            .sex {
                label {
                    .el-radio__label {
                        padding-left: 4px;
                    }
                }
                label + label {
                    margin-left: 20px;
                }
            }
            #introduce {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                height: 248px;
                .el-form-item__label {
                    height: 45px !important;
                    width: 80px;
                    line-height: 45px;
                    text-align: left;
                    &::before {
                        content: "";
                    }
                }
                .el-form-item__content {
                    height: 200px;
                    display: block;
                    textarea {
                        height: 180px;
                        width: 600px;
                        padding: 0;
                        border: 1px solid #ccc;
                        outline: none;
                        display: block;
                        resize: none;
                        padding: 10px;
                        font-size: 14px;
                    }
                }
            }
            .commitButton {
                margin-top: 20px;
                button {
                    width: 240px;
                    height: 40px;
                    background-color: #fc583d;
                    border-radius: 2px;
                    outline: none;
                    border: none;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
        }
        img {
            display: flex;
            width: 180px;
            height: 180px;
            margin-top: 15px;
            padding: 8px;
            border-radius: 100%;
            box-shadow: 0px 0px 6px #d8d8d8;
        }
    }
    .changePassword {
        display: flex;
        justify-content: center;
        .passCtr {
            position: absolute;
            right: 0;
            top: 0;
            height: 40px;
            display: flex;
            align-items: center;
            padding-right: 4px;
            img {
                height: 20px;
                cursor: pointer;
            }
        }
        .el-form {
            margin-top: 60px;
            .el-input {
                height: 40px;
                width: 187px;

                input {
                    border: 1px solid #ccc;
                }
            }
            button {
                height: 40px;
                width: 187px;
                background-color: #fc583d;
                font-size: 16px;
                color: #fff;
                border: none;
                outline: none;
                border-radius: 2px;
            }
        }
    }
}
</style>

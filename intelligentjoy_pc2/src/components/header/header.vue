<template lang="html">
  <div class="header ">
    <div class="top">
      <div class="centerBox">
        <div class="left">
          <img src="./images/headerMobile@2x.png" alt="">
          <span>{{ $t("title.homeTitle") }}APP</span>
          <div class="qrcode">
            <div class="">
              <img src="./images/qrcode.png" alt="">
              <span>app{{$t('tabBar.6')}}</span>
            </div>
          </div>
        </div>
        <div class='right'>
            <a target='_blank' href='/pr'>{{ $t('header.pr') }}</a>
            <a href="javascript:;" @click="changeLag">
              {{language}}
            </a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="centerBox">
        <div class="left">
          <router-link :to="{ name: 'home' }">
            <img src="./images/logo@2x.png" alt="">
          </router-link>
          <ul>
            <li @click="activeIndex='home'">
              <router-link :to="{ name: 'home', params: {} }" :class="[activeIndex=='home'?'active':'']" >
                {{ $t("tabBar.index") }}
              </router-link>
            </li>
            <li @click="activeIndex='top'">
              <router-link :to="{ name: 'top', params: {} }" :class="[activeIndex=='top'?'active':'']" >
                {{ $t("tabBar.top") }}
              </router-link>
            </li>
            <li @click="activeIndex='column';jumpPosi()">
                <router-link :to="{ name: 'home', params: {} }" :class="[activeIndex=='column'?'active':'']" >
                {{ $t("tabBar.column") }}
              </router-link>
            </li>
            <li @click="activeIndex='course'">
              <router-link :to="{ name: 'course', params: {} }" :class="[activeIndex=='course'?'active':'']" >
                {{ $t("tabBar.course") }}
              </router-link>
            </li>
            <li @click="activeIndex='teacher'">
              <router-link :to="{ name: 'teacher', params: {} }" :class="[activeIndex=='teacher'?'active':'']" >
                {{ $t("tabBar.teacher") }}
              </router-link>
            </li>
            <li @click="activeIndex='rent'">
              <router-link :to="{ name: 'rent', params: {} }" :class="[activeIndex=='rent'?'active':'']" >
                {{ $t("tabBar.rent") }}
              </router-link>
            </li>
            <li @click="activeIndex='news'">
              <router-link :to="{ name: 'news', params: {} }" :class="[activeIndex=='news'?'active':'']" >
                {{ $t("tabBar.information") }}
              </router-link>
            </li>
            <li>
                <a href="/official/">{{ $t("footer.aboutUs") }}</a>
            </li>
          </ul>
        </div>
        <div class="right">
          <div :class="['headerSearch',searchCtr?'searchInputShow':'']" @click.stop='' v-if="false">
            <input v-model="headerSearch" :placeholder="$t('tabBar.9')">
            <a href="javascript:;" @click.stop="searchCtr = true">
              <img src="./images/search@2x.png" alt="" >
            </a>
          </div>
          <div class="noLogin" v-show="!isLogin">
            <span @click="login(1)">{{$t('tabBar.7')}}</span>
            <span @click="login(2)">{{$t('tabBar.8')}}</span>
          </div>
          <div class="headerNews" v-show="isLogin" v-if="false">
            <a href="javascript:;" class="msg">
              <img src="./images/msg@2x.png" alt="">
            </a>
          </div>
          <div class="headerUserCenter" v-show='isLogin'>
            <a href="javascript:;" class="headerPic">
              <img :src="userface" alt="" >
            </a>
            <div class="">
                <ul class="headerDownList">
                <li>
                  <router-link :to="{ name: 'userCenter', params: {} }">
                    {{$t("tabBar.1")}}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'myCourse', params: {} }">
                    {{$t("tabBar.2")}}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'myOrder', params: {} }">
                    {{$t("tabBar.3")}}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'coupons', params: {} }">
                    {{$t("tabBar.4")}}
                  </router-link>
                </li>
                <li>
                  <a href="javascript:;" @click="logout">  {{$t("tabBar.5")}}</a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="centerBoxOut">
        <ul class="centerBox">
          <li>
            <a href="http://www.intelligentjoy.com/official/#/">{{ $t("footer.1") }}</a>
          </li>
          <!-- <li :class="[activeIndex=='aboutUs'?'active':'']">
            <router-link :to="{ name: 'aboutUs', params: {} }">
              {{ $t("footer.aboutUs") }}
            </router-link>
          </li> -->

          <li :class="[activeIndex=='agreement'?'active':'']">
            <router-link :to="{ name: 'agreement', params: {} }">
              {{ $t("footer.agreement") }}
            </router-link>
          </li>
          <li :class="[activeIndex=='statement'?'active':'']">
            <router-link :to="{ name: 'statement', params: {} }">
              {{ $t("footer.statement") }}
            </router-link>
          </li>
          <li :class="[activeIndex=='contact'?'active':'']">
            <router-link :to="{ name: 'contact', params: {} }">
              {{ $t("footer.contact") }}
            </router-link>
          </li>

        </ul>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store/index";
import { delAllCookie } from "../../assets/js/mUtils";
export default {
    name: "myHeader",
    data() {
        return {
            activeIndex: "", //当前路由
            language: localStorage.locale == "zh_cn" ? "繁" : "简",
            headerSearch: "", //搜索字符串
            searchCtr: false,
            userface: require("./images/userHeaderPic@2x.jpg")
        };
    },
    computed: {
        ...mapState(["isLogin"])
    },
    mounted() {
        this.activeIndex = this.$route.name;
        document.querySelector("#app").addEventListener("click", () => {
            //添加关闭搜索框事件
            this.searchCtr = false;
        });

        this.$root.$on("updateTx", data => {
            this.userface = data
                ? data
                : require("./images/userHeaderPic@2x.jpg");
        });
        window.addEventListener("scroll", e => {
            if (
                document.documentElement.scrollTop < 625 &&
                this.$route.name == "home"
            ) {
                this.activeIndex = "home";
            }
        });
    },
    methods: {
        changeLag() {
            if (localStorage.locale == "zh_cn") {
                localStorage.locale = "zh_tw";
            } else {
                localStorage.locale = "zh_cn";
            }
            location.reload();
        },
        login(type) {
            store.commit("loginCtr", {
                display: true,
                to: "",
                type: type //1 登录 2 注册
            });
        },
        logout() {
            delAllCookie();
            this.userface = require("./images/userHeaderPic@2x.jpg");
            localStorage["userface"] = require("./images/userHeaderPic@2x.jpg");
            this.$router.push({ name: "home" });
            store.commit("loginStatusCtr", false);
        },
        jumpPosi() {
            setTimeout(() => {
                let curPosi = document.body.scrollTop,
                    gap = 15,
                    targetH = 625;
                if (timer) clearInterval(timer);
                let timer = setInterval(function () {
                    gap = Math.max(1, gap--);
                    curPosi += gap;
                    window.scrollTo(0, curPosi);
                    if (parseInt(curPosi) >= targetH) {
                        window.scrollTo(0, targetH);
                        clearInterval(timer);
                    }
                }, 6);
            }, 0);
        }
    },
    watch: {
        $route(val) {
            this.activeIndex = val.name;
        }
    }
};
</script>

<style lang="less">
.header {
    background-color: #fff;
    .top {
        border-bottom: 1px solid #ddd;
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            .left {
                display: flex;
                align-items: center;
                position: relative;
                cursor: pointer;
                img {
                    height: 14px;
                    width: 14px;
                    margin-left: -2px;
                    margin-right: 2px;
                }
                span {
                    font-size: 12px;
                    color: #999999;
                }
                .qrcode {
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    > div {
                        position: absolute;
                        background-color: #fff;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        margin-top: 10px;
                        height: 0;
                        width: 100px;
                        height: 0;
                        overflow: hidden;
                        transition: all 0.4s;
                        z-index: 99;
                        img {
                            width: 80px;
                            height: 80px;
                            margin: 0;
                        }
                        span {
                            margin-top: 4px;
                        }
                    }
                }
                &:hover {
                    .qrcode {
                        > div {
                            height: 110px;
                        }
                    }
                }
            }
            .right a {
                font-size: 12px;
                color: #999999;
                margin-right: 10px;
            }
        }
    }
    .bottom {
        > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            .left {
                display: flex;
                align-items: center;
                > a {
                    img {
                        height: 60px;
                        width: 200px;
                        margin-left: -10px;
                        margin-right: 40px;
                    }
                }
                ul {
                    display: flex;
                    li {
                        margin-right: 25px;
                        a {
                            font-size: 20px;
                            color: #333;
                            font-weight: 400;
                            &:hover {
                                color: #63acff;
                            }
                        }
                        .active {
                            color: #63acff;
                        }
                    }
                    li:first-child {
                        margin-right: 33px;
                    }
                }
            }
            .right {
                display: flex;
                .headerSearch {
                    border: 1px solid #fff;
                    border-radius: 4px;
                    padding: 6px;
                    height: 40px;
                    margin-top: 27px;
                    display: flex;
                    align-items: center;
                    margin-right: 18px;
                    margin-bottom: 11px;
                    a {
                        height: 28px;
                        width: 28px;
                        padding-left: 6px;
                    }
                    input {
                        border: none;
                        height: 26px;
                        outline: none;
                        padding: 0;
                        font-size: 14px;
                        width: 0;
                        transition: width 0.4s;
                    }
                }
                .noLogin {
                    height: 80px;
                    display: flex;
                    padding: 0 10px 0 7px;
                    span {
                        font-size: 16px;
                        color: #333;
                        line-height: 16px;
                        height: 16px;
                        margin-top: 40px;
                        cursor: pointer;
                        &:hover {
                            color: #63acff;
                        }
                    }
                    span:first-child {
                        padding-right: 12px;
                        border-right: 1px solid #666;
                    }
                    span:last-child {
                        padding-left: 12px;
                    }
                }
                .searchInputShow {
                    border: 1px solid #ccc;
                    input {
                        width: 160px;
                    }
                }
                .headerNews {
                    padding-top: 33px;
                    margin-right: 24px;
                    .msg {
                        position: relative;
                        &::after {
                            content: "";
                            position: absolute;
                            top: -23px;
                            right: -5px;
                            height: 18px;
                            width: 18px;
                            background-image: url("./images/msgActive@2x.png");
                            background-size: 100% 100%;
                        }
                    }
                }
                .headerUserCenter {
                    width: 60px;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    &:hover {
                        background-color: RGBA(99, 172, 255, 0.1);
                        > div {
                            .headerDownList {
                                height: 200px;
                            }
                        }
                    }
                    .headerPic {
                        display: flex;
                        border-radius: 4px;
                        img {
                            height: 44px;
                            width: 44px;
                            border-radius: 100%;
                            border: 3px solid #c7d9ff;
                            box-sizing: border-box;
                        }
                    }
                    > div {
                        position: absolute;
                        height: 0;
                        width: 140px;
                        bottom: 0;
                        right: 0;
                        z-index: 99;
                        .headerDownList {
                            position: absolute;
                            transition: all 0.4s;
                            background-color: #fff;
                            width: 140px;
                            height: 0;
                            overflow: hidden;
                            li {
                                display: flex;
                                a {
                                    padding-left: 34px;
                                    height: 40px;
                                    width: 100%;
                                    line-height: 40px;
                                    font-size: 14px;
                                    color: #666;
                                    &:hover {
                                        background-color: #63acff;
                                        color: #fffefe;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .centerBoxOut {
        background-color: #e4e4e4;

        .centerBox {
            display: flex;
            align-items: center;
            height: 36px;
            li {
                margin-right: 66px;
                a {
                    font-size: 16px;
                    line-height: 16px;
                    color: #666;
                    &:hover {
                        color: #63acff;
                    }
                }
            }
            .active {
                // color: #70b0fe;
                border-bottom: 1px solid #70b0fe;
                a {
                    color: #70b0fe;
                }
            }
        }
    }
}
</style>

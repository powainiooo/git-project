<template>
    <div class="home">
        <swiper v-if="banner.length" :options="bannerSwiperOption" style="height:500px">
            <swiper-slide v-for="(item,index) in banner" :key="index">
                <a @click="linkTo(item.ad_data)" class="swiperItem">
                    <img :src="item.banner" alt="">
                </a>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 专栏开始 -->
        <div class="centerBox columnOutBox">
            <span class="columnTitle">{{ $t("home.column") }}</span>
            <div class="columnBox">
                <div class="columnLeft column">
                    <swiper v-if="column.length" :options="columnSwiperLeftOption" ref="columnSwiperLeft">
                        <swiper-slide v-for="(item,index) in column " :key="index">
                            <a src="#">
                                <img :src="item.cover">
                            </a>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="columnCenter column">
                    <swiper v-if="column.length" :options="columnSwiperCenterOption" ref="columnSwiperCenter">
                        <swiper-slide v-for="(item,index) in columnCenter" :key="index">
                            <a @click="goColumn(item.id)">
                                <!-- <a :href="'http://'+hostName+'/columnDetail?id='+item.id+'&lang='+lang"> -->
                                <img :src="item.cover">
                            </a>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="columnRight column">
                    <swiper v-if="column.length" :options="columnSwiperLeftOption" ref="columnSwiperRight">
                        <swiper-slide v-for="(item,index) in columnRight" :key="index">
                            <a src="#">
                                <img :src="item.cover">
                            </a>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="column-button-prev" slot="button-prev"></div>
                <div class="column-button-next" slot="button-next"></div>
                <!-- <swiper v-if="banner.length" :options="columnSwiperOption" class="column centerBox center">
                    <swiper-slide v-for="(item,index) in banner" :key="index">
                        <a :src="item.link">
                            <img :src="item.image">
                        </a>
                    </swiper-slide>

                </swiper>
                <swiper v-if="banner.length" :options="columnSwiperOption" class="column centerBox right">
                    <swiper-slide v-for="(item,index) in banner" :key="index">
                        <a :src="item.link">
                            <img :src="item.image">
                        </a>
                    </swiper-slide>

                </swiper> -->
            </div>
        </div>
        <!-- 专栏结束 -->
        <!-- <div class="centerBox title">
            <span>
            {{ $t("home.teacherList") }}
            </span>
            <router-link :to="{ name: 'teacher', params: {} }">
            <span>{{ $t("home.more") }}</span>
            <img src="./images/more@2x.png" alt="">
            </router-link>
        </div> -->
                <!-- <swiper v-if="teachers.length" :options="techerSwiperOption" class="teacherList centerBox">
            <swiper-slide v-for="item in teachers">
                <router-link :to="{ name: 'teacherDetail', query: {id:item.teacherId} }">
                    <img :src="item.poster" alt="">
                    <span>
                    <span>{{item.teacherName}}</span>
                    <span>{{item.description}}</span>
                    </span>
                </router-link>
            </swiper-slide>
                <div class="teacher-prev " slot="button-prev"></div>
                <div class="teacher-next " slot="button-next"></div>

        </swiper> -->
        <div class="centerBox title">
            <span>
                {{ $t("home.course") }}
            </span>
            <router-link :to="{ name: 'course', params: {} }">
                <span>{{ $t("home.more") }}</span>
                <img src="./images/more@2x.png" alt="">
            </router-link>
        </div>
        <div class="centerBox courseList">
            <div class="courseItem" v-for="(item,index) in courseList" :key="index" v-if="index<8">
                <router-link :to="{ name: 'courseDetail', query: {id:item.id} }">
                    <span>
                        <img :src="item.cover" alt="">
                    </span>
                    <div class="">
                        <p>{{item.video_title}}</p>
                        <p>
                            <span v-if="item.t_price!=0">
                                {{item.unit}}
                                <span>{{item.t_price}}</span>
                            </span>
                            <span v-else class="c-r">{{$t('courseDetail.3')}}</span>
                            <span v-if="false">{{item.buy_num}}人在学</span>
                        </p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'courseDetail', query: {id:item.id} }">
                    <p>
                        <span>
                            <img :src="item.teacher_avatar" alt="">
                        </span>
                        <span>{{item.teacher_name}}</span>
                    </p>
                    <span class="t-posi">{{item.teacher_position}}</span>
                </router-link>
            </div>
        </div>
        <div class="centerBox liveAndMsg">
            <div class="live">
                <p>
                    <span>{{ $t("home.liveList") }}</span>
                    <span>{{presenter}}</span>
                </p>
                <ul class="liveList">

                    <li v-for="(item,index) in live.liveList" :key="index">
                        <ul>
                            <li v-for="(itemSon,indexSon) in item.list" :class="[itemSon.video_type==1?'living':'']" :key="indexSon" @click="golive(item.weekDay)">
                                <a href="javascript:;" :class="item.weekDay==todayWeekDay?'clickAcitive':''">
                                    <span class="flag" v-if="indexSon==0">周{{item.weekDay}}</span>
                                    <span v-if="indexSon!=0"></span>
                                    <p>
                                        <span>{{itemSon.time_start}}-{{itemSon.time_end}}</span>
                                        <span class="liveTitle">
                                            <span>{{itemSon.description.split(/\n/)[0]}}</span>
                                            <span>{{itemSon.description.split(/\n/)[1]}}</span>
                                        </span>
                                        <!-- <span>嘉宾：{{itemSon.guest}}</span> -->
                                        <!-- <span></span> -->
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="msg">
                <p>{{ $t("home.newsOnline") }}</p>
                <div class="" @mouseenter="stopNewsSwiper" @mouseleave="startNewsSswiper">
                    <swiper v-if="news.length" :options="newsSwiperOption" class="newsList" ref="newsSwiper">
                        <swiper-slide v-for="(item,index) in news" :key="index">
                            <router-link :to="{ name: 'newsDetail', params: {id: item.id} }">
                                <p>{{item.title}}</p>
                                <span>{{item.dateline | showTime}}</span>
                            </router-link>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <div class="notice" v-if="noticeStatus1||noticeStatus2">
            <el-dialog v-if="teminal=='pc'" :visible.sync="noticeStatus1" class="inviteRegister1">
                <img class="bg" src="./images/notice.png" alt="" @click="goRegister">
            </el-dialog>
            <el-dialog v-if="teminal=='mobile'"  :visible.sync="noticeStatus2" class="inviteRegister2" :lock-scroll="false">
                <img class="bg" src="./images/notice.png" alt="" @click="goRegister">
            </el-dialog>
        </div>
    </div>
</template>

<script>
import "!style-loader!css-loader!swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapState } from "vuex";
import store from "../../store/index";
import { getCookie } from "../../assets/js/mUtils";
export default {
    name: "home",
    data() {
        return {
            bannerSwiperOption: {
                //banner图轮播配置
                slidesPerView: 1, //展示banner数量
                spaceBetween: 0, //banner之间的距离
                loop: true, //循环播放
                pagination: {
                    //分页器
                    el: ".swiper-pagination",
                    clickable: true
                },
                autoplay: {
                    //自动播放
                    delay: 2500,
                    disableOnInteraction: true
                },
                navigation: {
                    //上下页
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            },
            techerSwiperOption: {
                slidesPerView: 5,
                spaceBetween: 0,
                navigation: {
                    //上下页
                    nextEl: ".teacher-next",
                    prevEl: ".teacher-prev"
                }
            },
            newsSwiperOption: {
                direction: "vertical",
                slidesPerView: 5,
                spaceBetween: 0,
                mousewheel: true,
                loop: true, //循环播放
                roundLengths: true,
                autoplay: {
                    //自动播放
                    delay: 2500,
                    disableOnInteraction: false
                }
            },
            columnSwiperCenterOption: {
                //banner图轮播配置
                width: 700,
                slidesPerView: 1, //展示banner数量
                spaceBetween: 0, //banner之间的距离
                loop: true, //循环播放
                navigation: {
                    //上下页
                    nextEl: ".column-button-next",
                    prevEl: ".column-button-prev"
                }
            },
            columnSwiperLeftOption: {
                //banner图轮播配置
                width: 560,
                slidesPerView: 1, //展示banner数量
                spaceBetween: 0, //banner之间的距离
                loop: true, //循环播放
                simulateTouch: false
            },
            columnSwiperRightOption: {
                //banner图轮播配置
                width: 560,
                slidesPerView: 1, //展示banner数量
                spaceBetween: 0, //banner之间的距离
                loop: true, //循环播放
                simulateTouch: false
            },
            banner: [], //轮播图
            teachers: [], //
            column: [],
            columnCenter: [],
            columnRight: [],
            courseList: [],
            live: {},
            news: [],
            presenter: "主持人：Vivian",
            lang: "zh_tw",
            todayWeekDay: "日一二三四五六".charAt(new Date().getDay()),
            hostname: location.host,
            noticeStatus1: false,
            noticeStatus2: false,
            dialogWidth: 0,
            teminal: 'pc'
        }
    },
    filters: {
        columnCenter(val) {
            console.log(val);
        },
        columnRight(val) { },
        showTime(time) {
            time = parseInt(time);
            time = time > 1e12 ? time : time * 1000;
            let date = new Date(time),
                month = date.getMonth() + 1,
                day = date.getDate();
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;

            return month + "-" + day;
        }
    },
    mounted() {
        // console.log(localStorage.locale);
        this.lang = localStorage.locale;
        this.getHome();
        window.onresize = () => {
            return (() => {
                this.setTeminal()
            })()
        }
    },
    created () {
        this.setTeminal()
        if (!getCookie("uid")) {
            if(this.teminal == 'pc'){
                this.noticeStatus1 = true
                this.noticeStatus2 = false
            }else{
                this.noticeStatus1 = false
                this.noticeStatus2 = true
            }
        }
    },
    computed: {
        newsSwiper() {
            //获取资讯列表swiper对象
            return this.$refs.newsSwiper.swiper;
        },
        ...mapState(["login"])
    },
    components: {
        swiper,
        swiperSlide
    },
    methods: {
        linkTo(url) {

            if(url == 'http://m.intelligentjoy.com/redeem'){
                if (url.indexOf('intelligentjoy') != -1) {

                    if(localStorage.getItem("phone") != null && localStorage.getItem("phone") != ""){
                        if (url.indexOf("?") != -1) {
                            url = url + "&phone=" + localStorage.getItem("phone")
                        } else {
                            url = url + "?phone=" + localStorage.getItem("phone");
                        }
                    }else if(localStorage.getItem("email") != null && localStorage.getItem("email") != ""){
                        if (url.indexOf("?") != -1) {
                            url = url + "&mod=email&email=" + localStorage.getItem("email")
                        } else {
                            url = url + "?mod=email&email=" + localStorage.getItem("email");
                        }
                    }
                }
            }

            if (url.indexOf('intelligentjoy') != -1) {
                if (url.indexOf("?") != -1) {
                    url = url + "&lang=" + this.lang;
                } else {
                    url = url + "?lang=" + this.lang;
                }
            }
            location.href = url;
        },
        stopNewsSwiper() {
            //swiper 停止
            this.newsSwiper.autoplay.stop();
        },
        startNewsSswiper() {
            //swiper 开启
            this.newsSwiper.autoplay.start();
        },
        getHome() {
            this.http("get", "common/common/index", {}, data => {
                this.banner = data.banner;
                this.courseList = data.courseList;
                this.column = data.colume;
                this.columnDeal();
                this.live = data.live;
                this.news = data.news;

                this.$nextTick(() => {
                    const columnSwiperLeft = this.$refs.columnSwiperLeft.swiper;
                    const columnSwiperRight = this.$refs.columnSwiperRight
                        .swiper;
                    const columnSwiperCenter = this.$refs.columnSwiperCenter
                        .swiper;

                    columnSwiperCenter.controller.control = [
                        columnSwiperLeft,
                        columnSwiperRight
                    ];
                });
                this.live.liveList.forEach((item, index) => {
                    item.list.forEach(Item => {
                        if (Item.video_type == 1) {
                            this.presenter = item.name;
                        }
                    });
                });
                // this.presenter
            });
            // this.http('get','index.php?app=api&mod=Home&act=getHome',{
            //   place:'app_home'
            // },(data) => {
            //   console.log(data)
            //   this.adList = data.adList
            // })
        },
        columnDeal() {
            let tempColumn = this.column.slice(0);
            tempColumn.push(tempColumn.shift());
            this.columnCenter = tempColumn;

            tempColumn = this.columnCenter.slice(0);
            tempColumn.push(tempColumn.shift());
            this.columnRight = tempColumn;
        },
        golive(week) {
            if (week == this.todayWeekDay) {
                window.open(
                    "http://live.intelligentjoy.com/live/index.html#/"
                );
            }
        },
        goColumn(id) {
            let hostName = ''
            if (location.href.indexOf("www") != -1 || location.href.indexOf("new") != -1) {
                hostName = "http://m.intelligentjoy.com"
            } else {
                hostName = "http://m.test.intelligentjoy.com"
            }
            // let hostName =
            //     location.href.indexOf("www") != -1
            //         ? "http://m.intelligentjoy.com"
            //         : "http://m.test.intelligentjoy.com";
            // alert(hostName + "/columnDetail?id=" + id + "&lang=" + this.lang);
            location.href =
                hostName + "/columnDetail?id=" + id + "&lang=" + this.lang;
        },
        goRegister(){
            let vm = this
            vm.noticeStatus1 = false
            vm.noticeStatus2 = false
            setTimeout(()=>{
                store.commit("loginCtr", {
                    display: true,
                    type: 2
                })
            },500)
            return;
        },
        setTeminal() {
            if (document.body.clientWidth < 1200) {
                this.teminal = 'mobile';
                if(this.noticeStatus1){
                    this.noticeStatus2 = true
                    this.noticeStatus1 = false
                }
            } else {
                this.teminal = 'pc';
                if(this.noticeStatus2){
                    this.noticeStatus2 = false
                    this.noticeStatus1 = true
                }
            }
        }
    }
}
</script>

<style lang="less">
.notice{
    z-index: 99999;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.inviteRegister1{
    .el-dialog{
        width: 560px;
        height: 377px;
        display: flex;
        background: transparent;
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: none;
        .el-dialog__header{
            padding: 0;
            z-index: 999;
            .el-icon-close:before{
                color: #fff;
                font-size: 25px;
                display: none;
            }
        }
        .el-dialog__body{
            flex: 1;
            padding: 0;
            height: 377px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .bg{
                position: absolute;
                top: 0;
                left: 0;
                width:100%;
                height: auto;
                z-index: 1;
            }
        }
    }
}
.inviteRegister2{
    width: 100vw;
    z-index: 99999;
    .el-dialog{
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 4%;
        display: flex;
        background: transparent;
        box-sizing: border-box;
        .el-dialog__header{
            padding: 0;
            z-index: 999;
            .el-icon-close:before{
                color: #fff;
                font-size: 25px;
                display: none;
            }
        }
        .el-dialog__body{
            flex: 1;
            padding: 0;
            margin-top: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .bg{
                width:90%;
                height: auto;
                z-index: 1;
            }
        }
    }
}
.home {
    .swiper-container {
        min-width: 1200px;
        .swiperItem {
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                // min-width: 100%;
            }
        }
        .swiper-button-prev {
            cursor: pointer;
            background-image: url("./images/bannerArrow.png");
            background-size: 100% 100%;
            height: 50px;
            width: 50px;
            left: 0;
            &:hover {
                background-image: url("./images/bannerArrowHover.png");
            }
        }
        .swiper-button-next {
            cursor: pointer;
            transform: rotate(180deg);
            background-image: url("./images/bannerArrow.png");
            background-size: 100% 100%;
            height: 50px;
            width: 50px;
            right: 0;
            &:hover {
                background-image: url("./images/bannerArrowHover.png");
            }
        }
        .swiper-pagination span {
            background: #fff;
            opacity: 0.8;
            &.swiper-pagination-bullet-active {
                width: 16px;
                border-radius: 16px;
                background: #63acff;
            }
        }
    }
    .columnOutBox {
        padding-top: 36px;
        .columnTitle {
            font-size: 18px;
            line-height: 18px;
            color: #333;
        }
        .column-button-next,
        .column-button-prev {
            position: absolute;
            top: 0;
            z-index: 11;
            cursor: pointer;
            height: 100%;
            width: 250px;
            background: url("./images/arrow.png") center no-repeat;
            background-size: 30px auto;
            opacity: 0.5;
            transition: opacity 0.3s;
            &:hover {
                opacity: 1;
            }
        }
        .column-button-next {
            right: 0;
        }
        .column-button-prev {
            transform: rotate(180deg);
            left: 0;
        }
    }

    .columnBox {
        position: relative;
        display: flex;
        justify-content: center;
        position: relative;
        margin-top: 20px;
        .column {
            display: flex;
            a {
                height: 100%;
                width: 100%;
                overflow: hidden;
                display: flex;
                align-items: center;
                // background-color: red;
                img {
                    width: 100%;
                }
            }
        }
        .columnCenter {
            height: 300px;
            width: 700px;
            z-index: 100;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            // background-color: red;
            .swiper-container {
                width: 700px;
                min-width: 700px;
            }
        }
        .columnLeft,
        .columnRight {
            z-index: 9;
            height: 240px;
            width: 560px;
            position: absolute;
            top: 30px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            .swiper-container {
                width: 560px;
                min-width: 560px;
            }
            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.4);
                z-index: 99;
            }
        }
        .columnLeft {
            left: 0;
        }
        .columnRight {
            right: 0;
        }

        // .column {
        //     // height: 300px;
        //     // width: 700px;
        //     background-color: red;
        // }
    }
    .title {
        height: 90px;
        display: flex;
        justify-content: space-between;
        > span {
            font-size: 18px;
            line-height: 18px;
            color: #333;
            margin-top: 48px;
        }
        a {
            margin-top: 60px;
            span {
                font-size: 14px;
                color: #333;
                line-height: 12px;
            }
            img {
                height: 12px;
            }
        }
    }
    .teacherList {
        position: relative;
        .teacher-prev {
            transform: rotate(180deg);
            position: absolute;
            background-image: url("./images/teacherArrow.png");
            background-size: 100% 100%;
            height: 37px;
            width: 28px;
            left: 0;
            top: 50%;
            z-index: 99;
            margin-top: -18px;
            &:hover {
                background-image: url("./images/teacherArrowHover.png");
            }
        }
        .teacher-next {
            position: absolute;
            background-image: url("./images/teacherArrow.png");
            background-size: 100% 100%;
            height: 37px;
            width: 28px;
            right: 0;
            top: 50%;
            z-index: 99;
            margin-top: -18px;
            &:hover {
                background-image: url("./images/teacherArrowHover.png");
            }
        }
        a {
            position: relative;
            > img {
                display: block;
                height: 240px;
            }
            > span {
                position: absolute;
                height: 70px;
                width: 240px;
                bottom: -70px;
                left: 0;
                padding-left: 10px;
                background-image: url("./images/mask@2x.png");
                background-size: 100% 100%;
                display: flex;
                align-items: flex-end;
                padding-bottom: 10px;
                transition: all 0.6s;
                > span:first-child {
                    width: 75px;
                    color: #fff;
                    font-size: 18px;
                }
                > span:last-child {
                    width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        a:hover {
            > span {
                bottom: 0;
            }
        }
    }
    .courseList {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .courseItem {
            display: flex;
            flex-direction: column;
            width: 280px;
            margin-bottom: 26px;
            border-radius: 6px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0 2px 5px RGBA(43, 63, 90, 0.1);
            transition: all 0.4s;

            &:hover {
                box-shadow: 0 2px 9px RGBA(43, 63, 90, 0.4);
            }
            a:first-child {
                display: flex;
                flex-direction: column;
                > span {
                    height: 150px;
                    width: 280px;
                    overflow: hidden;
                    img {
                        border-top-left-radius: 6px;
                        border-top-left-radius: 6px;
                        width: 100%;
                    }
                }

                div {
                    height: 77px;
                    border-bottom: 1px solid #ddd;
                    padding: 15px 10px 18px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p:first-child {
                        font-size: 16px;
                        color: #333;
                        line-height: 16px;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        &:hover {
                            color: #fc583d;
                        }
                    }
                    p:last-child {
                        width: 100%;

                        display: flex;
                        justify-content: space-between;
                        span:first-child {
                            font-size: 14px;
                            // width: 100px;
                            display: flex;
                            color: #fc583d;
                            height: 18px;
                            display: flex;
                            align-items: center;
                            span {
                                font-size: 18px;
                                line-height: 18px;
                                color: #fc583d;
                                margin-left: 2px;
                            }
                            &.c-r {
                                font-size: 16px;
                                line-height: 16px;
                                color: #fc583d;
                            }
                        }
                        span:last-child {
                            font-size: 14px;
                            line-height: 14px;
                            height: 14px;
                            color: #666;
                        }
                    }
                }
            }
            a:last-child {
                height: 50px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 2px 0 10px;
                span {
                    font-size: 14px;
                    color: #666;
                }
                > span {
                    margin-top: 3px;
                    font-size: 12px;
                }
                p {
                    display: flex;
                    span:first-child {
                        height: 20px;
                        width: 20px;
                        margin-right: 5px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                        }
                    }
                }
            }
        }
    }
    .liveAndMsg {
        display: flex;
        justify-content: space-between;
        margin-bottom: 70px;
        margin-top: 24px;
        .live {
            height: 300px;
            width: 585px;
            background-color: #fff;
            border-radius: 4px;
            overflow: hidden;
            > p {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 50px;
                border-bottom: 1px solid #dedede;
                padding: 0 18px 0 14px;
                span:first-child {
                    font-size: 18px;
                    color: #333;
                }
                span:last-child {
                    font-size: 16px;
                    color: #333;
                }
            }
            .liveList {
                // display: flex;
                // padding-left: 64px;
                height: 250px;
                position: relative;
                display: flex;
                flex-direction: column;
                &::before {
                    position: absolute;
                    content: "";
                    top: 0;
                    left: 0;
                    left: 36px;
                    border-right: 1px dashed #dedede;
                    height: 100%;
                }
                li {
                    ul {
                        li {
                            height: 50px;
                            width: 100%;
                            a {
                                // height: 50px;
                                height: 100%;
                                width: 100%;
                                display: block;
                                padding-left: 64px;
                                display: flex;
                                align-items: center;
                                font-size: 16px;
                                color: #999;
                                cursor: default;
                                > span {
                                    margin-right: 60px;
                                    width: 32px;
                                    position: relative;
                                }
                                .flag::before {
                                    content: "";
                                    position: absolute;
                                    height: 9px;
                                    width: 9px;
                                    border-radius: 50%;
                                    background-color: #e1e1e1;
                                    top: 5px;
                                    left: -32px;
                                }
                                p {
                                    flex: 1;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    padding-right: 20px;

                                    .liveTitle {
                                        color: #333;
                                        width: 260px;
                                        display: flex;
                                        flex-direction: column;
                                        & > span {
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            &:first-child {
                                                font-size: 16px;
                                            }
                                            &:last-child {
                                                font-size: 14px;
                                                color: #777;
                                            }
                                        }
                                    }
                                }
                            }
                            a:hover {
                                background-color: RGBA(99, 172, 255, 0.1);
                            }
                            .clickAcitive {
                                cursor: pointer;
                                span {
                                    color: #63acff !important;
                                }
                            }
                        }
                        .living {
                            a {
                                &::before {
                                    content: "";
                                    position: absolute;
                                    height: 18px;
                                    width: 18px;
                                    background-image: url("./images/living.png");
                                    background-size: 100% 100%;
                                    background-repeat: no-repeat;
                                    left: 26px;
                                }
                                > span {
                                    color: #63acff;
                                    &::before {
                                        display: none;
                                    }
                                }
                                p {
                                    span {
                                        color: #63acff;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .msg {
            height: 300px;
            width: 590px;
            background-color: #fff;
            border-radius: 4px;
            position: relative;
            > p {
                display: flex;
                align-items: center;
                height: 50px;
                border-bottom: 1px solid #dedede;
                padding: 0 18px 0 14px;
                color: #333;
                span {
                    font-size: 18px;
                    color: #333;
                }
            }

            .newsList {
                height: 250px;
                width: 590px;
                min-width: 590px;
                a {
                    height: 50px;
                    display: block;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 30px 0 48px;
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        height: 5px;
                        width: 5px;
                        border-radius: 50%;
                        background-color: #333;
                        left: 31px;
                        top: 22px;
                    }
                    p {
                        color: #666;
                        font-size: 16px;
                        width: 400px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    span {
                        font-size: 14px;
                        color: #999;
                        letter-spacing: 1px;
                    }
                }
                a:hover {
                    &::before {
                        background-color: #63acff;
                    }
                    p {
                        color: #63acff;
                    }
                    span {
                        color: #63acff;
                    }
                }
            }
        }
    }
}
</style>

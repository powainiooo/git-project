<template lang="html">
  <div id="player">
    <div class="playerHeader">
      <div class="left">
        <span class="back" @click="back()">
          <img src="./images/arrow.png" alt="">
        </span>
        <span class="tilte">{{courseInfo.video_title}}</span>
        <!-- <span class="subbTitle">{{indexActive+1}}-{{IndexActive+1}} {{list[indexActive].list[IndexActive].title}}</span> -->
        <span class="subbTitle">{{curTxt.split(" ")[0]}}</span>
      </div>
      <div class="right">
        <span>
          <img :src="userFace" alt="">
        </span>
      </div>

    </div>
    <div class="playerBox" v-if="playerCtr">
        <!--视频区-->
    <video-player v-show="currentData.lesson_mode == '0' || endBoxCtr" id="HYplayer"  class="vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @ready="playerReadied"
          @statechanged="playerStateChanged($event)">
      </video-player>
        <!--图文区-->
        <div class="article-box" v-if="currentData.lesson_mode == '1'">
            <div class="contents" v-html="currentData.imgtext_simplified" v-show="isSample"></div>
            <div class="contents" v-html="currentData.imgtext_complex" v-show="!isSample"></div>
            <div class="tools" v-if="!playAudio">
                <div class="btns">
                    <a href="javscript:;" :class="{'active':!isSample}" @click="isSample=false">繁体</a>
                    <a href="javscript:;" :class="{'active':isSample}" @click="isSample=true">简体</a>
                </div>
                <ul class="infos">
<!--                    <li @click="playAudio = true">-->
<!--                        <img src="./images/icon_voice.png"/>-->
<!--                        <span>语音</span>-->
<!--                    </li>-->
                    <li @click="$store.commit('qrCtr', {'title':$t('popTitle.1'),'show':true})">
                        <img src="./images/icon_pinlun.png"/>
                        <span>{{courseInfo.video_comment_count}}</span>
                    </li>
                    <li @click="thumbLike">
                        <img src="./images/icon_like.png"/>
                        <span>{{currentData.likes_num}}</span>
                    </li>
                </ul>
            </div>
            <z-audio :src="isSample ? currentData.voice_mandarin : currentData.voice_cantonese"
                     v-if="playAudio"
                     @onout="playAudio = false"
                     @onprev="gotoPrev"
                     @onnext="gotoNext"></z-audio>
        </div>
      <div class="endBox" v-show="endBoxCtr">
        <span class="nextTitle">下一个课程的标题</span>
        <router-link class="nextLink" :to="{ name: '', params: {} }">
          下一节
        </router-link>
        <a href="#" class="rePlay">
          重新观看
        </a>
      </div>
      <div :class="['list',listShow?'show':'']">
        <span class="sildeBtn" @click="listShow = !listShow"></span>
        <div class="listBox">
            <div class="courseTitle">
                <p>{{courseInfo.video_title}}</p>
                <button @click="topGoPlayer" v-if="!courseInfo.is_pay">购买</button>
            </div>

          <ul class="p-list-cont">
            <li v-for="(item,index) in courseInfo.course_list" @click="tapFirst(index)" :key="index" v-if="item.is_free==1||item.is_buy==1">
                <div class="p-item">
                    <div class="left" :class="{'arrow':item.zy_video_section_id, 'arrow-active':index === indexActive}">
                      <span>{{item.title}}</span>
                    </div>
                    <div class="right" v-if="index==indexActive">
                        <span>学习中</span>
                      <img src="./images/clock.png" alt="">
                    </div>
                </div>
                <ul class="p-list-cont-l2" v-if="secondList.length !==0 && index == indexActive">
                    <li class="p-item" v-for="(child, index2) in secondList" :key="index2" @click="tapSecond(index2)">
                        <div class="left">
                            <img src="./images/icon_picture2.png"/>
                            <span :class="{active:child.zy_video_section_id===secondActiveId}">{{child.title}}</span>
                        </div>
                        <div class="right">
                            <span style="color: #ED612E" v-if="child.is_buy !== 1 && child.is_free === 1">试看</span>
                            <img src="./images/icon_lock.png" v-if="child.is_buy == 0"/>
                        </div>
                    </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zh_CN from "../../i18n/video-zh-CN.json";
import "video.js/dist/video-js.min.css";
require("!style-loader!css-loader!less-loader!../../assets/less/HYPlayer.less");
import { videoPlayer } from "vue-video-player";
require("./plugins/videojs-resolution-switcher");
import videojs from "video.js";
window.videojs = videojs;
require("videojs-contrib-hls/dist/videojs-contrib-hls");
import zAudio from "./zAudio.vue";

export default {
    name: "player",
    data() {
        return {
            playerCtr: false,
            listShow: true,
            endBoxCtr: false,
            playerOptions: {
                autoplay: true,
                loop: false,
                muted: false,
                language: "zh_CN",
                languages: {
                    zh_CN: zh_CN
                },
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                controls: true,
                sources: [
                    // {
                    //   withCredentials: false,
                    //   type: "application/x-mpegURL",
                    //  src: "http://vjs.zencdn.net/v/oceans.webm"
                    // }
                    // {
                    //     withCredentials: false,
                    //     type: "video/mp4",
                    //     src: ""
                    // }
                ],
                flash: { hls: { withCredentials: false } },
                html5: { hls: { withCredentials: false } },
                // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
                plugins: {
                    videoJsResolutionSwitcher: {
                        default: "low", // Default resolution [{Number}, 'low', 'high'],
                        dynamicLabel: true // Display dynamic labels or gear symbol
                    }
                },
                notSupportedMessage: "此视频暂无法播放，请稍后再试"
            },
            courseId: this.$route.query.courseId,
            userFace: localStorage["userface"],
            indexActive: this.$route.query.index,
            list: [],
            courseInfo: {},
            curTxt: "",
            secondActiveIndex: 0,
            secondActiveId: 0,
            secondList: [],
            isSample: false, // 是否为简体,
            currentData: {}, // 选中的展示数据,
            playAudio: false, // 是否播放声音
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        }
    },
    components: {
        videoPlayer,
        zAudio
    },
    mounted() {
        this.indexActive = Number(this.$route.query.index);
        this.IndexActive = Number(this.$route.query.Index);
        document.querySelector("body").addEventListener("keyup", e => {
            this.keyupCtr(e);
        });
        this.getData();
        // this.getUrl()
        // setTimeout(() => {
        //     // this.playerOptions.sources[0].src = "https://preview-video.oss-cn-shanghai.aliyuncs.com/Act-HLS-Encryption/003baf9be0fc4aa1a7169b6ebb47eab5/test.m3u8"
        //     this.playerCtr = true;
        //     // console.log(this.player)
        // }, 1);
    },
    methods: {
        // listen event
        onPlayerPlay(player) {
            // console.log("player play!", player);
        },
        onPlayerPause(player) {
            // console.log("player pause!", player);
        },
        onPlayerEnded(player) {
            // console.log("player ended!", player);
        },
        onPlayerLoadeddata(player) {
            // console.log("player Loadeddata!", player);
            // console.log(1111)
        },
        onPlayerWaiting(player) {
            // console.log("player Waiting!", player);
            // console.log(222)
        },
        onPlayerPlaying(player) {
            // console.log("player Playing!", player);
            // console.log(333)
        },
        onPlayerTimeupdate(player) {
            // console.log("player Timeupdate!", player);
            // console.log(444)
        },
        onPlayerCanplay(player) {
            // console.log("player Canplay!", player);
            // console.log(555)
        },
        onPlayerCanplaythrough(player) {
            // console.log("player Canplaythrough!", player);
            // console.log(666)
        },
        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log("player current update state", playerCurrentState);
            // console.log(777)
        },
        // player is ready
        playerReadied() {
            // alert(1111);
            //   var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
            // player.tech_.hls.xhr.beforeRequest = function(options) {
            //   // console.log(options)
            //   return options
            // }
            // this.getUrl();
            this.getData();
        },
        keyupCtr(e) {
            console.log(this.player.currentTime());
            console.log(this.player.duration());
            switch (e.keyCode) {
                case 32: //空格
                    if (this.player.paused()) {
                        //暂停
                        this.player.play();
                    } else {
                        //播放
                        this.player.pause();
                    }
                    break;
                case 38: //上
                    if (this.player.volume() < 1) {
                        this.player.volume(this.player.volume() + 0.2);
                    }
                    break;
                case 40: //下
                    if (this.player.volume() > 0) {
                        this.player.volume(this.player.volume() - 0.2);
                    }
                    break;
                case 37: //左
                    if (this.player.currentTime() - 15 > 0) {
                        this.player.currentTime(this.player.currentTime() - 15);
                    } else {
                        this.player.currentTime(0);
                    }
                    break;
                case 39: //右
                    if (
                        this.player.duration() - this.player.currentTime() >
                        15
                    ) {
                        this.player.currentTime(this.player.currentTime() + 15);
                    } else {
                        this.player.currentTime(this.player.duration());
                    }
                    break;
            }
        },
        // getUrl() {
        //     let that = this;
        //     //创建XMLHttpRequest对象
        //     var xhr = new XMLHttpRequest();
        //     //配置请求方式、请求地址以及是否同步
        //     xhr.open("POST", "http://192.168.1.239/test/test2.php", true);
        //     //设置请求结果类型为blob
        //     xhr.responseType = "blob";
        //     //请求成功回调函数
        //     xhr.onload = function() {
        //         if (this.status == 200) {
        //             //请求成功
        //             //获取blob对象
        //             var blob = this.response;
        //             //获取blob对象地址，并把值赋给容器
        //             // that.playerOptions.sources[0].type = "video/m3u8"
        //             // that.playerOptions.sources[0].type = "video/m3u8"
        //             that.playerOptions.sources[0].src = blob;
        //             that.playerCtr = true;
        //             // console.log(this.player)
        //             //   that.player.updateSrc([
        //             //   {
        //             //     src: blob,
        //             //     type: 'video/m3u8',
        //             //     label: '标清',
        //             //     res: 360
        //             //   },
        //             //   {
        //             //     src: blob,
        //             //     type: 'video/m3u8',
        //             //     label: '高清',
        //             //     res: 720
        //             //   }
        //             // ])
        //             // that.playerCtr = true
        //             // player.on('resolutionchange', function(){
        //             //   // console.log('切换源了')
        //             //
        //             // })
        //         }
        //     };
        //     xhr.send();
        // },
        getData() {
            this.http("get", "common/common/courseDetails", {id: this.courseId}, data => {
                const firstData = data.course_list[this.indexActive]
                this.curTxt = firstData.title;
                document.title = this.curTxt;
                this.courseInfo = data;
                this.playerCtr = true;
                if (firstData.lesson_mode == '0') {
                    this.switchSource(firstData)
                } else if (firstData.lesson_mode == '1') {
                    if (firstData.is_child == 1) {
                        this.getSecondData(firstData.zy_video_section_id, () => {
                            this.secondActiveId = this.secondList[0].zy_video_section_id
                            this.switchSource(this.secondList[0])
                        })
                    } else {
                        this.switchSource(firstData)
                    }
                }
                this.$nextTick(() => {
                    document.querySelector(
                        ".playerBox"
                    ).oncontextmenu = function(e) {
                        return false;
                    };
                });
            });
        },
        switchSource(data) {
            console.log(data)
            document.title = data.title;
            if (data.lesson_mode == '0') { // 视频
                if ( data.video_type.split("/").length == 2) {
                    this.player.updateSrc([
                        {
                            src: data.cantonese,
                            type: "video/mp4",
                            label: "粤语",
                            res: 360
                        },
                        {
                            src: data.mandarin,
                            type: "video/mp4",
                            label: "国语",
                            res: 720
                        }
                    ]);
                } else if ( data.video_type == "粤" ) {
                    this.player.updateSrc([
                        {
                            src: data.cantonese,
                            type: "video/mp4",
                            label: "粤语",
                            res: 360
                        }
                    ]);
                } else {
                    this.player.updateSrc([
                        {
                            src: data.mandarin,
                            type: "video/mp4",
                            label: "国语",
                            res: 720
                        }
                    ]);
                }
            }
            this.currentData = data

            // this.$router.replace({
            //     name: "player",
            //     query: {
            //         courseId: this.courseId,
            //         index: index
            //     }
            // });
        },
        tapFirst (index, secondIndex=null) {
            if (index === this.indexActive) return
            let item = this.courseInfo.course_list[index]
            if (item.lesson_mode == '0') {
                this.switchSource(item)
            } else if (item.lesson_mode == '1') {
                if (item.is_child == 1) { // 有二级数据
                    this.getSecondData(item.zy_video_section_id, () => {
                        this.indexActive = index
                        if (secondIndex !== null) {
                            secondIndex = secondIndex === 'last' ? this.secondList.length - 1 : secondIndex
                            this.tapSecond(secondIndex)
                        }
                    })
                } else {
                    this.switchSource(item)
                }
            }
        },
        tapSecond (index) {
            if (index === this.secondActiveIndex) return
            this.secondActiveIndex = index
            let item = this.secondList[index]
            if (item.is_buy == 0 || item.is_free == 1) return
            this.secondActiveId = item.zy_video_section_id
            this.switchSource(item)
        },
        getSecondData (id, func = () => {}) {
            this.http("get", "common/common/sectionDetails", {id}, data  => {
                this.secondList = data.course_list
                func(data)
            });
        },
        thumbLike () {
            const cid = this.courseInfo.id
            const sid = this.currentData.zy_video_section_id
            const type = this.currentData.is_like === 0 ? 1 : 0
            const likeNum = Number(this.currentData.likes_num)
            this.http("get", "course/course/addLikes", {cid, sid, type}, data  => {
                if (type === 1) {
                    this.currentData.likes_num = likeNum + 1
                } else if (type === 0) {
                    this.currentData.likes_num = likeNum - 1
                }
                this.currentData.is_like = type
            });
        },
        back() {
            this.$router.go(-1); //返回上一层
        },
        topGoPlayer() {
            this.$router.push({
                name: "comfireOrder",
                query: {
                    courseId: this.$route.query.courseId
                }
            });
        },
        gotoPrev () {
            if (this.secondActiveIndex === 0) {
                if (this.indexActive === 0) {
                    this.$message({
                        type: "warning",
                        message: "前面没有了"
                    });
                } else {
                    this.tapFirst(this.indexActive - 1, 'last')
                }
            } else {
                this.tapSecond(this.secondActiveIndex - 1)
            }
        },
        gotoNext () {
            if (this.secondActiveIndex === this.secondList.length - 1) {
                if (this.indexActive === this.courseInfo.course_list.length - 1) {
                    this.$message({
                        type: "warning",
                        message: "后面没有了"
                    });
                } else {
                    this.tapFirst(this.indexActive + 1, 0)
                }
            } else {
                this.tapSecond(this.secondActiveIndex + 1)
            }
        }
    }
};
</script>

<style lang="less">
#app {
    min-width: 800px;
}
#player {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    .playerHeader {
        height: 72px;
        width: 100%;
        background-color: #1c1f21;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .left {
            .back {
                margin-right: 10px;
                cursor: pointer;
                img {
                    height: 16px;
                    width: 16px;
                }
            }
            span {
                color: #ccc;
            }
            .tilte {
                font-size: 18px;
                margin-right: 10px;
            }
            .subbTitle {
                font-size: 12px;
            }
        }
        .right {
            img {
                border-radius: 50%;
                height: 32px;
                width: 32px;
            }
        }
    }
    .playerBox {
        background-color: #000;
        display: flex;
        align-items: center;
        position: relative;
        height: ~"calc(100vh - 72px)";
        // height: ~"calc(100%)";
        overflow: hidden;
        .vjs-custom-skin {
            width: 100%;
            // height: calc( 100vh - 72px);
            height: 100%;
            position: relative;
        }
        .endBox {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .nextTitle {
                font-size: 16px;
                color: #fff;
            }
            .nextLink {
                margin: 40px 0 20px 0;
                height: 38px;
                width: 138px;
                background-color: #17823b;
                font-size: 12px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .rePlay {
                width: 80px;
                height: 26px;
                font-size: 12px;
                color: #787d82;
                line-height: 26px;
                padding-left: 24px;
                background-image: url("./images/replay.png");
                background-repeat: no-repeat;
                background-size: 16px 16px;
                background-position: 4px center;
                &:hover {
                    background-image: url("./images/replayActive.png");
                    color: #f01400;
                }
            }
        }
        .article-box {
            width: 100%;
            height: 100%;
            position: relative;
            background-color: #E4D0AF;
            .contents {
                width: 100%;
                height: 100%;
                overflow-y: auto;
                padding: 30px 30px 100px 30px;
                &::-webkit-scrollbar {
                    width: 12px;
                    background-color: #E4D0AF;
                }
                &::-webkit-scrollbar-thumb {
                    width: 12px;
                    border-radius: 12px;
                    background-color: #B18F73;
                }
            }
            .tools {
                width: 100%;
                height: 70px;
                background-color: rgba(0, 0, 0, 0.8);
                position: absolute;
                left: 0;
                bottom: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btns {
                    margin-left: 40px;
                    display: flex;
                    a {
                        width: 55px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #ffffff;
                        font-size: 12px;
                        color: #ffffff;
                        border-radius: 3px;
                        margin-right: 20px;
                    }
                    .active {
                        color: #333333;
                        background-color: #ffffff;
                    }
                }
                .infos {
                    margin-right: 40px;
                    display: flex;
                    align-items: center;
                    li {
                        font-size: 14px;
                        color: #ffffff;
                        margin-left: 30px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                    }
                }
            }
        }
        .list {
            border-top: 2px solid #111;
            right: 0;
            margin-right: -360px;
            height: 100%;
            width: 340px;
            position: relative;
            transition: all 0.4s;
            background-color: #1c1f21;
            padding-left: 30px;
            padding-top: 20px;
            .sildeBtn {
                position: absolute;
                width: 15px;
                height: 66px;
                background-color: #1c1f21;
                // background-color: red;
                left: -15px;
                cursor: pointer;
                z-index: 99999;
                margin-top: ((100vh - 120px) /2 + 33px);
                background-image: url("./images/left.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 14px 14px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }
            .listBox {
                width: 340px;
                height: 100%;
                overflow-y: scroll;
                .p-list-cont {
                    .p-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 0 10px 10px;
                        cursor: pointer;
                        color: rgba(255, 255, 255, 0.6);
                        &:hover {
                            color: #00b33b;
                        }
                        .left {
                            margin-right: 10px;
                            padding-left: 20px;
                            width: 210px;
                            background:  left center no-repeat;
                            background-size: 14px;
                            span {
                                font-size: 13px;
                            }
                        }
                        .arrow {
                            background-image: url("./images/sanjiao.png");
                        }
                        .arrow-active {
                            background-image: url("./images/sanjiaoActive.png");
                        }
                        .right {
                            display: flex;
                            align-items: center;
                            span {
                                margin-right: 6px;
                                font-size: 12px;
                                color: #00b33b;
                            }
                            img {
                                width: 14px;
                                height: 14px;
                            }
                        }
                    }
                    .p-list-cont-l2 {
                        .p-item {
                            padding: 4px 0 4px 10px;
                            span.active {
                                color: #00b33b;
                            }
                        }
                    }
                }
                .courseTitle {
                    font-size: 16px;
                    color: #b5b9bc;
                    display: flex;
                    justify-content: space-between;
                    button {
                        width: 50px;
                        height: 24px;
                        border: none;
                        border-radius: 5px;
                        background-color: #3E84E0;
                        font-size: 12px;
                        color: #ffffff;
                        margin-right: 30px;
                    }
                }
                ul {
                    padding-right: 30px;
                    padding-top: 4px;
                    padding-bottom: 16px;
                    a,
                    h3 {
                        color: #b5b9bc;
                    }
                    li {
                        h3 {
                            font-size: 14px;
                            font-weight: normal;
                        }
                    }
                    .item {
                        cursor: pointer;
                        margin-top: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        span {
                            font-size: 12px;
                            color: rgba(255, 255, 255, 0.6);
                        }
                        .left {
                            padding-left: 36px;
                            background-image: url("./images/sanjiao.png");
                            background-repeat: no-repeat;
                            background-size: 14px 14px;
                            background-position: 20px center;
                        }
                        .right {
                            display: flex;
                            align-items: center;
                            img {
                                height: 14px;
                            }
                            span {
                                color: #00b33b;
                                margin-right: 10px;
                            }
                        }
                        // a {
                        //     display: flex;
                        //     justify-content: space-between;
                        //     align-items: center;
                        //     span {
                        //         font-size: 12px;
                        //     }
                        //     .left {
                        //         padding-left: 36px;
                        //         background-image: url("./images/sanjiao.png");
                        //         background-repeat: no-repeat;
                        //         background-size: 14px 14px;
                        //         background-position: 20px center;
                        //     }
                        //     .right {
                        //         display: flex;
                        //         align-items: center;
                        //         img {
                        //             height: 14px;
                        //         }
                        //         span {
                        //             color: #00b33b;
                        //             margin-right: 10px;
                        //         }
                        //     }
                        // }
                        &:hover {
                            span {
                                color: #00b33b;
                            }
                            .left {
                                background-image: url("./images/sanjiaoActive.png");
                            }
                            // a {
                            //     span {
                            //         color: #00b33b;
                            //     }
                            //     .left {
                            //         background-image: url("./images/sanjiaoActive.png");
                            //     }
                            // }
                        }
                    }
                }
            }
        }
        .show {
            margin-right: 0;
            .sildeBtn {
                background-image: url("./images/right.png");
            }
        }
    }
}
</style>

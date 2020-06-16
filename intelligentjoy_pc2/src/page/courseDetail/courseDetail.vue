<template lang="html">
  <div class="courseDetail" v-if="pageCtr">
    <div class="header">
      <div class="centerBox">
        <p>
          <span>{{ $t("courseDetail.1") }}></span>
          <span>{{courseInfo.video_title}}</span>
        </p>
        <div class="courseInfo">
          <img :src="courseInfo.pc_cover" alt="">
          <div class="right">
            <p class="courseTitle">
            <span>{{courseInfo.video_title}}</span>
              <img src="./images/iconTime.png" alt="">
            </p>
            <p class="price">
              <span class="left">
                <span class="p-title" v-if="courseInfo.t_price!=0">{{ $t("courseDetail.2") }}</span>
                <span v-if="courseInfo.t_price!=0">HK${{courseInfo.t_price}}</span>
                <span v-if="courseInfo.t_price==0">{{ $t("courseDetail.3") }}</span>
                <span>HK${{courseInfo.v_price}}</span>
              </span>
              <span class="right">{{courseInfo.video_order_count}}{{ $t("courseDetail.4") }}</span>
            </p>
            <p class="star">
              <span v-for="item in videoScore">
                <img src="./images/star.png" alt="">
              </span>
            </p>
            <p class="teacher">
              {{ $t("courseDetail.5") }}：{{courseInfo.teacher_name}}
            </p>
            <div class="bottom">
              <div class="left">
                <a href="javascript:;" @click="topGoPlayer()">{{courseInfo.is_pay? $t("courseDetail.9") : $t("courseDetail.10") }}</a>
                <router-link :to="{ name: 'player', query: {courseId:id,index:0} }" v-if="courseInfo.t_price != 0 && !courseInfo.is_pay">{{ $t("courseDetail.13") }}</router-link>
              </div>
              <div class="right">
                <span>
                  <img :src="[isCollect?require('./images/star.png'):require('./images/unstar.png')]" @click="canSubmit?collect(!isCollect):''" alt="">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content centerBox">
      <div class="left">
        <div :class="['tab',tabIndexClass]">
          <a href="javascript:;" @click="tab(1)" :class="[courseType==1?'active':'']">
            {{ $t("courseDetail.6") }}
          </a>
          <a href="javascript:;" @click="tab(2)" :class="[courseType==2?'active':'']">
            {{ $t("courseDetail.7") }}
          </a>
          <a href="javascript:;" @click="$store.commit('qrCtr', {'title':$t('popTitle.1'),'show':true});" :class="[courseType==3?'active':'']">
            {{ $t("courseDetail.8") }}
          </a>
        </div>
        <div class="courseIntro" v-show="courseType==1">
          <img :src="item.img" :width="item.width/1.6" v-for="item in courseInfo.app_vdieo_content_img" v-if="$i18n.locale == 'zh_tw'" />
          <img :src="item.img" :width="item.width/1.6" v-for="item in courseInfo.app_vdieo_content_img_simplified" v-if="$i18n.locale == 'zh_cn'" />
        </div>
        <div class="courseMeun" v-if="courseType==2">
          <ul>
            <li v-for="(item,index) in courseInfo.course_list" class="c-item" @mouseenter="hoverindex = index" @mouseleave="hoverindex == -1">
              <div>
                <span class="left">
                  <img src="./images/iconMeun.png" class="i-tag" alt="">
                  <span>{{item.title}}</span>
                  <img src="./images/free.png" class="i-tag-free" alt="" v-if="item.is_free==1">
                </span>
                <span class="right">
                  <button href="javascript:;" @click="goPlayer(item.is_free, index, item.is_buy)" v-show="item.is_last_view" class="redBGC">{{ $t("courseDetail.11") }}</button>
                  <button href="javascript:;" @click="goPlayer(item.is_free, index, item.is_buy)" v-show="!item.is_last_view" class="redBGC">{{ $t("courseDetail.12") }}</button>
                </span>
              </div>
            </li>
          </ul>
          <!-- <ul>
            <li v-for="(item,index) in courseList" class="outItem">
              <p>
                <img src="./images/iconMeun.png" alt="">
                <span>{{item.chapterTitle}}</span>
              </p>
              <ul :class="borderTopIndex==index?'':'border'">
                <li v-for="(Item,Index) in item.list" class="inItem" @mouseenter="mouseIn(index,Index)" @mouseleave="mouseOut(index,Index)">
                  <div :class="hoverindex==index&&hoverIndex-1==Index?'nonBorder':''" >
                    <span class="left">
                      <span>{{Item.title}}</span>
                      <img src="./images/free.png" alt="" v-if="Item.isFree==1">
                    </span>
                    <span class="right">
                      <img src="./images/play.png" alt="">
                      <span class="time">{{Item.duration}}</span>
                      <button href="javascript:;" @click="goPlayer(Item.isFree,Item.id,index,Index)" v-show="hoverIndex==Index&&hoverindex==index&&Item.status==2">我要复习</button>
                      <button href="javascript:;" @click="goPlayer(Item.isFree,Item.id,index,Index)" v-show="Item.status==3" class="redBGC">继续学习</button>
                      <button href="javascript:;" @click="goPlayer(Item.isFree,Item.id,index,Index)" v-show="hoverIndex==Index&&hoverindex==index&&Item.status==1" class="redBGC">开始学习</button>
                      <span class="percent" v-show="(hoverIndex!=Index||hoverindex!=index)&&Item.status!=3">{{Item.status==1?'0%':'100%'}}</span>
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ul> -->
        </div>
        <div class="evaluation" v-if="courseType==3">
          <div class="addEvaluation">
            <p>给课程评分:</p>
            <el-rate v-model="rateLevel" @change="rateChange"></el-rate>
            <div class="textArea" v-if="textCtr">
              <textarea v-model="evaluationText"></textarea>
              <span>{{textLength}}/150</span>
              <p>
                <span @click="textCtr=false">取消</span>
                <button type="button" name="button">提交评论</button>
              </p>
            </div>
          </div>
          <p>评价（<span>{{evaluationCount}}</span>）</p>
          <ul>
            <li v-for="item in evaluationList">
              <div class="left">
                <span>
                  <img :src="item.userInfo.headPic" alt="">
                  <span>{{item.userInfo.name}}</span>
                </span>
                <div class="">
                  <p>
                    <span v-for="(item,index) in parseInt(item.score)">
                      <img src="./images/star.png" alt="">
                    </span>
                  </p>
                  <p>{{item.content}}</p>
                </div>
              </div>
              <span class="right">
                <span>{{item.strtime}}</span>
                <span>
                  <img src="./images/zan@2x.png" alt="" v-if="item.isLike">
                  <img src="./images/zaned@2x.png" alt="" v-if="!item.isLike">
                  {{item.likeCount}}
                </span>
              </span>
            </li>
          </ul>
          <el-pagination
          background
          layout="pager"
          @current-change="getEvaluate"
          :total="evaluationCount">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <p>{{ $t("courseDetail.14") }}簡介</p>
        <div class="teacherInfo">
          <img :src="courseInfo.teacher_avatar" alt="">
          <span>{{courseInfo.teacher_name}}</span>
          <p>{{courseInfo.description}}</p>
          <router-link :to="{ name: 'teacherDetail', query: {id:courseInfo.teacher_id} }">查看{{ $t("courseDetail.14") }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../../assets/js/mUtils";
import { mapState } from "vuex";
import store from "../../store/index";
export default {
    name: "courseDetail",
    data() {
        return {
            canSubmit: true,
            pageCtr: false,
            courseType: 1, // 1 课程概述 2 课程目录 3 学员点评
            tabIndexClass: "tab_1",
            borderTopIndex: -1,
            hoverindex: -1,
            hoverIndex: -1,
            rateLevel: 0,
            evaluationText: "",
            textCtr: false,
            textLength: 0,
            courseInfo: {},
            id: this.$route.query.id,
            courseList: [], //播放列表
            evaluationList: [], //评论列表
            evaluationCount: 0, //评论总条数
            isBuy: false, //用户是否该买该课程
            isCollect: 0, //是否收藏
            videoScore: 0 //评分
        };
    },
    mounted() {
        this.getDetail();
    },
    computed: {
        ...mapState(["login"])
    },
    methods: {
        tab(type) {
            if (!getCookie("uid") && type != 1) {
                store.commit("loginCtr", {
                    display: true
                });
                return;
            }
            this.courseType = type;
            this.tabIndexClass = "tab_" + type;
            if (type == 2) {
                if (this.courseList.length == 0) {
                    this.getPlayList();
                }
            }
            if (type == 3) {
                if (this.evaluationList.length == 0) {
                    this.getEvaluate(1);
                }
            }
        },
        mouseIn(index, Index) {
            // console.log(index,Index)
            this.hoverindex = index;
            this.hoverIndex = Index;
            if (this.hoverIndex == 0) {
                this.borderTopIndex = index;
            }
        },
        mouseOut(index, Index) {
            this.hoverindex = -1;
            this.hoverIndex = -1;
            this.borderTopIndex = -1;
        },
        rateChange() {
            this.textCtr = true;
        },
        getDetail() {
            //获取课程详情
            this.http(
                "get",
                "common/common/courseDetails",
                {
                    id: this.id
                },
                data => {
                    this.courseInfo = data;
                    this.videoScore = parseInt(data.video_score)
                        ? Math.floor(parseInt(data.video_score) / 20)
                        : 5;
                    this.pageCtr = true;
                    this.isCollect = data.is_collect;
                    document.title =
                        this.$t("title.courseDetailTitle") +
                        "--" +
                        data.video_title;
                }
            );
        },
        collect(type) {
            this.canSubmit = false;
            this.isCollect = !this.isCollect;
            this.http(
                "get",
                "index.php?app=api&mod=Video&act=collect&sctype=2",
                {
                    type: type ? 1 : 0, //0取消收藏，1收藏
                    source_id: this.id
                },
                data => {
                    this.canSubmit = true;
                    this.$message({
                        type: "success",
                        message: this.isCollect ? "收藏成功" : "取消收藏成功"
                    });
                },
                errMsg => {
                    this.canSubmit = true;
                }
            );
        },
        getPlayList() {
            //获取播放列表
            this.http(
                "get",
                "mock/coursePlayList",
                {
                    id: this.id
                },
                data => {
                    this.courseList = data.chapterList;
                }
            );
        },
        getEvaluate(page) {
            //获取评论列表
            this.http(
                "get",
                "mock/evaluationList",
                {
                    page: page
                },
                data => {
                    this.evaluationList = data.list;
                    this.evaluationCount = data.totalNum;
                    this.isBuy = data.isBuy;
                }
            );
        },
        goPlayer(isFree, index, isBuy) {
            if (isFree || isBuy) {
                //用户已购买或免费
                this.$router.push({
                    name: "player",
                    query: {
                        courseId: this.id,
                        index: index
                    }
                });
            } else {
                //未购买
                this.$router.push({
                    name: "comfireOrder",
                    query: {
                        courseId: this.id
                    }
                });
            }
        },
        topGoPlayer() {
            if (!this.courseInfo.is_pay) {
                this.$router.push({
                    name: "comfireOrder",
                    query: {
                        courseId: this.id
                    }
                });
            } else {
                let playIndex = 0;
                this.courseInfo.course_list.forEach((item, index) => {
                    if (item.is_last_view) {
                        playIndex = index;
                    }
                });
                this.$router.push({
                    name: "player",
                    query: {
                        courseId: this.id,
                        index: playIndex
                    }
                });
            }
        }
    },
    watch: {
        evaluationText: function(val) {
            this.textLength = val.length;
            if (val.length > 150) {
                this.evaluationText = val.slice(0, 150);
            }
        }
    }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.courseDetail {
    .header {
        height: 450px;
        background-color: #333;
        > div {
            padding: 40px 0 28px 0;
            > p {
                display: flex;
                span {
                    font-size: 14px;
                    color: #999;
                    line-height: 14px;
                }
            }
            .courseInfo {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                > img {
                    height: 350px;
                    width: 660px;
                }
                > .right {
                    width: 520px;
                    height: 350px;
                    background-color: #3c3c3c;
                    display: flex;
                    flex-direction: column;
                    > p {
                        padding-left: 33px;
                        display: flex;
                        align-items: center;
                    }
                    .courseTitle {
                        height: 70px;
                        span {
                            font-size: 20px;
                            color: #fffefe;
                        }
                        img {
                            height: 26px;
                            margin-left: 14px;
                        }
                    }
                    .price {
                        height: 56px;
                        background-color: #444;
                        justify-content: space-between;
                        padding-right: 10px;
                        padding-bottom: 12px;
                        align-items: flex-end;
                        > .left {
                            // display: flex;
                            // align-items: flex-end;
                            span {
                                font-size: 26px;
                                color: #fc583d;
                                line-height: 26px;
                            }
                            span.p-title {
                                font-size: 14px;
                                line-height: 14px;
                                color: #fffefe;
                            }
                            span:last-child {
                                font-size: 14px;
                                color: #888;
                                text-decoration: line-through;
                                line-height: 14px;
                            }
                        }
                        > .right {
                            font-size: 14px;
                            color: #888;
                        }
                    }
                    .star {
                        margin-top: 12px;
                        span {
                            margin-right: 6px;
                            img {
                                height: 30px;
                                width: 30px;
                            }
                        }
                    }
                    .teacher {
                        margin-top: 28px;
                        font-size: 16px;
                        color: #fff;
                    }
                    .bottom {
                        display: flex;
                        padding: 0 10px 0 34px;
                        display: flex;
                        justify-content: space-between;
                        > .left {
                            a {
                                width: 124px;
                                height: 40px;
                                font-size: 14px;
                                margin-right: 20px;
                                outline: none;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border: 1px solid #63acff;
                                color: #63acff;
                                background-color: #3c3c3c;
                            }
                            a:first-child {
                                color: #fff;
                                background-color: #fd583e;
                                border: none;
                            }
                        }
                        > .right {
                            span {
                                cursor: pointer;
                                img {
                                    height: 24px;
                                    width: 24px;
                                    margin-left: 6px;
                                }
                            }
                        }
                    }
                }
            } // display: flex;
            // justify-content: space-between;
        }
    }
    .content {
        margin-top: 28px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        > .left {
            width: 900px;
            background-color: #fff;
            padding-bottom: 100px;
            .tab {
                display: flex; // margin-top: 50px;
                // margin-bottom: 40px;
                border-bottom: 1px solid #dedede;
                position: relative;
                padding-left: 20px;
                &::after {
                    position: absolute;
                    content: "";
                    bottom: 0;
                    left: 20px;
                    height: 2px;
                    width: 100px;
                    background-color: #fc893d;
                    transition: all 0.4s;
                }
                a {
                    width: 100px;
                    padding: 20px 0 24px 0;
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
                    left: 20;
                }
            }
            .tab_2 {
                &::after {
                    left: 120px;
                }
            }
            .tab_3 {
                &::after {
                    left: 220px;
                }
            }
            .courseIntro {
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 760px !important;
                }
                p {
                    text-indent: 2em;
                    margin-bottom: 20px;
                    font-size: 12px;
                }
            }
            .courseMeun {
                .c-item {
                    padding: 0 30px;
                    &:hover {
                        background: #f8f8f8;
                    }
                    > div {
                        display: flex;
                        justify-content: space-between;
                        height: 60px;
                        border-bottom: 1px solid #dedede;
                    }
                    .left {
                        display: flex;
                        align-items: center;
                        color: #333;
                        font-size: 16px;
                        .i-tag {
                            width: 16px;
                            height: 16px;
                        }
                        > span {
                            display: inline-block;
                            margin: 0 10px;
                        }
                        .i-tag-free {
                            width: 34px;
                            height: 18px;
                        }
                    }
                    .right {
                        display: flex;
                        align-items: center;
                        img {
                            width: 16px;
                            height: 16px;
                        }
                        button {
                            height: 28px;
                            width: 80px;
                            font-size: 14px;
                            border: 1px solid #dedede;
                            border-radius: 2px;
                            margin-left: 10px;
                            color: #999;
                            outline: none;
                            text-align: center; // padding: 0 7px;
                            background: none;
                            cursor: pointer;
                            &:hover {
                                background-color: #fc583d;
                                color: #fff;
                                border: 1px solid #fc583d;
                            }
                        }
                    }
                }
                ul {
                    .outItem {
                        > p {
                            height: 60px;
                            display: flex;
                            align-items: center;
                            margin: 0 30px;
                            span {
                                font-size: 18px;
                                color: #fc583d;
                                margin-left: 10px;
                            }
                            img {
                                height: 16px;
                                width: 16px;
                            }
                        }
                        ul {
                            position: relative; // padding: 0 30px;
                            .inItem {
                                &:hover {
                                    background-color: #f8f8f8;
                                    > div {
                                        border-bottom: 1px solid #f8f8f8;
                                    }
                                }
                                > div {
                                    margin: 0 30px 0 60px;
                                    border-bottom: 1px solid #dedede;
                                    display: flex;
                                    height: 60px;
                                    justify-content: space-between;
                                    align-items: center;
                                    > .left {
                                        display: flex;
                                        align-items: center;
                                        img {
                                            height: 18px;
                                            width: 34px;
                                        }
                                        span {
                                            font-size: 16px;
                                            color: #333;
                                            margin-right: 10px;
                                        }
                                    }
                                    > .right {
                                        display: flex;
                                        align-items: center;
                                        img {
                                            height: 20px;
                                            width: 20px;
                                            margin-right: 10px;
                                        }
                                        .time {
                                            font-size: 18px;
                                            color: #999;
                                        }
                                        .percent {
                                            font-size: 18px;
                                            color: #999;
                                            width: 80px;
                                            margin-left: 10px;
                                            text-align: center;
                                        }
                                        button {
                                            height: 28px;
                                            width: 80px;
                                            font-size: 14px;
                                            border: 1px solid #999;
                                            border-radius: 2px;
                                            margin-left: 10px;
                                            color: #999;
                                            outline: none;
                                            line-height: 28px;
                                            text-align: center; // padding: 0 7px;
                                        }
                                        .redBGC {
                                            background-color: #fc583d;
                                            color: #fff;
                                            border: 1px solid #fc583d;
                                        }
                                    }
                                }
                                .nonBorder {
                                    border-bottom: 1px solid #f8f8f8;
                                }
                            }
                        }
                        .border {
                            &::after {
                                content: "";
                                border-top: 1px solid #dedede;
                                position: absolute;
                                left: 30px;
                                top: 0;
                                width: 840px;
                            }
                        }
                    } // .outItem:last-child {
                    //   .inItem:last-child {
                    //     div {
                    //       border: none;
                    //     }
                    //   }
                    // }
                }
            }
            .evaluation {
                padding: 0 30px;
                .addEvaluation {
                    padding: 20px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    > p {
                        font-size: 14px;
                        color: #333;
                        line-height: 14px;
                        width: 100%;
                        margin-bottom: 40px;
                    }
                    .el-rate {
                        height: 24px;
                        .el-rate__item {
                            .el-rate__icon {
                                margin-right: 10px;
                                &::before {
                                    font-size: 24px;
                                }
                            }
                            .el-icon-star-on {
                                color: #ff5847 !important;
                            }
                            .el-icon-star-off {
                                color: #909499 !important;
                            }
                        }
                    }
                    .textArea {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        margin-top: 26px;
                        width: 100%;
                        textarea {
                            width: 840px;
                            height: 160px;
                            border-radius: 4px;
                            resize: none;
                            outline: none;
                            border: 1px solid #dedede;
                            padding: 20px;
                            font-size: 14px;
                            color: #999;
                        }
                        > span {
                            font-size: 14px;
                            color: #999;
                            line-height: 14px;
                            margin: 5px 0 10px 0;
                        }
                        > p {
                            display: flex;
                            align-items: center;
                            span {
                                font-size: 14px;
                                color: #999;
                                margin-right: 58px;
                                cursor: pointer;
                            }
                            button {
                                background-color: #fc583d;
                                border: none;
                                height: 40px;
                                width: 100px;
                                border-radius: 2px;
                                color: #fff;
                                font-size: 14px;
                                outline: none;
                                cursor: pointer;
                            }
                        }
                    }
                }
                > p {
                    height: 47px;
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: #333;
                    border-bottom: 1px solid #dedede;
                    span {
                        color: #fc583d;
                    }
                }
                > ul {
                    li {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #dedede;
                        padding-bottom: 20px;
                        .left {
                            display: flex;
                            > span {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                margin-top: 16px;
                                margin-right: 24px;
                                img {
                                    height: 50px;
                                    width: 50px;
                                }
                                span {
                                    font-size: 12px;
                                    color: #666;
                                    line-height: 12px;
                                    margin-top: 5px;
                                }
                            }
                            > div {
                                margin-top: 23px;
                                > p:first-child {
                                    display: flex;
                                    span {
                                        height: 30px;
                                        width: 30px;
                                        img {
                                            height: 30px;
                                            width: 30px;
                                        }
                                    }
                                }
                                > p:last-child {
                                    font-size: 14px;
                                    color: #333;
                                    width: 642px;
                                    margin-top: 12px;
                                }
                            }
                        }
                        .right {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            margin-top: 32px;
                            span:first-child {
                                font-size: 12px;
                                color: #999;
                            }
                            span:last-child {
                                display: flex;
                                align-items: center;
                                font-size: 16px;
                                color: #666;
                                margin-left: 4px;
                                img {
                                    height: 20px;
                                    width: 20px;
                                }
                            }
                        }
                    }
                }
            }
        }
        > .right {
            width: 280px; // height: 100px;
            background-color: #fff;
            > p {
                height: 60px;
                border-bottom: 1px solid #f2f2f2;
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #333;
                padding-left: 24px;
            }
            .teacherInfo {
                padding: 20px 24px 44px 24px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    height: 120px;
                    width: 120px;
                    border-radius: 50%;
                }
                span {
                    font-size: 20px;
                    color: #333;
                    line-height: 20px;
                    margin-top: 12px;
                }
                p {
                    font-size: 12px;
                    color: #999;
                    margin-top: 4px;
                }
                a {
                    width: 100%;
                    height: 40px;
                    background-color: #63acff;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                    border-radius: 4px;
                    margin-top: 27px;
                }
            }
        }
    }
}
</style>

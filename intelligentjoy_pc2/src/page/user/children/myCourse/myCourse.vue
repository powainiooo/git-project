<template lang="html">
  <div class="myCourse">
    <div :class="['tab',tabIndexClass]">
      <a href="javascript:;" @click="tab(1)" :class="[courseType==1?'active':'']">
        {{$t('myCourse.1')}}
      </a>
      <a href="javascript:;" @click="tab(2)" :class="[courseType==2?'active':'']">
        {{$t('myCourse.2')}}
      </a>
    </div>
    <ul>
      <li v-for="(item,index) in curData">
        <div @click="linkToDetail(item.id)">
          <div class="left">
            <img :src="item.imageurl" alt="">
            <div class="courseInfo">
              <p>{{item.video_title}}</p>
              <div class="courseInfoBottom">
                <span class="teacherName">{{item.teacher_name}}</span>
                <span class="t-intro">{{item.position}}</span>
                <span class="t-intro">{{item.description}}</span>
              </div>
            </div>
            <div class="studyInfo" v-show="courseType==1">
              <!-- <div class="studyTop">
                <span>{{$t('myCourse.3')}}30%</span>
                <span>
                  <span :style = "{width:25*index+'px'}"></span>
                </span>
              </div> -->
              <div class="studyButtons">
                <router-link :to="{ name: 'courseDetail', query: {id: item.id} }">{{$t('myCourse.4')}}</router-link>
                <button type="button" name="button" @click.stop="$store.commit('qrCtr', {'title':$t('popTitle.1'),'show':true})">{{$t('myCourse.5')}}</button>
              </div>
            </div>
          </div>
          <img src="./images/arrowRight.png" alt="" v-show="courseType==1">
          <img src="./images/star@2x.png" alt="" v-show="courseType==2" class="starImg" v-if="!item.curCollectStatus" @click.stop="canSubmit?collect(item.id, 0, index):''">
          <img src="./images/star.png" alt="" v-show="courseType==2" class="starImg" v-else @click.stop="canSubmit?collect(item.id, 1, index):''">
        </div>
      </li>
    </ul>
    <p class="no-data" v-if="curData.length==0">{{$t("dataTip.1")}}</p>
    <p v-else>共{{courseType==1 ? totalBuyNum: totalCollectNum}}{{$t('myCourse.7')}}</p>


    <el-pagination id="myCoursePagin" v-if="courseType == 1"
      background
      layout="pager"
      :total="totalBuyNum"
      :page-size="count"
      :current-page="curBuyPage"
      @current-change="getBuyList" >
    </el-pagination>
    <el-pagination id="myCoursePagin" v-else
      background
      layout="pager"
      :total="totalCollectNum"
      :page-size="count"
      :current-page="curCollectionPage"
      @current-change="getCollectList" >
    </el-pagination>

    <!-- <el-dialog
  :title="$t('myCourse.8')"
  :visible.sync="rateVisible"
  width="600px">
  <div class="myRate">
    <el-rate v-model="rateLevel" show-text :texts="$t('myCourse.9')" ></el-rate>
    <textarea v-model="rateContent" :placeholder="$t('myCourse.10')"></textarea>
    <button type="button" name="button">提交</button>
  </div>
</el-dialog> -->

<!-- <el-dialog
:title="$t('myCourse.8')"
:visible.sync="rateVisible"
width="600px">
<div class="myRate">
  <span>抱歉！目前课程评分功能只对APP用户开放！</span>
  <div class="qrcode-cont">
    <div class="">
      <div class="">

      </div>
      <span>IOS</span>
    </div>
    <div class="">
      <div class="">

      </div>
      <span>Android</span>
    </div>

  </div>
<button type="button" name="button" @click="rateVisible=false">确 定</button>
</div>
</el-dialog> -->

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      canSubmit: true, //能否提交
      courseType: 1, // 1 已购课程 2 我的收藏
      tabIndexClass: "tab_1",
      rateVisible:false,//评分弹窗
      rateLevel:null,//评价等级
      rateContent:'',//评价内容
      firstT: 1,//第一次切换
      count: 10,//单页显示条数
      curData: [],//当前显示数据
      buyListInfo: [],//购买课程信息
      collectListInfo: [],//收藏课程信息
      totalBuyNum: 0, //购买总数据数
      totalCollectNum: 0,//收藏总数据数
      curBuyPage: 1,//购买当前页
      curCollectionPage: 1,//收藏当前页
      cancelCollectNum: 0//取消收藏的数量
    }
  },
  methods: {
    tab(type) {
      this.courseType = type;
      this.tabIndexClass = 'tab_' + type;

      if(this.firstT == 1 && type == 2) {
        this.getCollectList(1);
        this.firstT++;
      }

      this.curData = type == 1 ? this.buyListInfo : this.collectListInfo;
      this.totalNum = this.curData[0] ? this.curData[0].count : 0;
    },
    getBuyList(page) {
      window.scrollTo(0,0);
      this.curBuyPage = page;
      this.http("get", "index.php?app=api&mod=Video&act=getBuyVideosList",
        {
          count: this.count,
          page: page
        },
        data => {
          if( data.length > 0 ) {
            this.buyListInfo = data;
            this.curData = this.buyListInfo;
            this.totalBuyNum = this.curData[0].count;
          }
        }
      );
    },
    getCollectList(page) {
      window.scrollTo(0,0);
      this.curCollectionPage = page;
      if(this.cancelCollectNum != 0) {
        page = Math.min( Math.ceil((this.totalCollectNum - this.cancelCollectNum) / this.count), page );
      }

      this.http("get", "index.php?app=api&mod=Video&act=getCollectVideoList",
        {
          count: this.count,
          page: page
        },
        data => {
          if( data.length > 0 ) {
            this.collectListInfo = data;
            this.curData = this.collectListInfo;
            this.totalCollectNum = this.curData[0].count;
            this.cancelCollectNum = 0;
          }
        }
      );
    },
    collect(id, type, index) {
      this.canSubmit = false;
      this.http("get", "index.php?app=api&mod=Video&act=collect&sctype=2",
        {
          type: type, //0取消收藏，1收藏
          source_id: id
        },
        data => {
          this.$set(this.curData[index], "curCollectStatus", type == 0 ? true : false);
          type == 0 ? ++this.cancelCollectNum : --this.cancelCollectNum;
          this.canSubmit = true;
        },
        errMsg => {
          this.canSubmit = true;
        }
      );
    },
    linkToDetail(id) {
      this.$router.push({name: 'courseDetail', query: {id: id}});
    }
  },
  mounted() {
    this.getBuyList(1);
  }
}
</script>

<style lang="less" >
.myCourse {
    margin-bottom: 122px;
    .tab {
        display: flex;
        // margin-bottom: 40px;
        border-bottom: 1px solid #DEDEDE;
        position: relative;
        &::after {
            position: absolute;
            content: '';
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100px;
            background-color: #FC893D;
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
                color: #FC893D;
            }
        }
        .active {
            color: #FC893D;
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
    > ul {
        > li {
            padding: 0 26px 0 34px;
            &>div {
                height: 200px;
                border-bottom: 1px solid #F2F2F2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left {
                    display: flex;
                    height: 100%;
                    > img {
                        height: 140px;
                        width: 210px;
                        margin-top: 30px;
                        margin-right: 20px;
                    }
                    .courseInfo {
                        padding: 30px 0;
                        width: 205px;
                        margin-right: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        > p {
                            font-size: 16px;
                            color: #333;
                            line-height: 16px;
                        }
                        .courseInfoBottom {
                            display: flex;
                            flex-direction: column;
                            span {
                                font-size: 14px;
                                color: #999;
                                margin-top: 7px;
                                line-height: 14px;
                                &.t-intro{
                                  white-space: nowrap;
                                  overflow: hidden;
                                  text-overflow: ellipsis;
                                }
                            }
                            .teacherName {
                                font-size: 16px;
                                color: #666;
                                margin-bottom: 6px;
                            }
                        }
                    }
                    .studyInfo {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 43px 0 38px;
                        .studyTop {
                            > span:first-child {
                                font-size: 12px;
                                color: #666;
                                line-height: 12px;
                            }
                            > span:last-child {
                                display: block;
                                height: 3px;
                                width: 250px;
                                background-color: #EFEFEF;
                                position: relative;
                                span {
                                    top: 0;
                                    left: 0;
                                    height: 3px;
                                    background-color: #63ACFF;
                                    display: block;
                                }
                            }
                        }
                        .studyButtons {
                            width: 250px;
                            display: flex;
                            justify-content: space-between;
                            button,a {
                              display: inline-block;
                              text-align: center;
                              width: 115px;
                              height: 30px;
                              line-height: 30px;
                              background-color: #63ACFF;
                              font-size: 12px;
                              color: #FEFEFE;
                              border: none;
                              outline: none;
                              border-radius: 2px;
                            }
                            button:last-child {
                                background-color: #FC893D;
                            }
                        }
                    }
                }
                > img {
                    height: 35px;
                    margin-right: -10px;
                }
                .starImg {
                    margin-right: 110px;
                }
            }

        }
    }
    > p {
        font-size: 14px;
        color: #999;
        line-height: 14px;
        margin-top: 50px;
        margin-left: 36px;
    }
    #myCoursePagin {
        display: flex;
        justify-content: center;
        margin: 32px 0 98px;
        padding: 0;
        .number {
            height: 36px;
            width: 36px;
            text-align: center;
            line-height: 36px;
            border-radius: 4px;
            border: 1px solid #ccc;
            margin: 0 10px;
            background-color: #fff;
        }
        .more {
            background-color: #fff;
        }
        .active {
            border: none;
            background-color: #63ACFF;
        }
    }
    .el-dialog {
      .el-dialog__header {
        padding: 0;
        height: 60px;
        padding-left: 20px;
        font-size: 20px;
        line-height: 60px;
        color: #666;
        border-bottom: 1px solid #F2F2F2;
        .el-dialog__headerbtn {
          top: 15px;
          right: 20px;
        }
      }
      .el-dialog__body {
        padding: 0;
        .myRate {
          display: flex;
          flex-direction: column;
          padding: 18px 20px 43px 28px;
          .el-rate {
            height: 28px;
            .el-rate__item {
              .el-rate__icon {
                margin-right: 20px;
                &::before {
                  font-size: 28px;
                }
              }
              .el-icon-star-on {
                color: #ee8e4f!important;
              }
              .el-icon-star-off {
                color: 909499!important;
              }
            }
            .el-rate__text {
              margin-left: 67px;
              font-size: 18px;
              color: #666!important;
            }
          }
          >textarea {
            height: 184px;
            border-radius: 2px;
            background-color: RGBA(99, 172, 255, .1);
            margin-top: 26px;
            padding: 30px 15px;
            font-size: 14px;
            border: none;
            outline: none;
            resize: none;
          }
          >button {
            height: 40px;
            width: 240px;
            background-color: #63ACFF;
            border: none;
            color: #fff;
            font-size: 12px;
            margin: 20px auto 0;
            outline: none;
            border-radius: 2px;
          }
          .qrcode-cont{
            display: flex;
            justify-content: space-between;
            &>div{
              flex: 1;
              text-align: center;
              &>div{
                width: 150px;
                height: 150px;
                margin: 20px auto 10px;
                border: 1px dashed #999;
              }
            }
          }
        }
      }

    }
}
</style>

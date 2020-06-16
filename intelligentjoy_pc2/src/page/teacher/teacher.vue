<template lang="html">
  <div class="teacher centerBox">
    <div :class="['tab',tabIndexClass]">
      <!-- <a href="javascript:;" @click="tab(1)" :class="[teacherType==1?'active':'']">
        {{ $t("teacher.integration") }}
      </a> -->
      <a href="javascript:;" @click="tab(1)" :class="[teacherType==1?'active':'']">
        {{ $t("teacher.new") }}
      </a>
      <a href="javascript:;" @click="tab(2)" :class="[teacherType==2?'active':'']">
        {{ $t("teacher.hot") }}
      </a>
    </div>
    <ul class="teacherList">
      <li v-for="item in curData" >
        <router-link :to="{ name: 'teacherDetail', query: {id:item.id} }">
          <div class="teacherInfo">
            <img :src="item.avatar" alt="">
            <div class="">
              <span>{{item.name}}</span>
              <p class="short overDot">{{item.position}}</p>
              <p class="long">{{item.description | strFilter}}</p>
            </div>
          </div>
          <div class="teacherCourse">
            <span>现有课程</span>
            <ul>
              <li v-for="(itemSon, index) in item.courseList" v-if="index < 3">
                <p>{{itemSon.video_title}}</p>
                <span v-if="parseInt(itemSon.t_price)!=0">HK${{itemSon.t_price}}</span>
                <span v-if="parseInt(itemSon.t_price)==0">免费</span>
              </li>
            </ul>
          </div>
        </router-link>
      </li>
    </ul>
    <el-pagination
      background
      layout="pager"
      @current-change="getTeacherList"
      :page-size="count"
      :current-page="curPage[teacherType-1]"
      :total="totalNum[teacherType - 1]">
    </el-pagination>
  </div>
</template>

<script>
import { cutStr } from "../../assets/js/mUtils";
// import clamp from '../../../static/js/clamp'
export default {
    data() {
        return {
            teacherType: 1, //1 最新 2 最热
            curDataType: ["new", "hot"],
            tabIndexClass: "tab_1",
            curData: {}, //当前显示数据
            curStatusData: [], //所有数据
            count: 10, //单页显示数量
            curPage: [1, 1, 1], //当前页
            totalNum: [1, 1, 1] //总数据数
        };
    },
    mounted() {
        this.getTeacherList(1);
    },
    filters: {
        strFilter(val) {
            return cutStr(val, 168);
        }
    },
    methods: {
        tab(type) {
            this.teacherType = type;
            this.tabIndexClass = "tab_" + type;
            this.getTeacherList(this.curPage[this.teacherType - 1]);
        },
        getTeacherList(page) {
            window.scrollTo(0, 0);
            this.curPage[this.teacherType - 1] = page;
            this.http(
                "get",
                "common/common/teacher",
                {
                    type: this.curDataType[this.teacherType - 1],
                    page_size: this.count,
                    page: page
                },
                data => {
                    this.totalNum[this.teacherType - 1] = parseInt(
                        data[0].count
                    );
                    this.curData = data;
                    this.curStatusData[this.teacherType - 1] = data;
                }
            );
        }
    }
};
</script>

<style lang="less">
.teacher {
    .tab {
        display: flex;
        margin-top: 50px;
        // margin-bottom: 40px;
        border-bottom: 1px solid #dedede;
        position: relative;
        &::after {
            position: absolute;
            content: "";
            bottom: 0;
            left: 0;
            height: 2px;
            width: 90px;
            background-color: #63acff;
            transition: all 0.4s;
        }
        a {
            width: 90px;
            padding: 10px 0;
            font-size: 18px;
            color: #666;
            text-align: center;
            line-height: 18px;
            &:hover {
                color: #63acff;
            }
        }
        .active {
            color: #63acff;
        }
    }
    .tab_1 {
        &::after {
            left: 0;
        }
    }
    .tab_2 {
        &::after {
            left: 90px;
        }
    }
    .tab_3 {
        &::after {
            left: 180px;
        }
    }
    .teacherList {
        > li {
            border-bottom: 1px solid #dedede;
            a {
                display: flex;
                height: 200px;
                width: 100%;
                padding: 0 46px 0 30px;
                justify-content: space-between;
                &:hover {
                    background-color: RGBA(99, 172, 255, 0.1);
                }
                .teacherInfo {
                    margin-top: 30px;
                    display: flex;
                    > img {
                        height: 140px;
                        width: 140px;
                    }
                    > div {
                        margin-left: 30px;
                        width: 460px;
                        span {
                            color: #333333;
                            font-size: 20px;
                            line-height: 20px;
                            font-weight: bold;
                        }
                        .short {
                            font-size: 18px;
                            line-height: 18px;
                            color: #666;
                            margin-top: 10px;
                        }
                        .long {
                            font-size: 16px;
                            color: #999;
                            margin-top: 16px;
                            height: 67px;
                            overflow: hidden;
                        }
                    }
                }
                .teacherCourse {
                    margin-top: 60px;
                    width: 328px;
                    > span {
                        font-size: 16px;
                        color: #666;
                        line-height: 16px;
                    }
                    ul {
                        margin-top: 18px;
                        li {
                            display: flex;
                            justify-content: space-between;
                            p {
                                width: 190px;
                                font-size: 18px;
                                line-height: 18px;
                                color: #333;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            span {
                                color: #fc583d;
                                font-size: 18px;
                                line-height: 18px;
                            }
                        }
                        li + li {
                            margin-top: 16px;
                        }
                    }
                }
            }
        }
    }
    // .el-pagination {
    //   display: flex;
    //   justify-content: center;
    //   margin: 95px 0 105px 0;
    //   .number {
    //     height: 36px;
    //     width: 36px;
    //     text-align: center;
    //     line-height: 36px;
    //     border-radius: 4px;
    //     border: 1px solid #ccc;
    //     margin: 0 10px;
    //   }
    //   .active {
    //     border: none;
    //     background-color: #63ACFF;
    //   }
    // }
}
</style>

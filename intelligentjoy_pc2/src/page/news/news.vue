<template lang="html">
  <div class="news centerBox">
    <div class="newsList">
      <div :class="['tab',tabIndexClass]">
        <!-- <a href="javascript:;" @click="tab(1)" :class="[newsType==1?'active':'']">
          {{ $t("teacher.integration") }}
        </a> -->
        <a href="javascript:;" @click="tab(1)" :class="[newsType==1?'active':'']">
          {{ $t("teacher.new") }}
        </a>
        <a href="javascript:;" @click="tab(2)" :class="[newsType==2?'active':'']">
          {{ $t("teacher.hot") }}
        </a>
      </div>
      <ul>
        <li v-for="item in newsList">
          <router-link :to="{ name: 'newsDetail', params: {id: item.id} }">
            <img :src="item.img" alt="">
            <div>
            <h5 class="overDot">{{item.title}}</h5>
            <p class="newsIntroduce">{{item.desc}}</p>
            <p class="newsInfo">
              <span>{{item.from}}</span>
              <span>
                <!-- <span>{{item.createTime}}{{'1'+item.createTime | timeStringFilter}}</span> -->
                <span>{{ item.dateline | timeStringFilter}}</span>
                <span class="readerNum">{{item.readcount}}人{{ $t("news.2") }}</span>
              </span>
            </p>
            </div>
          </router-link>
        </li>
      </ul>
      <el-pagination
        background
        layout="pager"
        @current-change="getNewsList"
        :current-page="curPage[newsType-1]"
        :page-size="count"
        :total="totalNum[newsType-1]">
      </el-pagination>
    </div>
    <div class="recommendNews">
      <h4>{{$t('news.1')}}</h4>
      <ul>
        <li v-for="item in recommend">
          <router-link :to="{ name: 'newsDetail', params: {id: item.id} }">
            <h5>{{item.title}}</h5>
            <p>{{item.desc | strFilter}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cutStr, timeStringStyle } from "../../assets/js/mUtils";
export default {
    data() {
        return {
            newsType: 1, //1 最新 2 最热
            curNewsType: ["new", "hot"],
            tabIndexClass: "tab_1",
            newsList: [],
            recommend: [],
            curData: {}, //当前显示数据
            curStatusData: [], //所有数据
            count: 10, //单页显示数量
            curPage: [1, 1, 1], //当前页
            totalNum: [1, 1, 1] //总数据数
        };
    },
    mounted() {
        this.getNewsList(1);
    },
    filters: {
        timeStringFilter(val) {
            // val = val -  parseInt(Math.random()*(7*24*60*60*1000))
            return timeStringStyle(val);
        },
        strFilter(val) {
            return cutStr(val, 126);
        }
    },
    methods: {
        tab(type) {
            this.newsType = type;
            this.tabIndexClass = "tab_" + type;
            this.getNewsList(1);
        },
        // getStr() {
        //     let str =
        //         '综观希玛眼科上市以后香港新股市场的成绩综ab玛眼,科上市以，后香港新股市场的成绩综玛眼科上市以后香港新股市场的成绩综观希玛科上市以后香港新股市场的成绩综观希玛眼科上场的成绩'
        //     console.log(cutStr(str, 126))
        //     return cutStr(str, 126)
        // },
        getNewsList(page) {
            window.scrollTo(0, 0);
            this.curPage[this.newsType - 1] = page;
            this.http(
                "get",
                "common/common/list",
                {
                    type: this.curNewsType[this.newsType - 1],
                    page_size: this.count,
                    page: page
                },
                data => {
                    this.totalNum[this.newsType - 1] = parseInt(data.totalNum);
                    this.newsList = data.newsList;
                    this.recommend = data.recommend;
                }
            );
        }
    }
};
</script>

<style lang="less">
.news {
    padding-top: 50px;
    display: flex;
    .newsList {
        width: 880px;
        margin-right: 20px;
        .tab {
            display: flex; // margin-top: 50px;
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
        > ul {
            li {
                border-bottom: 1px dashed #999;
                display: flex;
                a {
                    display: flex;
                    // height: 468px;
                    width: 880px;
                    padding: 0 53px 0 34px;
                    h5 {
                        font-size: 18px;
                        color: #333;
                        font-weight: bold;
                        line-height: 18px;
                    }
                    .newsInfo {
                        margin-bottom: 17px;
                        display: flex;
                        justify-content: space-between;
                        span {
                            font-size: 16px;
                            line-height: 16px;
                            color: #666;
                        }
                        .readerNum {
                            font-family: "Lato";
                            color: #999;
                            margin-left: 40px;
                        }
                    }
                    .newsIntroduce {
                        margin-bottom: 17px; // line-height: px;
                        font-size: 16px;
                        color: #666;
                        height: 92px;
                        overflow: hidden;
                    }
                    img {
                        margin: 20px;
                        height: 200px;
                        width: 300px;
                        border-radius: 10px;
                        transition: all 0.4s;
                    }
                    div {
                        width: 453px;
                    }
                }
                a:hover {
                    img {
                        box-shadow: 0 0 20px RGBA(0, 0, 0, 0.8);
                    }
                }
            }
            li:last-child {
                border-bottom: none;
            }
        }
        .el-pagination {
            display: flex;
            justify-content: center;
            margin: 95px 0 105px 0;
            .number {
                height: 36px;
                width: 36px;
                text-align: center;
                line-height: 36px;
                border-radius: 4px;
                border: 1px solid #ccc;
                margin: 0 10px;
            }
            .active {
                border: none;
                background-color: #63acff;
            }
        }
    }
    .recommendNews {
        width: 300px;
        // height: 20px;
        h4 {
            padding: 10px 0;
            margin: 0;
            border-bottom: 1px solid #dedede;
            font-size: 18px;
            line-height: 18px;
            color: #333;
            font-weight: 400;
        }
        ul {
            li {
                a {
                    h5 {
                        margin: 0;
                        height: 18px;
                        width: 283px;
                        line-height: 18px;
                        font-size: 18px;
                        overflow: hidden;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 400;
                        color: #333;
                        margin-top: 20px; // transition: all .2s;
                        &:hover {
                            color: #fc583d;
                        }
                    }
                    p {
                        font-size: 14px;
                        color: #999;
                        margin-top: 8px;
                        line-height: 24px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
}
</style>

<template>
  <div id='teacherDetail'>
    <div class="teacherInfo centerBox">
      <div class="teacherTitle">
        {{ $t('teacher.1')}}
      </div>
      <div class="teacherMsg">
        <span>
          <img :src="teacherInfo.avatar" alt="">
        </span>
        <p>{{teacherInfo.name}}</p>
        <p>{{teacherInfo.position}}</p>
        <p>{{teacherInfo.description}}</p>
      </div>
    </div>
    <div class="centerBox teacherCourse">
      <div class="teacherTitle">
        {{ $t('teacher.2')}}
      </div>
      <p class="no-data" v-if="courseList.length==0">{{$t("dataTip.1")}}</p>
      <div class=" courseList">
        <div class="courseItem" v-for="item in courseList" :key="item.id">
          <router-link :to="{ name: 'courseDetail', query: {id:item.id} }">
            <span class="img-cont">
              <img :src="item.cover" alt="">
            </span>
            <div class="">
              <p>{{item.video_title}}</p>
              <p>
                <span v-if="item.t_price!=0">
                  HK$
                  <span>{{item.t_price}}</span>
                </span>
                <span v-else class="c-r">{{$t('courseDetail.3')}}</span>
                <!-- <span>{{item.video_order_count}}人在学</span> -->
              </p>
            </div>
            <p class="t-info-cont">
              <span>
                <img :src="teacherInfo.avatar" alt="">
                <span>{{teacherInfo.name}}</span>
              </span>
              <span class="t-posi">{{item.position}}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            teacherInfo: {},
            courseList: []
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getCourseDetail();
    },

    methods: {
        getCourseDetail() {
            this.http(
                "get",
                "common/common/teacherDetails",
                {
                    id: this.$route.query.id
                },
                data => {
                    document.title =
                        this.$t("title.teacherDetailTitle") +
                        "--" +
                        data[0].name;
                    this.teacherInfo = data[0];
                    this.courseList = data.list;
                }
            );
        }
    }
};
</script>
<style lang='less'
       scoped>
#teacherDetail {
    .no-data {
        padding: 50px 0;
        color: #999;
        text-align: center;
        border: none;
    }
    .teacherTitle {
        height: 58px;
        line-height: 59px;
        border-bottom: 1px solid #dedede;
        padding-left: 22px;
        font-size: 16px;
        color: #333;
    }
    .teacherInfo {
        height: 528px;
        background-color: #fff;
        margin-top: 45px;
        border-radius: 2px;
        .teacherMsg {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            padding: 0 40px;
            span {
                height: 120px;
                width: 120px;
                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                }
            }
            p {
                font-size: 16px;
                color: #333;
            }
            p:nth-of-type(1) {
                line-height: 16px;
                margin-top: 16px;
            }
            p:nth-of-type(2) {
                line-height: 16px;
                margin-top: 14px;
            }
            p:nth-of-type(3) {
                margin-top: 34px;
            }
        }
    }
    .teacherCourse {
        border-radius: 2px;
        margin-top: 20px;
        background-color: #fff;
        .courseList {
            display: flex;
            // justify-content: space-between;
            // flex-wrap: wrap;
            flex-flow: row wrap;
            padding: 20px;
            .courseItem {
                display: flex;
                flex-direction: column;
                width: 280px;
                margin-bottom: 26px;
                border-radius: 6px;
                overflow: hidden;
                background-color: #fff;
                box-shadow: 0px 2px 5px RGBA(43, 63, 90, 0.1);
                transition: all 0.4s;
                margin-right: 13px;
                &:hover {
                    box-shadow: 0px 2px 9px RGBA(43, 63, 90, 0.4);
                }
                .img-cont {
                    height: 150px;
                    overflow: hidden;
                    text-align: center;
                    img {
                        width: 100%;
                    }
                }
                a:first-child {
                    display: flex;
                    flex-direction: column;
                    img {
                        border-top-left-radius: 6px;
                        border-top-left-radius: 6px;
                    }
                    div {
                        height: 77px;
                        border-bottom: 1px solid #ddd;
                        padding: 15px 10px 18px 10px;
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
                            display: flex;
                            justify-content: space-between;
                            span:first-child {
                                height: 18px;
                                display: flex;
                                align-items: center;
                                font-size: 14px;
                                color: #fc583d;
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
                .t-info-cont {
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 2px 0 10px;
                    span {
                        font-size: 14px;
                        color: #666;
                        &:first-child {
                            display: flex;
                        }
                        &.t-posi {
                            margin-top: 3px;
                            font-size: 12px;
                        }
                    }
                    img {
                        height: 20px;
                        width: 20px;
                        margin-right: 5px;
                        border-radius: 50%;
                    }
                }
            }
            .courseItem:nth-child(4n) {
                margin-right: 0;
            }
        }
    }
}
</style>

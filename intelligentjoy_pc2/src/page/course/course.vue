<template>
    <div class="course centerBox">
        <div class="top">
            <div class="mySwiper">
                <swiper v-if="banner.length" :options="courseSwiperOption" ref="myBanner">
                    <swiper-slide v-for="(item,index) in banner" :key="index">
                        <a :href="item.ad_data" v-if="item.ad_type == 1">
                            <img :src="item.banner" alt="" />
                        </a>
                        <router-link :to="{ name: 'courseDetail', query: {id: item.ad_data} }" v-if="item.ad_type == 2">
                            <img :src="item.banner" alt="" />
                        </router-link>
                        <a :href="'http://www.intelligentjoy.com/activity/#/columnDetail?id='+item.ad_data" v-if="item.ad_type == 3">
                            <img :src="item.banner" alt="" />
                        </a>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="box"><img src="./images/2@2x.png" /></div>
        </div>
        <div :class="['tab',tabIndexClass]">
            <a href="javascript:;" @click="tab(1)" :class="[courseType==1?'active':'']">
                {{ $t("course.hot") }}
            </a>
            <a href="javascript:;" @click="tab(2)" :class="[courseType==2?'active':'']">
                {{ $t("course.new") }}
            </a>
            <!-- <a href="javascript:;" @click="tab(3)" :class="[courseType==3?'active':'']">
        {{ $t("course.price") }}
      </a> -->
        </div>
        <div class="centerBox courseList">
            <div class="courseItem" v-for="(item,index) in curData" :key="index">
                <router-link :to="{ name: 'courseDetail', query: {id: item.id} }">
                    <span class="img-cont"><img :src="item.cover" alt=""></span>
                    <div class="">
                        <p>{{item.video_title}}</p>
                        <p>
                            <span v-if="item.t_price!=0">
                                {{item.unit}}
                                <span>{{item.t_price}}</span>
                            </span>
                            <span v-else class="c-r">{{$t('courseDetail.3')}}</span>
                            <span v-if="false">{{item.buy_num}}人在{{ $t("course.1") }}</span>
                        </p>
                    </div>
                    <p class="t-info-cont">
                        <span>
                            <img :src="item.teacher_avatar" alt="">
                            <span>{{item.teacher_name}}</span>
                        </span>
                        <span class="t-posi">{{item.teacher_position}}</span>
                    </p>
                </router-link>
            </div>
        </div>
        <el-pagination background layout="pager" @current-change="getCourceList" :page-size="count" :current-page="curPage[courseType-1]" :total="totalNum[courseType-1]">
        </el-pagination>
    </div>
</template>

<script>
import "!style-loader!css-loader!swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    name: "course",
    data() {
        return {
            courseSwiperOption: {
                effect: "coverflow",
                initialSlide: 1,
                slidesPerView: 1.8,
                centeredSlides: true,
                loop: true,
                init: false,
                autoplay: true,
                coverflowEffect: {
                    rotate: 55,
                    stretch: 155,
                    depth: 300,
                    slideShadows: true
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            },
            courseType: 1, // 1 最热 2 最新 3 价格
            curDataType: ["hot", "new", ""],
            tabIndexClass: "tab_1",
            banner: [],
            curData: {}, //当前显示数据
            curStatusData: [], //所有数据
            count: 1000, //单页显示数量
            curPage: [1, 1, 1], //当前页
            totalNum: [1, 1, 1] //总数据数
        };
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        this.getCourceList(1);
    },
    methods: {
        tab(type) {
            this.courseType = type;
            this.tabIndexClass = "tab_" + type;

            this.getCourceList(this.curPage[this.courseType - 1]);
        },
        getCourceList(page) {
            window.scrollTo(0, 0);
            this.curPage[this.courseType - 1] = page;
            this.http(
                "get",
                "common/common/courseList",
                {
                    type: this.curDataType[this.courseType - 1],
                    page_size: this.count,
                    page: page
                },
                data => {
                    this.banner = data.banner;
                    this.curData = data.courseList;
                    this.curStatusData[this.courseType - 1] = data.courseList;
                    this.totalNum[this.courseType - 1] = data.count;
                    setTimeout(() => {
                        this.$refs.myBanner.swiper.params.loopedSlides = this.banner.length;
                        this.$refs.myBanner.swiper.init();
                    }, 0);
                }
            );
        }
    }
};
</script>

<style lang="less">
.course {
    .top {
        display: flex;
        height: 430px;
        margin-top: 36px;
        align-items: center;
        justify-content: space-between;

        .mySwiper {
            width: 880px;
            // height: 78%;
            overflow: hidden;
            position: relative;
            .swiper-container {
                height: 100%;
                padding-bottom: 20px;
                .swiper-slide {
                    border-radius: 10px;
                    overflow: hidden;
                    a {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        // border:1px solid #f00;
                        img {
                            width: 100%;
                        }
                    }
                }
                .swiper-slide-prev {
                    box-shadow: 7px 11px 23px rgba(0, 0, 0, 0.6);
                }
                .swiper-slide-next {
                    box-shadow: -7px 11px 23px rgba(0, 0, 0, 0.6);
                }
            }
            &:hover {
                .swiper-button-next,
                .swiper-button-prev {
                    opacity: 1;
                }
            }
            .swiper-button-next,
            .swiper-button-prev {
                height: 280px;
                width: 196px;
                top: 0;
                background-image: url("./images/arrow.png");
                opacity: 0.5;
                cursor: pointer;
                transition: opacity 0.3s;
            }
            .swiper-button-next {
                right: 0;
            }
            .swiper-button-prev {
                left: 0;
                transform: rotate(180deg);
            }
            // .swiperRight{

            // }
        }
        .box {
            width: 300px;
            height: 430px;
            border-radius: 10px;
            background-color: rgba(99, 172, 255, 0.1);
        }
    }
    .tab {
        display: flex;
        margin-top: 35px;
        margin-bottom: 40px;
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
    .courseList {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .courseItem {
            display: flex;
            flex-direction: column;
            width: 280px;
            margin-bottom: 26px;
            margin-right: 26px;
            border-radius: 6px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0px 2px 5px RGBA(43, 63, 90, 0.1);
            transition: all 0.4s;
            &:hover {
                box-shadow: 0px 2px 9px RGBA(43, 63, 90, 0.4);
            }
            &:nth-child(4n) {
                margin-right: 0;
            }
            a:first-child {
                display: flex;
                flex-direction: column;
                .img-cont {
                    display: inline-block;
                    overflow: hidden;
                    height: 150px;
                    text-align: center;
                    img {
                        width: 100%;
                    }
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
                        align-items: center;
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
    }
}
</style>

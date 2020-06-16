<template lang="html">
  <div id="coupons">
    <p>{{$t('coupons.1')}}</p>
    <p v-if="curData.length == 0" class="no-data">{{$t("dataTip.1")}}</p>
    <ul class="couponList">
      <li v-for="(item,index) in curData">
        <div :class="[new Date().getTime()>item.end_time*1000 && item.status == 0?'off':'on']">
          <div class="left">
            <span>{{ txtTransf(item.coupon_type) }}</span>
            <span>{{ $t('coupons.1') }}</span>
          </div>
          <div class="right">
            <img src="./images/used.png" v-if="item.status != 0" />
            <span>{{$t('coupons.3')}}HK${{item.maxprice}}{{$t('coupons.4')}}</span>
            <span class="couponsMoney">HK${{item.price}}</span>
            <span>{{$t('coupons.5')}} {{item.ctime | showTime}}~{{item.end_time | showTime}}</span>
          </div>
        </div>
      </li>
    </ul>

    <el-pagination id="myCoursePagin" background layout="pager"
      :total="totalNum"
      :page-size="count"
      @current-change="getCouponsList" v-if="curData.length > 0">
    </el-pagination>
  </div>
</template>

<script>
import { showTime } from "@/assets/js/utils";
export default {
    data() {
        return {
            count: 10, //单页显示条数
            totalNum: 1,
            curData: {} //当前优惠券列表
        };
    },
    filters: {
        showTime(time) {
            return showTime(time).split(" ")[0];
        }
    },
    methods: {
        txtTransf(type) {
            switch (type) {
                case 1:
                    return this.$t("coupons.6");
                    break;
                case 2:
                    return this.$t("coupons.2");
                    break;
                case 3:
                    return this.$t("coupons.7");
                    break;
                case 4:
                    return this.$t("coupons.8");
                    break;
                case 5:
                    return this.$t("coupons.9");
                    break;
            }
        },
        getCouponsList(page) {
            window.scrollTo(0, 0);
            this.http(
                "get",
                "index.php?app=api&mod=Coupon&act=getMyCouponList",
                {
                    limit: this.count,
                    page: page
                },
                data => {
                    this.curData = data;
                    this.totalNum = parseInt(this.curData[0].count);
                }
            );
        }
    },
    mounted() {
        this.getCouponsList();
    }
};
</script>

<style lang="less">
#coupons {
    margin-bottom: 100px;
    min-height: 360px;
    > p:first-child {
        height: 58px;
        border-bottom: 1px solid #f2f2f2;
        line-height: 58px;
        padding-left: 20px;
        font-size: 16px;
        color: #333;
    }
    .no-data {
        padding: 50px 0;
        color: #999;
        text-align: center;
        border: none;
    }
    .couponList {
        display: flex;
        flex-wrap: wrap;
        padding: 0 30px 0 30px;
        justify-content: space-between;
        li {
            position: relative;
            margin-top: 30px;
            & > div {
                height: 178px;
                width: 445px;
                padding: 0 46px 0 30px;
                display: block;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                display: flex;
                justify-content: space-between;
                > div {
                    display: flex;
                    flex-direction: column;
                    span {
                        color: #fff;
                    }
                }
                .left {
                    margin-top: 57px;
                    span:first-child {
                        font-size: 24px;
                        line-height: 24px;
                    }
                    span:last-child {
                        font-size: 18px;
                        line-height: 18px;
                        margin-top: 9px;
                    }
                }
                .right {
                    margin-top: 44px;
                    align-items: flex-end;
                    span:first-child {
                        font-size: 18px;
                        line-height: 18px;
                    }
                    .couponsMoney {
                        font-size: 40px;
                        line-height: 40px;
                        font-weight: bold;
                        margin: 7px 0 32px 0;
                    }
                    span:last-child {
                        font-size: 14px;
                        line-height: 14px;
                    }
                }
                img {
                    position: absolute;
                    top: -5px;
                    right: -6px;
                }
            }
            .on {
                background-image: url("./images/on.png");
            }
            .off {
                background-image: url("./images/off.png");
            }
        }
    }
}
</style>

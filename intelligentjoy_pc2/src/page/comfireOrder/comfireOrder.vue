<template>
    <div id='comfireOrder' class="centerBox">
        <div class="header">
            <span>{{$t("comfireOrder.1")}}：</span>
            <span>{{uname}}</span>
        </div>
        <div class="steps">
            <div :class="['step',orderProcess==1?'stepActive':'']">
                <span>1</span>
                <span>{{$t("comfireOrder.2")}}</span>
            </div>
            <div :class="['step ',orderProcess==2?'stepActive':'']">
                <span>2</span>
                <span>支付</span>
            </div>
            <div :class="['step ',orderProcess==3?'stepActive':'']">
                <span>3</span>
                <span>{{$t("comfireOrder.3")}}</span>
            </div>
        </div>
        <div class="content">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <th width="460">{{$t("comfireOrder.4")}}</th>
                    <th width="200">有效期</th>
                    <th width="150">到期时间</th>
                    <th>{{$t("comfireOrder.5")}}</th>
                </tr>
                <tr>
                    <td>
                        <div class="tdBox goodsInfo">
                            <span>
                                <img :src="poster" alt="">
                            </span>
                            <span>{{goodsName}}</span>
                        </div>
                    </td>
                    <td>
                        <ul class="tdBox">
                            <li>永久</li>
                        </ul>
                    </td>
                    <td>
                        <div class="tdBox">
                            <span>永久</span>
                        </div>
                    </td>
                    <td>
                        <div class="tdBox price">
                            <span>{{payType==3?'HK$'+price.toFixed(2) : '￥'+(rate*price).toFixed(2)}}</span>
                            <span>{{payType==3?'HK$'+oldPrice.toFixed(2) : '￥'+(rate*oldPrice).toFixed(2)}}</span>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="options">
                <div class="payPrice">
                    <p>
                        <span>{{$t("comfireOrder.6")}}：</span>
                        <span>{{payType==3?'HK$'+price.toFixed(2):'￥'+(rate*price).toFixed(2)}}</span>
                    </p>
                    <div class="discounts">
                        <!-- 优惠券 -->
                        <div class="coupons" @click="couponsType = 1; getDiscountPrice()">
                            <span :class="['circle', couponsType == 1?'circleActive':'']"></span>
                            <span>{{$t("comfireOrder.7")}}</span>
                            <button @click="couponsListVisible=true; getConponsList(); " class="on" v-if="haveConpons">{{$t("comfireOrder.8")}}</button>
                            <button v-else>{{$t("comfireOrder.9")}}</button>
                        </div>
                        <!-- 优惠码 -->
                        <div class="couponsCode" @click="couponsType = 2; getDiscountPrice()">
                            <span :class="['circle', couponsType == 2?'circleActive':'']"></span>
                            <span>{{$t("comfireOrder.11")}}</span>
                            <input type="text" v-model="couponCode" :placeholder="$t('comfireOrder.12')">
                            <button @click="addConponCode">添加</button>
                        </div>
                    </div>
                    <p>{{$t("comfireOrder.13")}}</p>
                </div>
                <div class="payMethods">
                    <p>{{$t("comfireOrder.14")}}</p>
                    <div class="paymethodSelector" style="margin-bottom: 15px">
                        <div class="methodsItem" @click="payType=3">
                            <span :class="['circle ',payType==3?'circleActive ':' ']">

                            </span>
                            <span style="width: 410px;">
                                <img src="./images/paypal.png" alt="">
                            </span>
                        </div>
                    </div>
<!--                    <div class="paymethodSelector">-->
<!--                        <div class="methodsItem" @click="payType=1">-->
<!--                            <span :class="['circle ',payType==1?'circleActive ':' ']">-->

<!--                            </span>-->
<!--                            <span>-->
<!--                                <img src="./images/alipay.png" alt="">-->
<!--                            </span>-->
<!--                        </div>-->
<!--                        <div class="methodsItem" @click="payType=2">-->
<!--                            <span :class="['circle ',payType==2?'circleActive ':' ']">-->

<!--                            </span>-->
<!--                            <span>-->
<!--                                <img src="./images/wx.png" alt="">-->
<!--                            </span>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <div class="submit">
                    <p>
                        <span>{{$t("comfireOrder.15")}}：</span>
                        <span>{{payType==3?'HK$'+price:'￥'+parseInt(rate*price*100)/100}}</span>
                    </p>
                    <p>
                        <span>{{$t("comfireOrder.16")}}：</span>
                        <span>{{payType==3?'HK$'+parseInt(discountPrice*100)/100:'￥'+parseInt(rate*discountPrice*100)/100}}</span>
                    </p>
                    <p v-if="payType != 3" style="margin-top: 10px;">自動折算為港元</p>
                    <button @click="pay">{{$t("comfireOrder.17")}}</button>
                </div>
            </div>
        </div>
        <!-- 优惠券弹框 -->
        <el-dialog id="couponDialog" :title="$t('comfireOrder.10')" width="800px" :visible.sync="couponsListVisible">
            <div class="couponList">
                <ul>
                    <li v-for="(item,index) in curCouponsList" :key="index" @click="couponId = item.coupon_id; ciMinusPrice = item.price; getDiscountPrice();">
                        <!-- <span :class="['circle ',payType==2?'circleActive ':' ']"></span> -->
                        <span :class="[couponId == item.coupon_id? 'active' : '']"></span>
                        <div class="couponContent">
                            <div class="left">
                                <span>{{ txtTransf(item.coupon_type) }}</span>
                                <span>{{ $t('coupons.1') }}</span>
                            </div>
                            <div class="right">
                                <p>{{$t('coupons.3')}}{{'HK$'+item.maxprice}}可使用</p>
                                <!-- <p>{{$t('coupons.3')}}{{payType==3?'HK$'+parseFloat(item.maxprice).toFixed(2):'￥'+(rate*parseFloat(item.maxprice)).toFixed(2)}}可使用</p> -->
                                <p>{{'HK$'+item.price}}</p>
                                <p>有效期 {{item.stime | showTime}}~{{item.etime | showTime}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <el-pagination id="myCoursePagin" background layout="pager" :total="totalNum" :current-page="curPage" :page-size="count" @current-change="couponsSwitch" v-if="curCouponsList.length > 0"></el-pagination>
        </el-dialog>
        <!-- 支付中弹框 -->
        <el-dialog id="paying-dialog" :show-close="false" :close-on-click-modal="false" width="427px" :visible="payingVisible">
            <div class="p-wx-d" v-show="payType==2">
                <p>微信支付{{payType==3?'HK$'+discountPrice:'￥'+(rate*discountPrice).toFixed(2)}}</p>
                <div id="qrcode"></div>
                <p>{{$t("comfireOrder.18")}}</p>
            </div>
            <div class="p-other-d" v-if="payType!=2">
                <span class="loading-img"><img src="" /></span>
                <p>等待您完成支付...</p>
                <p :class="[payError?'error-tip':'']">{{payError?'未支付成功，':''}}{{$t("comfireOrder.19")}}{{payError?'！':''}}</p>
                <a href=" javascript:; " @click="getOrderStatus">支付完成</a>
            </div>

            <a href="javascript:; " class="close-ps-d " @click="switchPayType">{{$t("comfireOrder.20")}}</a>
        </el-dialog>
        <!-- 支付結果弹框 -->
        <el-dialog id="pay-status-dialog" :show-close="false" :close-on-click-modal="false" width="427px" :visible="payStatusVisible">
            <img src="./images/ok.png" v-if="payStatus" />
            <img src="./images/error.png" v-if="!payStatus" />
            <p>{{payStatus?"支付成功":"支付"+$t("comfireOrder.21")}}</p>
            <div style="margin: -30px 0 30px 0;">請到慧悅港股APP收看</div>
            <router-link :to="{name:'courseDetail', query:{id:$route.query.courseId}}" v-if="payStatus">{{$t("comfireOrder.22")}}</router-link>
            <a href="javascript:; " @click="$router.go(0)" v-if="!payStatus">重新支付</a>
        </el-dialog>
    </div>
</template>

<script>
import { getCookie } from "../../assets/js/mUtils";
import { showTime } from "@/assets/js/utils";
import QRCode from "qrcodejs2";
export default {
    data() {
        return {
            canSubmit: true, // 能否提交
            uname: decodeURI(sessionStorage["uname"]), //用戶名
            goodsName: "",
            poster: "",
            price: "",
            oldPrice: "",
            couponCode: "",
            discountPrice: "", //优惠后的价格
            orderProcess: 1, // 支付过程，1 购买 2 支付 3 支付结果
            payType: 3, //1 支付宝 2 微信 3 paypal
            couponsType: 1, // 1 优惠券 2 优惠码
            curCouponsType: 0, //折扣类型,(0:未享受,1:优惠券,2:优惠码,)
            couponId: 0, // 优惠券id
            ciMinusPrice: 0, // 优惠券优惠金额
            ccMinusPrice: 0, // 优惠码优惠金额
            couponsListVisible: false, // 优惠券列表弹框显示隐藏
            payingVisible: false, // 支付中弹框显示隐藏
            payStatusVisible: false, // 支付状态弹框显示隐藏
            rate: 1, //汇率
            haveConpons: false, //有无优惠券
            count: 6, // 单页显示条数
            curPage: 1, // 当前页
            couponsList: [], //优惠券列表
            curCouponsList: [], //当前显示优惠券列表
            totalNum: 0, // 总优惠券数据条数
            qrcodeObj: null, // 二维码实例
            firstexec: true, // 第一次执行
            orderId: "", //订单Id
            orderTimer: null, // 订单定时器
            payStatus: false, // 支付状态
            payError: false //未支付
        };
    },
    filters: {
        showTime(time) {
            return showTime(time).split(" ")[0];
        }
    },
    mounted() {
        this.getData();
        console.log(this.$route);
        if (this.$route.query.order_id) {
            this.showPayResult();
        }
    },
    methods: {
        showPayResult() {
            //显示订单结果
            // if(this)
            // this.orderId = 331421928235466752;

            this.orderId = this.$route.query.order_id;
            this.getOrderStatus();
        },
        txtTransf(type) {
            //转换优惠券类型文本
            type = parseInt(type);
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
        getData() {
            //获取课程数据详情
            this.http(
                "get",
                "common/common/courseDetails",
                {
                    id: this.$route.query.courseId
                },
                data => {
                    if (data.is_pay == 1) {
                        this.$router.replace({
                            name: "courseDetail",
                            query: {
                                id: this.$route.query.courseId
                            }
                        });
                    }
                    this.goodsName = data.video_title;
                    this.poster = data.cover;
                    this.price = data.t_price;
                    this.oldPrice = data.v_price;

                    this.getPayConfig(); //查询有无可用优惠券
                    this.getDiscountPrice();
                }
            );
        },
        getPayConfig() {
            //检查是否有可用优惠券
            this.http(
                "get",
                "column/common/payConfig",
                {
                    type: "course",
                    pid: 0,
                    cid: this.$route.query.courseId,
                    oldPrice: this.oldPrice,
                    price: this.price,
                    flag: 1
                },
                res => {
                    this.rate = res.rate;
                    this.haveConpons = res.coupon_status;
                }
            );
        },
        getConponsList() {
            //获取可用优惠券列表
            this.http(
                "get",
                "common/common/userCoupon",
                {
                    type: "course",
                    pid: 0,
                    cid: this.$route.query.courseId
                },
                data => {
                    this.couponsList = data;
                    this.couponsSwitch(1);
                    this.totalNum = data.length;
                }
            );
        },
        couponsSwitch(page) {
            //优惠券分页
            this.curPage = page;
            this.curCouponsList = this.couponsList.filter((item, index) => {
                return (
                    index >= (page - 1) * this.count &&
                    index < page * this.count
                );
            });
        },
        addConponCode() {
            //添加优惠码
            this.http(
                "get",
                "column/order/checkCouponCode",
                {
                    flag: 1,
                    coupon_code: this.couponCode, // 1827542586557210
                    price: this.price,
                    cid: this.$route.query.courseId,
                    type: "course"
                },
                res => {
                    this.ccMinusPrice = res.minus_price;
                    this.getDiscountPrice();
                },
                err => {
                    this.ccMinusPrice = 0;
                    this.getDiscountPrice();
                }
            );
        },
        getDiscountPrice() {
            // 获取优惠后的价格
            if (this.couponsType == 1 && this.couponId != 0) {
                this.curCouponsType = 1;
            } else if (this.couponsType == 2 && this.ccMinusPrice != 0) {
                this.curCouponsType = 2;
            } else {
                this.curCouponsType = 0;
            }

            if (this.curCouponsType == 1) {
                this.discountPrice =
                    (parseInt(this.price * 1000) -
                        parseInt(this.ciMinusPrice * 1000)) /
                    1000;
            } else if (this.curCouponsType == 2) {
                this.discountPrice =
                    (parseInt(this.price * 1000) -
                        parseInt(this.ccMinusPrice * 1000)) /
                    1000;
            } else {
                this.discountPrice = this.price;
            }
        },
        switchPayType() {
            // 重新选择支付方式
            if (!this.canSubmit) {
                this.canSubmit = true;
                this.payingVisible = false;
                // this.cancelOrder();
            }

            if (this.payType == 2) {
                clearInterval(this.orderTimer);
            }
        },
        pay() {
            //支付
            let payName = "";
            switch (this.payType) {
                case 1:
                    payName = "alipay_pc";
                    break;
                case 2:
                    payName = "wxpay_pc";
                    break;
                case 3:
                    payName = "paypal";
                    break;
            }

            this.getDiscountPrice();
            let host = "";
            if (location.href.indexOf("192.168") != -1) {
                host = "zkg6655175.nat123.cc:58257";
            } else if (
                location.href.indexOf("http://pc_test.intelligentjoy.com/") !=
                -1
            ) {
                host = "test.intelligentjoy.com";
            } else {
                host = "www.intelligentjoy.com";
            }
            let from = location.href.split("?")[0] + "?";
            for (let k in this.orderInfo) {
                if (k != "pay_status" && k != "order_id") {
                    from = from + "&" + k + "=" + this.orderInfo[k];
                }
            }
            // let from = window.location.href.replace("?&", "?");
            // //ios添加設備標示和語言標示
            // if (this.temerial == "app_ios") {
            //     from =
            //         from +
            //         "&temerial=" +
            //         this.temerial +
            //         "&locale=" +
            //         this.locale;
            // }
            if (this.canSubmit) {
                this.canSubmit = false;
                this.http(
                    "get",
                    "column/order/payLibrary",
                    {
                        flag: 1,
                        coupon_id: this.curCouponsType == 1 ? this.couponId : 0,
                        price: this.discountPrice,
                        cid: this.$route.query.courseId,
                        pid: 0,
                        pay_type: payName,
                        coupon_code:
                            this.curCouponsType == 2 ? this.couponCode : 0,
                        type: "course",
                        from: encodeURIComponent(window.location.href),
                        discount_type: this.curCouponsType,
                        host: host
                    },
                    data => {
                        if (this.discountPrice == 0) {
                            this.payStatus = true;
                            this.orderProcess = 3;
                            this.payingVisible = false;
                            this.payStatusVisible = true;
                        } else {
                            this.orderProcess = 2;
                            this.payingVisible = true;
                            this.orderId = data.order_id;

                            if (this.payType != 2) {
                                //非微信支付
                                window.open(data.url);
                            } else {
                                if (this.firstexec) {
                                    this.firstexec = false;
                                    var timer = setTimeout(() => {
                                        this.qrcodeObj = new QRCode("qrcode", {
                                            width: 180,
                                            height: 180,
                                            colorDark: "#333"
                                        });
                                        this.qrcodeObj.makeCode(data.url);
                                        clearTimeout(timer);
                                    }, 0);
                                } else {
                                    this.qrcodeObj.makeCode(data.url);
                                }

                                this.orderTimer = setInterval(() => {
                                    this.getOrderStatus();
                                }, 2000);
                            }
                        }
                    },
                    errMsg => {
                        this.canSubmit = true;
                    }
                );
            }
        },
        getOrderStatus() {
            console.log(this.orderId);

            // 获取订单状态
            this.http(
                "get",
                "column/order/detail",
                {
                    order_id: this.orderId,
                    type: "course",
                    flag: 1
                },
                res => {
                    this.payStatus = res.pay_status == 3 ? true : false;

                    if (this.payType == 2 && this.payStatus) {
                        clearInterval(this.orderTimer);
                    }
                    if (this.payStatus) {
                        //完成支付
                        this.orderProcess = 3;
                        this.payingVisible = false;
                        this.payStatusVisible = true;
                    } else {
                        //未完成
                        if (this.payType != 2) {
                            this.payError = true;
                        }
                    }
                }
            );
        },
        cancelOrder() {
            //取消订单
            this.http(
                "get",
                "column/order/cancle",
                {
                    order_id: this.orderId,
                    type: "course"
                },
                data => {
                    this.delOrder();
                }
            );
        },
        delOrder() {
            //删除订单
            this.http(
                "get",
                "column/order/delete",
                {
                    order_id: this.orderId,
                    type: "course"
                },
                data => {
                    this.orderProcess = 1;
                    this.payingVisible = false;
                    this.payError = false;
                }
            );
        }
    }
};
</script>
<style lang='less'>
#comfireOrder {
    margin-top: 30px;
    button {
        cursor: pointer;
    }
    .header {
        height: 80px;
        line-height: 80px;
        border-radius: 2px;
        padding-left: 30px;
        span {
            font-size: 16px;
            color: #333;
        }
        span:first-child {
            color: #999999;
        }
    }
    .steps {
        height: 160px;
        padding: 48px 180px 0 180px;
        display: flex;
        justify-content: space-between;
        position: relative;
        &::before {
            content: "";
            width: 800px;
            height: 3px;
            background-color: #ddd;
            position: absolute;
            top: 67px;
            left: 200px;
        }
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 99;
            span:first-child {
                height: 40px;
                width: 40px;
                background-color: #dddddd;
                color: #999;
                font-size: 20px;
                text-align: center;
                line-height: 40px;
                border-radius: 50%;
            }
            span:last-child {
                font-size: 16px;
                color: #999;
                line-height: 16px;
                margin-top: 16px;
            }
        }
        .stepActive {
            span:first-child {
                background-color: #63acff;
                color: #fff;
            }
            span:last-child {
                color: #63acff;
            }
        }
    }
    .content {
        background-color: #fff;
        padding: 0 30px;
        padding-top: 40px;
        table {
            width: 100%;
            tr:first-child {
                height: 50px;
                th {
                    padding: 0;
                    border-bottom: 1px solid #ddd;
                    font-size: 18px;
                    color: #333;
                    font-weight: normal;
                }
                th:first-child {
                    text-align: left;
                }
            }
            tr:last-child {
                td {
                    border-bottom: 1px solid #ddd;
                }
                .tdBox {
                    height: 220px;
                    padding-top: 30px;
                    display: flex;
                    justify-content: center;
                    li {
                        color: #333;
                        font-size: 16px;
                    }
                    span {
                        color: #333;
                        font-size: 16px;
                    }
                }
                .goodsInfo {
                    justify-content: flex-start;
                    span:first-child {
                        height: 140px;
                        width: 210px;
                        img {
                            width: 100%;
                        }
                    }
                    span:last-child {
                        color: #333;
                        font-size: 16px;
                        width: 180px;
                        margin-top: 10px;
                        margin-left: 16px;
                    }
                }
                .price {
                    span {
                        line-height: 30px;
                    }
                    span:first-child {
                        font-weight: bold;
                        font-size: 24px;
                        color: #fc583d;
                    }
                    span:last-child {
                        color: #999;
                        text-decoration: line-through;
                        font-size: 14px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
    .options {
        padding: 50px 10px 200px 10px;
        button {
            background-color: inherit;
            border-radius: 2px;
            padding: 0;
            font-size: 16px;
            outline: none;
            border: none;
        }
        .circle {
            display: inline-block;
            height: 14px;
            width: 14px;
            border: 1px solid #666;
            border-radius: 50%;
            position: relative;
        }
        .circleActive {
            &:after {
                content: "";
                position: absolute;
                height: 6px;
                width: 6px;
                background-color: #999;
                border-radius: 50%;
                top: 3px;
                left: 3px;
            }
        }
        .payPrice {
            > p:first-child {
                span {
                    font-size: 18px;
                    color: #333;
                    line-height: 18px;
                }
                span:last-child {
                    color: #fc583d;
                    font-weight: bold;
                }
            }
            > p:last-child {
                padding-left: 20px;
                font-size: 14px;
                color: #fc583d;
                margin-top: 26px;
            }
            .discounts {
                display: flex;
                align-items: center;
                margin-top: 14px;
                padding-left: 20px;
                .coupons,
                .couponsCode {
                    display: flex;
                    align-items: center;
                    > span:nth-of-type(2) {
                        font-size: 16px;
                        color: #333;
                        margin: 0 10px;
                    }
                }
                .coupons {
                    button {
                        height: 38px;
                        width: 196px;
                        outline: none;
                        border-radius: 0;
                        border: 1px solid #ddd;
                        color: #a9a9a9;
                        cursor: default;
                        &.on {
                            color: #63acff;
                            cursor: pointer;
                        }
                    }
                }
                .couponsCode {
                    margin-left: 80px;
                    button {
                        height: 40px;
                        width: 100px;
                        background-color: #bbb;
                        color: #fff;
                        &:hover {
                            background: #63acff;
                        }
                    }
                    input {
                        height: 38px;
                        width: 196px;
                        font-size: 16px;
                        box-sizing: border-box;
                        margin: 0 20px 0 10px;
                        padding-left: 10px;
                        border: 1px solid #ddd;
                        &:focus {
                            outline: none;
                            border: 1px solid #63acff;
                        }
                    }
                }
            }
        }
        .payMethods {
            margin-top: 60px;
            > p {
                color: #333;
                font-size: 18px;
                margin-bottom: 20px;
            }
            .paymethodSelector {
                display: flex;
                padding-left: 20px;
                .methodsItem {
                    display: flex;
                    align-items: center;
                    margin-right: 37px;
                    cursor: pointer;
                    > span:last-child {
                        height: 40px;
                        width: 150px;
                        margin-left: 17px;
                        border: 1px solid #999;
                        img {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
        }
        .submit {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-top: 120px;

            p {
                span {
                    font-size: 18px;
                    line-height: 18px;
                    color: #333;
                }
                span:last-child {
                    font-weight: bold;
                    color: #fc583d;
                }
            }
            p:first-child {
                margin-bottom: 12px;
                span {
                    font-weight: normal;
                    font-size: 16px;
                    color: #333;
                }
            }
            button {
                height: 56px;
                width: 170px;
                background-color: #fc583d;
                font-size: 20px;
                color: #fff;
                margin-top: 40px;
            }
        }
    }
    #couponDialog {
        .el-dialog__body {
            background-color: #eee;
            padding: 30px 20px 0;
            .couponList {
                height: 390px;
                ul {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li {
                        display: flex;
                        align-items: center;
                        width: 50%;

                        margin-bottom: 20px;
                        cursor: pointer;
                        > span {
                            position: relative;
                            height: 20px;
                            width: 20px;
                            border: 1px solid #999;
                            border-radius: 50%;
                            margin-right: 20px;
                            &.active:after {
                                content: "";
                                position: absolute;
                                height: 10px;
                                width: 10px;
                                background-color: #999;
                                border-radius: 50%;
                                top: 4px;
                                left: 4px;
                            }
                        }
                        .couponContent {
                            background-color: #63acff;
                            border-radius: 4px;
                            width: 320px;
                            height: 110px;
                            display: flex;
                            span,
                            p {
                                color: #fff;
                            }
                            .left {
                                width: 30%;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                border-right: 1px dashed #fff;
                                position: relative;
                                &:before,
                                &:after {
                                    content: "";
                                    position: absolute;
                                    height: 20px;
                                    width: 20px;
                                    background-color: #eee;
                                    border-radius: 50%;
                                    right: -10px;
                                }
                                &:before {
                                    top: -10px;
                                }
                                &:after {
                                    bottom: -10px;
                                }
                                span {
                                    font-size: 18px;
                                }
                                span:last-child {
                                    font-size: 14px;
                                }
                            }
                            .right {
                                padding-top: 20px;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                                flex: 1;
                                padding-right: 20px;
                                p:nth-of-type(1) {
                                    font-size: 14px;
                                }
                                p:nth-of-type(2) {
                                    font-size: 18px;
                                }
                                p:nth-of-type(3) {
                                    margin-top: 10px;
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                }
            }
            .el-pagination {
                padding: 30px 0 50px;
                margin: 0;
            }
        }
    }
    #paying-dialog {
        .el-dialog {
            padding: 30px 0 42px;
            text-align: center;
            border-radius: 10px;
            font-weight: bold;
            .el-dialog__header,
            .el-dialog__body {
                padding: 0;
            }
            .el-dialog__body {
                .p-wx-d {
                    p {
                        font-size: 20px;
                        color: #222;
                        &:last-child {
                            padding-bottom: 26px;
                            font-size: 14px;
                            color: #8c8c8c;
                        }
                    }
                    #qrcode img {
                        margin: 14px auto;
                    }
                }
                .p-other-d {
                    .loading-img {
                        display: inline-block;
                        width: 120px;
                        height: 120px;
                        margin-bottom: 28px;
                        background: #eee;
                        border-radius: 100%;
                    }
                    p {
                        font-size: 20px;
                        color: #222;
                        & + p {
                            padding: 14px 0 26px;
                            font-size: 14px;
                            color: #8c8c8c;
                            &.error-tip {
                                color: #fc583d;
                            }
                        }
                    }
                    a {
                        display: block;
                        width: 232px;
                        height: 44px;
                        margin: 0 auto 62px;
                        line-height: 44px;
                        border-radius: 44px;
                        font-size: 14px;
                        color: #fff;
                        background: #2c2c2c;
                    }
                }
                .close-ps-d {
                    display: inline-block;
                    line-height: 14px;
                    font-size: 14px;
                    color: #8c8c8c;
                    border-bottom: 1px solid #8c8c8c;
                }
            }
        }
    }
    #pay-status-dialog .el-dialog {
        padding: 25px 0 53px;
        border-radius: 10px;
        text-align: center;
        font-weight: bold;
        .el-dialog__header,
        .el-dialog__body {
            padding: 0;
        }
        .el-dialog__body {
            img {
                width: 130px;
                height: 130px;
                border-radius: 100%;
            }
            p {
                padding: 23px 0 54px;
                font-size: 20px;
                color: #222;
            }
            a {
                display: block;
                width: 232px;
                height: 44px;
                line-height: 44px;
                margin: 0 auto;
                color: #fff;
                font-size: 14px;
                background: #2c2c2c;
                border-radius: 44px;
            }
        }
    }
}
</style>

<template lang="html">
  <div id="myOrder">
    <div class="top">
      <div :class="['tab',tabIndexClass]">
        <a href="javascript:;" @click="tab(1)" :class="[courseType==1?'active':'']">
          全部
        </a>
        <a href="javascript:;" @click="tab(2)" :class="[courseType==2?'active':'']">
          已支付
        </a>
        <a href="javascript:;" @click="tab(3)" :class="[courseType==3?'active':'']">
          未支付
        </a>
        <a href="javascript:;" @click="tab(4)" :class="[courseType==4?'active':'']">
          已取消
        </a>
      </div>
      <div class="right" @click="delCtr = !delCtr; allSelect()" v-if="curData.length != 0">
        <img src="./images/delet.png" alt="">
        <span>{{delCtr? '取消'+$t("myOrder.4") : $t("myOrder.1") }}</span>
      </div>
    </div>
    <p v-if="curData.length == 0" class="no-data">{{$t("dataTip.1")}}</p>
    <ul class="orderList"  v-if="curData.length != 0">
      <p class="delBar" v-show="delCtr">
        <span @click="allSbtn ? noneSelect() : allSelect()">
          <img src="./images/delActive@2x.png" alt="" v-show = 'allSbtn'>
        </span>
        <span>{{$t("myOrder.5")}}</span>
        <button type="button" name="button" @click="editConfirm($t('myOrder.4'), deleteMultiOrder, 'md')">批量永久{{$t("myOrder.4")}}</button>
        <!-- <button type="button" name="button" @click="deleteMultiOrder()">批量永久删除</button> -->
      </p>
      <li v-for="(item,index) in curData">
        <div>
          <div class="orderTop">
            <div class="left">
              <i @click="getSelectOrder(index)" v-if="canDel(index)" v-show="delCtr" >
                <img src="./images/delActive@2x.png" alt="" v-show="multiDelArr.indexOf(index) != -1">
              </i>
              <span>{{$t('myOrder.2')}}：</span>
              <span>{{item.rel_id}}</span>
              <span>{{ item.create_time | showTime }}</span>
            </div>
            <img src="./images/delet.png" alt="" v-if="canDel(index)" @click.stop="editConfirm($t('myOrder.4'), editSingleOrder, 'd', item.rel_id, item.type)" />
          </div>
          <div class="orderContent">
            <img :src="item.cover" alt="" />
            <div class="courseInfo">
              <p>{{item.product_name}}</p>
              <span>{{item.product_type}}</span>
            </div>
            <div class="payInfo">
              <span>{{item.unit+item.price}}</span>
              <span>支付方式：{{ getPayType(item.pay_type) }}</span>
            </div>
            <div class="orderStatus">
              <span>{{item.pay_status_name}}</span>
            </div>
            <div class="optionButtons" v-if="!canDel(index)">
              <button type="button" name="button" @click="toPay(index)">去支付</button>
              <button type="button" name="button" @click.stop="editConfirm('取消', editSingleOrder, 'c', item.rel_id, item.type)">{{$t('myOrder.3')}}</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination id="myOrderPagin"
      background
      layout="pager"
      :page-size="count"
      @current-change="getOrderList"
      :current-page="curPage[curDataType[courseType-1]]"
      :total="totalNum[curDataType[courseType-1]]">
    </el-pagination>
    <!-- 支付中弹框 -->
        <el-dialog id="paying-dialog" :close-on-click-modal="false" width="427px" :visible.sync="payingVisible" @close="closeDialog">
            <div class="p-wx-d" v-show="curPayType=='wxpay_pc'">
                <p>微信支付{{payUnit}}{{payPrice}}</p>
                <div id="qrcode"></div>
                <p>{{$t("comfireOrder.18")}}</p>
            </div>
            <div class="p-other-d" v-if="curPayType!='wxpay_pc'">
                <span class="loading-img"><img src="" /></span>
                <p>等待您完成支付...</p>
                <p :class="[payError?'error-tip':'']">{{payError?'未支付成功，':''}}{{$t("comfireOrder.19")}}{{payError?'！':''}}</p>
                <a href=" javascript:; " @click="getOrderStatus">支付完成</a>
            </div>
        </el-dialog>
        <!-- 支付結果弹框 -->
        <el-dialog id="pay-status-dialog" :close-on-click-modal="false" width="427px" :visible.sync="payStatusVisible" @close="closeDialog">
            <img src="./images/ok.png" />
            <p>支付成功</p>
            <router-link :to="{name:'courseDetail', query:{id:curCourseId}}">{{$t("comfireOrder.22")}}</router-link>
        </el-dialog>
  </div>
</template>

<script>
import { showTime } from "@/assets/js/utils";
import QRCode from "qrcodejs2";
export default {
    name: "myOrder",
    data() {
        return {
            canSubmit: true, //能否提交
            courseType: 1, // 1 全部 2 已支付 3 未支付 4 已取消
            curDataType: ["all", "completed", "unfinished", "cancelled"],
            tabIndexClass: "tab_1",
            delCtr: false, //true 显示批量删除 false 隐藏批量删除
            allSbtn: false, //是否全选中
            count: 10, //单页显示数量
            curData: {}, //当前显示数据
            totalNum: { all: 0, completed: 0, unfinished: 0, cancelled: 0 }, //总数据数
            curPage: { all: 1, completed: 0, unfinished: 0, cancelled: 0 }, //当前页
            curStatusData: {
                all: {},
                completed: {},
                unfinished: {},
                cancelled: {}
            },
            curEditNum: 0, //当前处理掉的数据条数
            multiDelArr: [], //批量删除数组
            curPayType: "", //当前支付类型
            curOrderType: "", //当前类型， course,column
            payingVisible: false, // 支付中弹框显示隐藏
            payStatusVisible: false, // 支付状态弹框显示隐藏
            qrcodeObj: null, // 二维码实例
            firstexec: true, // 第一次执行
            curOrderId: "", //订单Id
            curCourseId: "", //课程id
            orderTimer: null, // 订单定时器
            payPrice: 0, // 支付价格
            payUnit: "", // 支付单位
            payError: false //未支付
        };
    },
    filters: {
        showTime(time) {
            return showTime(time);
        }
    },
    methods: {
        tab(type) {
            this.courseType = type;
            this.tabIndexClass = "tab_" + type;

            if (this.curPage[this.curDataType[this.courseType - 1]] == 0) {
                this.getOrderList(
                    this.curPage[this.curDataType[this.courseType - 1]] + 1
                );
            }

            this.curData = this.curStatusData[
                this.curDataType[this.courseType - 1]
            ];
        },
        allSelect() {
            //全选
            this.multiDelArr = [];
            this.curData.forEach((item, index) => {
                if (
                    (item.type == "column" &&
                        item.pay_status != 0 &&
                        item.pay_status != 3) ||
                    (item.type == "course" && item.pay_status != 1)
                ) {
                    this.multiDelArr.push(index);
                }
            });
            this.allSbtn = true;
        },
        noneSelect() {
            //全不选
            this.multiDelArr = [];
            this.allSbtn = false;
        },
        getPayType(type) {
            if (type == "offline") {
                return this.$t("myOrder.11"); //atm
            } else if (type == "paypal") {
                return "信用卡"; //paypay
            } else if (type.indexOf("alipay") != -1) {
                return this.$t("myOrder.12"); //alipay
            } else if (type.indexOf("wx") != -1) {
                return "微信"; //wxpay
            } else {
                return "applePay"; //applePay
            }
        },
        getSelectOrder(index) {
            if (this.multiDelArr.indexOf(index) < 0) {
                this.multiDelArr.splice(index, 0, index);
            } else {
                this.multiDelArr.splice(this.multiDelArr.indexOf(index), 1);
            }
        },
        canDel(index) {
            if (
                (this.curData[index].type == "column" &&
                    (this.curData[index].pay_status == 0 ||
                        this.curData[index].pay_status == 3)) ||
                (this.curData[index].type == "course" &&
                    this.curData[index].pay_status == 1)
            ) {
                return false;
            }
            return true;
        },
        editConfirm(txt, funcN, ...funcP) {
            let [a, b] = funcP;
            if (a == "md" && this.multiDelArr.length == 0) {
                this.$message({
                    type: "error",
                    message: this.$t("myOrder.10")
                });
            } else if (this.canSubmit) {
                this.$confirm(
                    this.$t("myOrder.8") + txt + this.$t("myOrder.9"),
                    this.$t("myOrder.7") + txt,
                    {
                        confirmButtonText: this.$t("myOrder.6"),
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        funcN(...funcP);
                    })
                    .catch(() => {});
            }
        },
        getOrderList(page) {
            window.scrollTo(0, 0);
            this.curPage[this.curDataType[this.courseType - 1]] = page;

            if (this.curEditNum != 0) {
                page = Math.min(
                    Math.ceil(
                        (this.totalNum[this.curDataType[this.courseType - 1]] -
                            this.curEditNum) /
                            this.count
                    ),
                    page
                );
            }

            this.http(
                "get",
                "column/order/list",
                {
                    page: page,
                    count: this.count,
                    type: this.curDataType[this.courseType - 1]
                },
                data => {
                    this.curData = data;
                    this.curStatusData[
                        this.curDataType[this.courseType - 1]
                    ] = data;
                    this.totalNum[this.curDataType[this.courseType - 1]] =
                        data[0].count;
                    this.curEditNum = 0;
                }
            );
        },
        deleteMultiOrder(idArr, type) {
            console.log("多删除");
            this.canSubmit = false;

            let finalArr = [];
            this.multiDelArr.forEach((item, index) => {
                let curOrderInfo = {
                    id: this.curData[item].rel_id,
                    type: this.curData[item].type
                };
                finalArr.push(curOrderInfo);
            });
            // console.log(JSON.stringify(finalArr));

            this.http(
                "post",
                "column/order/deleteSelect",
                {
                    order_id: finalArr
                },
                data => {
                    this.$message({
                        type: "success",
                        message:
                            this.$t("myOrder.8") +
                            this.$t("myOrder.4") +
                            "成功!"
                    });
                    this.curEditNum += this.multiDelArr.length;
                    this.getOrderList(
                        this.curPage[this.curDataType[this.courseType - 1]]
                    );
                    this.canSubmit = true;
                },
                errMsg => {
                    this.canSubmit = true;
                }
            );
        },
        editSingleOrder(tag, id, type) {
            this.canSubmit = false;
            let url =
                tag == "d" ? "column/order/delete" : "column/order/cancle"; //'d'为删除，否则为取消

            this.http(
                "get",
                url,
                {
                    order_id: id,
                    type: type
                },
                data => {
                    this.$message({
                        type: "success",
                        message:
                            tag == "d"
                                ? this.$t("myOrder.8") +
                                  this.$t("myOrder.4") +
                                  "成功!"
                                : this.$t("myOrder.8") + "取消成功!"
                    });
                    ++this.curEditNum;
                    this.getOrderList(
                        this.curPage[this.curDataType[this.courseType - 1]]
                    );
                    this.canSubmit = true;
                },
                errMsg => {
                    this.canSubmit = true;
                }
            );
        },
        toPay(index) {
            this.curOrderType = this.curData[index].type;
            this.curPayType = this.curData[index].pay_type;
            this.curOrderId = this.curData[index].rel_id;
            this.curCourseId = this.curData[index].cid;
            this.payPrice = this.curData[index].price;
            this.payUnit = this.curData[index].unit;
            //去支付
            let host = "";
            if (location.href.indexOf("192.168") != -1) {
                host = "192.168.1.6";
            } else if (
                location.href.indexOf("http://pc_test.intelligentjoy.com/") !=
                -1
            ) {
                host = "test.intelligentjoy.com";
            } else {
                host = "www.intelligentjoy.com";
            }
            if (this.canSubmit) {
                this.canSubmit = false;
                this.payingVisible = true;
                this.http(
                    "get",
                    "column/order/payLibraryContinue",
                    {
                        flag: 1,
                        type: this.curOrderType,
                        pay_type: this.curPayType,
                        order_id: this.curOrderId,
                        from: window.location.href,
                        host: host
                    },
                    data => {
                        // this.payingVisible = true;
                        if (this.curPayType != "wxpay_pc") {
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
                    },
                    errMsg => {
                        this.canSubmit = true;
                    }
                );
            }
        },
        getOrderStatus() {
            // 获取订单状态
            this.http(
                "get",
                "column/order/detail",
                {
                    order_id: this.curOrderId,
                    type: this.curOrderType,
                    flag: 1
                },
                res => {
                    this.payStatusVisible = res.pay_status == 3 ? true : false;

                    if (
                        this.curPayType == "wxpay_pc" &&
                        this.payStatusVisible
                    ) {
                        clearInterval(this.orderTimer);
                    }
                    if (this.payStatusVisible) {
                        //完成支付
                        this.payingVisible = false;
                    } else {
                        //未完成
                        if (this.curPayType != "wxpay_pc") {
                            this.payError = true;
                        }
                    }
                }
            );
        },
        closeDialog() {
            // 关闭弹框
            this.canSubmit = true;
            this.payError = false;
            if (this.curPayType == "wxpay_pc") {
                clearInterval(this.orderTimer);
            }
        }
    },
    mounted() {
        this.getOrderList(1);
    }
};
</script>

<style lang="less">
#myOrder {
    margin-bottom: 122px;
    min-height: 240px;
    .top {
        border-bottom: 1px solid #dedede;
        display: flex;
        justify-content: space-between;
        .tab {
            display: flex;

            position: relative;
            &::after {
                position: absolute;
                content: "";
                bottom: 0;
                left: 0;
                height: 2px;
                width: 80px;
                background-color: #fc893d;
                transition: all 0.4s;
            }
            a {
                width: 80px;
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
                left: 0;
            }
        }
        .tab_2 {
            &::after {
                left: 80px;
            }
        }
        .tab_3 {
            &::after {
                left: 160px;
            }
        }
        .tab_4 {
            &::after {
                left: 240px;
            }
        }
        .right {
            height: 60px;
            display: flex;
            align-items: center;
            margin-right: 36px;
            cursor: pointer;
            > img {
                height: 14px;
            }
            span {
                font-size: 14px;
                color: #999;
                margin-left: 3px;
            }
        }
    }
    .no-data {
        padding: 50px 0;
        color: #999;
        text-align: center;
        border: none;
    }
    .orderList {
        padding: 0 30px;
        padding-top: 20px;
        .delBar {
            display: flex;
            align-items: center;
            padding-left: 20px;
            margin-bottom: 10px;
            span:first-child {
                height: 14px;
                width: 14px;
                border-radius: 2px;
                border: 1px solid #999;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 4px;
                cursor: pointer;
                img {
                    height: 8px;
                    width: 12px;
                }
            }
            span:last-child {
                font-size: 14px;
                color: #333;
            }
            button {
                margin-left: 35px;
                height: 25px;
                width: 100px;
                border-radius: 2px;
                border: 1px solid #dcdcdc;
                outline: none;
                font-size: 14px;
                color: #333;
            }
        }
        > li {
            display: flex;
            &:focus {
                outline: none;
            }
            > div {
                height: 222px;
                width: 980px;
                border: 1px solid #ececec;
                display: flex;
                flex-direction: column;
                &:focus {
                    outline: none;
                }

                .orderTop {
                    display: flex;
                    justify-content: space-between;
                    height: 40px;
                    border-bottom: 1px solid #ececec;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                    .left {
                        display: flex;
                        align-items: center;
                        span {
                            font-size: 14px;
                            color: #666;
                        }
                        span:first-child {
                            color: #999;
                        }
                        span:last-child {
                            margin-left: 85px;
                        }
                        i {
                            height: 14px;
                            width: 14px;
                            border-radius: 2px;
                            border: 1px solid #999;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 4px;
                            img {
                                height: 8px;
                                width: 12px;
                            }
                        }
                    }
                    > img {
                        height: 12px;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                }
                .orderContent {
                    display: flex;
                    padding-top: 20px;
                    padding-left: 20px;
                    > img {
                        height: 140px;
                        width: 210px;
                        margin-right: 16px;
                    }
                    .courseInfo {
                        display: flex;
                        flex-direction: column;
                        width: 182px;
                        margin-right: 20px;
                        > p {
                            font-size: 16px;
                            color: #333;
                            line-height: 16px;
                            margin-bottom: 10px;
                        }
                        > span {
                            font-size: 16px;
                            color: #666;
                            line-height: 16px;
                        }
                    }
                    .payInfo {
                        width: 210px;
                        margin-right: 20px;
                        display: flex;
                        flex-direction: column;
                        span:first-child {
                            font-size: 18px;
                            color: #fc583d;
                            line-height: 18px;
                            margin-bottom: 18px;
                        }
                        span:last-child {
                            font-size: 14px;
                            color: #666;
                            line-height: 14px;
                            font-family: "ArialMT";
                        }
                    }
                    .orderStatus {
                        margin-right: 50px;
                        span {
                            font-size: 16px;
                            color: #333;
                        }
                    }
                    .optionButtons {
                        display: flex;
                        flex-direction: column;
                        button {
                            height: 30px;
                            width: 115px;
                            border-radius: 2px;
                            border: none;
                            outline: none;
                            font-size: 12px;
                            color: #fefefe;
                            cursor: pointer;
                        }
                        button:first-child {
                            background-color: #fc583d;
                            margin-bottom: 20px;
                        }
                        button:last-child {
                            background-color: #fc893d;
                        }
                    }
                }
            }
        }
        li + li {
            > div {
                margin-top: 30px;
            }
        }
        li:first-child {
            a {
                margin-top: 10px;
            }
        }
    }
    #myOrderPagin {
        display: flex;
        justify-content: center;
        margin: 100px 0 98px 0;
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
            background-color: #63acff;
        }
    }
}
</style>

<style lang="less">
.el-message-box__header {
    border-bottom: 1px solid #f2f2f2;
    .el-message-box__title {
        color: #666;
    }
}
#myOrder {
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
                            font-size: 14px;
                            color: #8c8c8c;
                        }
                    }
                    #qrcode {
                        width: 180px;
                        height: 180px;
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
                        margin: 0 auto 12px;
                        line-height: 44px;
                        border-radius: 44px;
                        font-size: 14px;
                        color: #fff;
                        background: #2c2c2c;
                    }
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

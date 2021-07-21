<template>
  <view class="Order-list">
    <Tabs :value="tabKey" :list="tabs" :border="true" @change="tabChange" />
    <!-- 空提示 -->
    <view class="empty mt125" v-if="!loading && dataSource.length === 0">
      <image src="@/img/order.png" mode="widthFix" class="img" />
      <view class="txt">您还没有相关的订单</view>
    </view>
    <!-- 列表 -->
    <view class="ml12 mr12 mt8 mb8">
      <item v-for="item in dataSource"
            :key="item.id"
            :record="item"
            @cancel="cancel"
            @pay="pay" />
    </view>
    <!-- 支付方式 -->
    <pay-way ref="payway" @confirm="payConfirm" />
    <!-- 取消原因 -->
    <cancel-way ref="cancelWay" @confirm="cancelConfirm" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from "@/c/common/Tabs"
import {
  ORDER_WAIT,
  ORDER_SEND,
  ORDER_GET,
  ORDER_GETED
} from '@/config'
import item from './modules/item'
import PayWay from '../modules/PayWay'
import CancelWay from '../modules/CancelWay'
import { pageMixin } from '@/mixins/pages'
import { postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Tabs,
    item,
    PayWay,
    CancelWay
  },
  mixins: [pageMixin],
  data () {
    return {
      tabs: [
        { key: 0, label: '全部' },
        { key: ORDER_WAIT, label: '待付款' },
        { key: ORDER_SEND, label: '待发货' },
        { key: ORDER_GET, label: '待收货' },
        { key: ORDER_GETED, label: '已签收' }
      ],
      queryParams: {
        status: 0
      },
      url: {
        list: '/userapi/order/index'
      },
      orderId: '',
      orderNo: ''
    }
  },
  methods: {
    tabChange (e) {
      this.queryParams.status = e
      this.resetLoad()
    },
    cancel (id) {
      this.orderId = id
      this.$refs.cancelWay.show()
    },
    cancelConfirm (txt) {
      postAction('/userapi/order/cancel', {
        order_id: this.orderId,
        cancel_reason: txt
      }).then(res => {
        if (res.code === 0) {
          this.resetLoad()
        }
      })
    },
    pay (orderNo) {
      this.orderNo = orderNo
      this.$refs.payway.show(orderNo)
    },
    payConfirm (payway) {
      Taro.showLoading({
        title: '支付中'
      })
      postAction('/userapi/order/pay', {
        order_no: this.orderNo,
        pay_type: payway
      }).then(res2 => {
        Taro.hideLoading()
        if (res2.code === 0) {
          Taro.tradePay({
            tradeNO: res2.data.trade_no,
            success: res3 => {
              console.log('pay success', res3)
              Taro.redirectTo({
                url: `/pages/address/index?result=suc&orderNo=${this.orderNo}`
              })
            },
            fail (err) {
              console.log('pay fail', err)
              Taro.redirectTo({
                url: `/pages/address/index?result=fail&orderNo=${this.orderNo}`
              })
            }
          })
        }
      })
    }
  },
  onLoad (options) {
    this.queryParams.status = options.key || 0
  }
}
</script>

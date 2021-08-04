<template>
  <view class="Refund Refund-detail">
    <!-- 状态栏 -->
    <view class="status-frame acenter">
      <view class="flex ml12 ">
        <image src="@/img/clock.png" mode="widthFix" class="w24" v-if="record.status_icon === 'wait'" />
        <image src="@/img/cancel.png" mode="widthFix" class="w24" v-if="record.status_icon === 'cancel'" />
        <image src="@/img/success.png" mode="widthFix" class="w24" v-if="record.status_icon === 'success'" />
        <image src="@/img/transport.png" mode="widthFix" class="w24" v-if="record.status_icon === 'transport'" />
        <view class="ml8 c-fff">
          <view class="mb4" :class="{'f18': record.status !== 9}">{{record.status_title}}</view>
          <view class="time" v-if="record.remain_time !== 0">剩<text>{{dates.day}}</text>天<text>{{dates.hour}}</text>时<text>{{dates.min}}</text>分</view>
          <view class="f18 mb4" v-if="record.success_refund_amount">￥{{record.success_refund_amount}}</view>
          <view>{{record.status_msg}}</view>
        </view>
      </view>
    </view>
    <!-- 商家信息 -->
    <view class="section2 pt8" style="margin-top: 0;" v-if="record.tip_msg_list && record.tip_msg_list.length > 0">
      <view class="acenter mb8" v-for="(item, index) in record.tip_msg_list" :key="index">
        <image src="@/img/dot3.png" mode="widthFix" class="w6 ml12 mr8" />
        <view class="f12 c-999"><text class="c-666">{{item.title}}</text>{{item.content}}</view>
      </view>
    </view>
    <!-- 寄货信息 -->
    <view class="section2 pt8 pb8 send-info" style="margin-top: 0;" v-if="showSendInfo">
      <view class="pr"><text class="index">1</text>请你尽快寄回商品</view>
      <view class="flex mb4" @tap="location">
        <view style="flex: 1 0 0;" class="flex f12 c-999">
          <view>退货地址：</view>
          <view style="flex: 1 0 0;">{{record.shop_address.fh_province}}{{record.shop_address.fh_city}}{{record.shop_address.fh_address}}</view>
        </view>
        <image src="@/img/dot.png" mode="widthFix" class="w14 ml18" />
      </view>
      <view class="mb4 f12 c-999">收件人：{{record.shop_address.fh_name}} {{record.shop_address.fh_phone}}</view>
      <view class="mb8 f12 c-999">商家留言：{{record.shop_leave_msg}}</view>
      <view class="end mb8">
        <button class="w70 c-btn c-btn-border2 c-btn-24" @tap="copy">复制地址</button>
      </view>
      <view class="between mb8" @tap="toSendPage">
        <view class="pr"><text class="index">2</text>请及时发货</view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view class="pr mb8"><text class="index">3</text>{{record.status_title}}</view>
    </view>
    <!-- 商家留言 -->
    <view class="section2" v-if="record.shop_leave_msg">
      <view class="mt8 mb8">商家留言</view>
      <view class="message">{{record.shop_leave_msg}}</view>
    </view>
    <!-- 协商记录 -->
    <view class="pl12 bg-fff mt8" @tap="toRecord">
      <Cell title="协商记录" isLink />
    </view>
    <!-- 商品详情 -->
    <view class="section2" v-if="record.shop">
      <view class="between mt8 borderB pb8 mb8">
        <view class="acenter">
          <image :src="imgSrc + record.shop.logo" mode="aspectFill" class="avatar20 mr4" />
          <view class="c-tag c-tag-yel mr4" v-if="record.shop.type === 1">个人</view>
          <view class="c-tag c-tag-red mr4" v-if="record.shop.type === 2">企业</view>
          <view class="mr4">{{record.shop.name}}</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10" />
        </view>
        <view class="w70">
          <button class="c-btn c-btn-border c-btn-24" @tap="contact">联系商家</button>
        </view>
      </view>
      <view class="flex mb8 goods pb8 borderB" v-for="item in record.goods" :key="item.id">
        <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" @tap="toOrderDetail" />
        <view class="content">
          <view class="title">{{item.goods_name}}</view>
          <view class="f12 c-999 mb4">{{item.goods_attr}}</view>
          <view class="between f12" v-if="item.type === 1">
            <view>押金：￥{{item.goods_deposit}} x {{item.after_nums}}</view>
            <view>￥{{item.goods_deposit_count}}</view>
          </view>
          <view class="between f12" v-else>
            <view>售价：￥{{item.goods_price}} x {{item.after_nums}}</view>
            <view>￥{{item.goods_price * item.after_nums}}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 订单信息 -->
    <view class="section2">
      <view class="mt8 mb16">订单信息</view>
      <view class="between mb16" v-for="(item, index) in record.after_list" :key="index">
        <view class="acenter f12">
          <view class="c-999 mr16">{{item.name}}:</view>
          <view>{{item.value}}</view>
        </view>
        <view class="f12 c-red" v-if="item.right_button_display === 1">复制</view>
      </view>
      <view class="flex f12" v-if="record.images && record.images.length > 0">
        <view class="c-999 mr16">申请照片：</view>
        <view class="img-list">
          <view class="img-item" v-for="(item, index) in record.images" :key="index">
            <image :src="imgSrc + item" mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 end pr20">
        <button class="c-btn c-btn-border2 c-btn-24 ml4"
                v-for="(item, index) in record.buttons"
                :key="index"
                @tap="btnFunc(item)">{{item.name}}</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'
import { getAction, postAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    Cell
  },
  computed: {
    dates () {
      const remain = this.record.remain_time || 0
      const perDay = 24 * 60 * 60
      const perHour = 60 * 60
      const perMin = 60
      return {
        day: parseInt(remain / perDay),
        hour: parseInt(remain / perHour),
        min: parseInt(remain / perMin),
      }
    },
    showSendInfo () {
      if (this.record.status_icon !== 'cancel' && this.record.status === 2 && (this.record.apply_type === 1 || this.record.apply_type === 3)) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: '',
      record: {}
    }
  },
  methods: {
    getData () {
      getAction('/userapi/after/show', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
          Taro.setNavigationBarTitle({
            title: res.data.title
          })
        }
      })
    },
    contact () {
      Taro.showToast({
        title: '跳聊天界面'
      })
    },
    btnFunc (item) {
      if (item.display === 2) {
        Taro.showModal({
          title: '提示',
          content: item.alert,
          showCancel: false,
          confirmText: '知道了'
        })
      } else {
        if (item.key === 'edit_apply') { // 修改申请
          Taro.navigateTo({
            url: `/pages/refund/apply?id=${this.id}&type=${this.record.apply_type}&from=edit`
          })
        } else if (item.key === 'cancel_after') { // 撤销售后
          this.cancel()
        } else if (item.key === 'deliver') { // 填写快递单号
          this.toSendPage()
        } else if (item.key === 'fetch') { // 面对面取件
          Taro.navigateTo({
            url: `/pages/refund/ziti/index?id=${this.id}`
          })
        } else if (item.key === 'receive') { // 确认收货
          this.receive()
        } else if (item.key === 'return_express') { // 查看退货物流
          Taro.navigateTo({
            url: `/pages/order/post/index?id=${this.id}&type=1&from=refund`
          })
        } else if (item.key === 'change_express') { // 查看换货物流
          Taro.navigateTo({
            url: `/pages/order/post/index?id=${this.id}&type=2&from=refund`
          })
        } else if (item.key === 'apply_after') { // 再次申请售后
          Taro.navigateTo({
            url: `/pages/refund/type?id=${this.record.order_id}`
          })
        } else if (item.key === 'ptjr_apply') { // 申请平台介入
          Taro.navigateTo({
            url: `/pages/rent/apply?id=${this.id}&from=refund`
          })
        } else if (item.key === 'submit_proof') { // 上传凭证
          Taro.navigateTo({
            url: `/pages/refund/proof?id=${this.id}&from=refund`
          })
        } else if (item.key === 'append_proof') { // 补充凭证
          Taro.navigateTo({
            url: `/pages/refund/proof?id=${this.id}&from=refund`
          })
        }
      }
    },
    cancel () {
      Taro.showModal({
        title: '提示',
        content: '确定要撤销本次申请吗？',
        success: res => {
          if (res.confirm) {
            postAction('/userapi/after/cancel', {
              id: this.id
            }).then(res2 => {
              if (res2.code === 0) {
                Taro.showToast({
                  title: res2.msg
                })
                this.getData()
              }
            })
          }
        }
      })
    },
    receive () {
      Taro.showModal({
        title: '提示',
        content: '确定收货吗？',
        success: res => {
          if (res.confirm) {
            postAction('/userapi/after/receive', {
              id: this.id
            }).then(res2 => {
              if (res2.code === 0) {
                Taro.showToast({
                  title: res2.msg
                })
                this.getData()
              }
            })
          }
        }
      })
    },
    toSendPage () {
      Taro.navigateTo({
        url: `/pages/refund/return?id=${this.id}`
      })
    },
    location () {
      Taro.openLocation({
        name: this.record.shop_address.fh_name,
        address: `${this.record.shop_address.fh_province}${this.record.shop_address.fh_city}${this.record.shop_address.fh_address}`,
        latitude: Number(this.record.shop_address.fh_lat),
        longitude: Number(this.record.shop_address.fh_lng),
        success (res) {
          console.log('openLocation', res)
        }
      })
    },
    copy () {
      Taro.setClipboardData({
        data: `${this.record.shop_address.fh_province}${this.record.shop_address.fh_city}${this.record.shop_address.fh_address}`,
        text: `${this.record.shop_address.fh_province}${this.record.shop_address.fh_city}${this.record.shop_address.fh_address}`,
        success: res => {
          Taro.showToast({
            title: '复制成功'
          })
          console.log('setClipboardData suc', res)
        }
      })
    },
    toRecord () {
      Taro.navigateTo({
        url: `/pages/rent/order/record/index?id=${this.id}&from=refund`
      })
    },
    toOrderDetail () {
      Taro.navigateTo({
        url: `/pages/order/detail/index?id=${this.record.order_id}`
      })
    }
  },
  onShow () {
    this.getData()
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

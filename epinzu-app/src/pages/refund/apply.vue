<template>
  <view class="Refund container">
    <!-- 商品信息 -->
    <view class="section2">
      <view class="borderB pb8 mt8" v-for="item in goods" :key="item.id">
        <view class="flex mb8 goods">
          <image src="@/img/radio-check.png" mode="widthFix" class="w16 mr8 mt34" />
          <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" />
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
        <view class="end mt8">
          <text class="f12 c-666">申请数量</text>
          <Stepper :value="1" :max="item.after_nums" />
        </view>
      </view>
    </view>
    <!-- 申请类型 -->
    <view class="section2">
      <picker mode="selector" :range="typeList" rangeKey="name" @change="typeChange">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">申请类型</view>
          <view>{{typeName}}</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      </picker>
      <picker mode="selector" :range="statusList" rangeKey="name" @change="statusChange">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">收货状态</view>
          <view class="c-999" v-if="statusId === 0">请选择收货状态</view>
          <view class="c-666" v-else>{{statusName}}</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      </picker>
      <picker mode="selector" :range="reasonList" rangeKey="name" @change="reasonChange">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">申请原因</view>
          <view class="c-999" v-if="reasonId === 0">请选择申请原因</view>
          <view class="c-666" v-else>{{reasonName}}</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      </picker>
    </view>
    <!-- 退款金额 -->
    <view class="section2" style="margin-bottom: 0;">
      <view class="mt16 mb16">退款金额</view>
      <view class="f18 mb8">￥<input v-model="refundMoney" class="none-inp" @input="refundChange" /></view>
    </view>
    <view class="h32 acenter pl12 c-999" style="background-color: #FAFBFA">最多可退￥{{maxRefund}}</view>
    <!-- 申请说明 -->
    <view class="mt8 mb8">
      <Form ref="form" title="申请说明" placeholder="请你详细填写申请说明" />
    </view>
    <!-- 申请说明 -->
    <view class="section2">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">联系电话</view>
          <view>{{phone}}</view>
        </view>
      </view>
    </view>

    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn" @tap="handleSubmit">提交申请</button>
      </view>
    </view>

    <selects />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Stepper from '@/c/common/Stepper'
import Form from '@/c/common/Form'
import selects from './modules/selects'
import { getAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    Stepper,
    Form,
    selects
  },
  computed: {
    typeName () {
      const item = this.typeList.find(i => i.id === this.type)
      return item.name
    },
    statusName () {
      const item = this.statusList.find(i => i.id === this.statusId)
      return item.name
    },
    reasonName () {
      const item = this.reasonList.find(i => i.id === this.reasonId)
      return item.name
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: 0,
      type: 0,
      statusId: 0,
      reasonId: 0,
      goods: [],
      selectGoods: [],
      typeList: [],
      statusList: [],
      reasonList: [],
      maxRefund: 0,
      refundMoney: 0,
      phone: 0,
      address: {},
    }
  },
  methods: {
    getData () {
      getAction('/userapi/after/apply/page/data', {
        order_id: this.id,
        apply_type: this.type,
      }).then(res => {
        if (res.code === 0) {
          Taro.setNavigationBarTitle({
            title: res.data.title
          })
          this.goods = res.data.goods_list
          const selectGoods = []
          for (let i of this.goods) {
            selectGoods.push({
              checked: false,
              id: i.id,
              nums: 1
            })
          }
          this.selectGoods = selectGoods
          this.typeList = res.data.apply_type_list
          this.statusList = res.data.rev_status_list
          this.reasonList = res.data.apply_reason_list
          this.maxRefund = res.data.max_refund_amount
          this.refundMoney = res.data.max_refund_amount
          this.phone = res.data.phone
          this.address = res.data.address
        }
      })
    },
    getReasonList () {
      getAction('/userapi/after/apply/reason/list', {
        rev_status: this.statusId
      }).then(res => {
        if (res.code === 0) {
          this.reasonList = res.data
        }
      })
    },
    typeChange (e) {
      this.type = this.typeList[e.detail.value].id
    },
    statusChange (e) {
      this.statusId = this.statusList[e.detail.value].id
      this.reasonId = 0
      this.getReasonList()
    },
    reasonChange (e) {
      this.reasonId = this.reasonList[e.detail.value].id
    },
    refundChange () {
      if (Number(this.refundMoney) > this.maxRefund) {
        Taro.showToast({
          title: '不能大于退款金额'
        })
      }
    },
    handleSubmit () {
      if (this.statusId === 0) {
        Taro.showToast({
          title: '请选择收货状态'
        })
        return
      }
      if (this.reasonId === 0) {
        Taro.showToast({
          title: '请选择申请原因'
        })
        return
      }
      if (Number(this.refundMoney) > this.maxRefund) {
        Taro.showToast({
          title: '不能大于退款金额'
        })
        return
      }
      const params = this.$refs.form.getParams()
    }
  },
  onLoad (options) {
    this.id = options.id
    this.type = options.type
    this.getData()
  }
}
</script>

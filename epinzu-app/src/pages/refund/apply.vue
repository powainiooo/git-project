<template>
  <view class="Refund container">
    <!-- 商品信息 -->
    <view class="section2">
      <view class="borderB pb8 mt8" v-for="(item, i) in goods" :key="item.id">
        <view class="flex mb8 goods">
          <view class=" mr8 mt34" @tap="handleSelect(i)" v-if="type !== 2">
            <image src="@/img/radio-check.png" mode="widthFix" class="w16" v-if="selectGoods[i].checked" />
            <image src="@/img/radio.png" mode="widthFix" class="w16" v-else />
          </view>
          <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" />
          <view class="content">
            <view class="title mb4">{{item.goods_name}}</view>
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
        <view class="end mt8" v-if="type !== 2">
          <text class="f12 c-666 mr8">申请数量</text>
          <Stepper v-model="selectGoods[i].nums" :max="item.after_nums" @change="setPrices" />
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
      <picker mode="selector" :range="statusList" rangeKey="name" @change="statusChange" v-if="type === 2">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">收货状态</view>
          <view class="c-999" v-if="statusId === 0">请选择收货状态</view>
          <view class="c-333" v-else>{{statusName}}</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      </picker>
      <picker mode="selector" :range="reasonList" rangeKey="name" @change="reasonChange">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">申请原因</view>
          <view class="c-999" v-if="reasonId === 0">请选择申请原因</view>
          <view class="c-333" v-else>{{reasonName}}</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      </picker>
    </view>
    <!-- 退款金额 -->
    <view class="section2" style="margin-bottom: 0;" v-if="type !== 3">
      <view class="mt16 mb16">退款金额</view>
      <view class="f18 mb8">￥<input v-model="refundMoney" class="none-inp f18" @input="refundChange" /></view>
    </view>
    <view class="h32 acenter pl12 c-999" style="background-color: #FAFBFA" v-if="type !== 3">最多可退￥{{maxRefund}}</view>
    <!-- 收货地址 -->
    <view class="section2 between" @tap="selectAddr" v-if="type === 3">
      <view class="flex100">
        <view class="mt16 mb8 c-666">收货地址</view>
        <view class="mb4">
          <text class="mr8">{{address.rev_name}}</text>
          <text class="mr8">{{address.rev_phone}}</text>
        </view>
        <view class="mb8">{{address.rev_province}}{{address.rev_city}}{{address.rev_address}}</view>
      </view>
      <image src="@/img/ar1.png" mode="widthFix" class="w10 ml16" />
    </view>
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
import { getAction, postAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    Stepper,
    Form,
    selects
  },
  computed: {
    typeName () {
      const item = this.typeList.find(i => i.id == this.type)
      console.log('typeName', item, this.type, typeof this.type)
      return item ? item.name : ''
    },
    statusName () {
      const item = this.statusList.find(i => i.id === this.statusId)
      return item ? item.name : ''
    },
    reasonName () {
      const item = this.reasonList.find(i => i.id === this.reasonId)
      return item ? item.name : ''
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: 0,
      from: 'new',
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
      addrId: '',
      isAjax: false
    }
  },
  methods: {
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      const url = this.from === 'new' ? '/userapi/after/apply/page/data' : '/userapi/after/apply/update/page/data'
      const parmas = {
        apply_type: this.type
      }
      if (this.from === 'new') {
        parmas.order_id = this.id
      }
      if (this.from === 'edit') {
        parmas.id = this.id
      }
      getAction(url, parmas).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          Taro.setNavigationBarTitle({
            title: res.data.title
          })
          this.goods = res.data.goods_list
          const selectGoods = []
          for (let i of this.goods) {
            selectGoods.push({
              checked: true,
              id: i.id,
              nums: i.after_nums,
              price: i.type === 1 ? i.goods_deposit : i.goods_price
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
          if (this.from === 'edit') {
            this.statusId = res.data.rev_status
            this.reasonId = res.data.apply_reason_id
            this.refundMoney = res.data.refund_amount
            this.$refs.form.setValues({
              content: res.data.content,
              images: res.data.images
            })
          }
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
      this.reasonId = 0
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
      if (this.isAjax) return
      if (this.statusId === 0 && this.type === 2) {
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
      const goods = []

      if (this.type === 2) { // 仅退款
        for (let i of this.goods) {
          goods.push({
            id: i.id,
            apply_nums: i.after_nums
          })
        }
      } else {
        for (let i of this.selectGoods) {
          if (i.checked) {
            goods.push({
              id: i.id,
              apply_nums: i.nums
            })
          }
        }
      }
      if (goods.length === 0) {
        Taro.showToast({
          title: '请选择产品'
        })
        return
      }
      const params = this.$refs.form.getParams()
      if (params.content === '') {
        Taro.showToast({
          title: '请输入申请说明'
        })
        return
      }
      let url = ''
      if (this.from === 'new') {
        params.order_id = this.id
        url = '/userapi/after/apply'
      }
      if (this.from === 'edit') {
        params.id = this.id
        url = '/userapi/after/apply/update'
      }

      params.goods = goods
      params.apply_type = this.type
      params.rev_status = this.statusId
      params.apply_reason = this.reasonId
      params.refund_amount = this.refundMoney
      params.phone = this.phone
      params.address_id = this.addrId
      this.isAjax = true
      postAction(url, params).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          Taro.redirectTo({
            url: '/pages/refund/index'
          })
        }
        this.isAjax = false
      })
    },
    selectAddr () {
      Taro.navigateTo({
        url: '/pages/address/index?from=order'
      })
    },
    handleSelect (i) {
      this.selectGoods[i].checked = !this.selectGoods[i].checked
      this.setPrices()
    },
    setPrices () {
      let price = 0
      for (let item of this.selectGoods) {
        if (item.checked) {
          price += item.price * item.nums
        }
      }
      this.maxRefund = price
      this.refundMoney = price
    }
  },
  onShow () {
    const addrData = this.$store.state.addrData
    console.log('addrData', addrData)
    if (addrData.id) {
      this.address = {
        rev_name: addrData.rev_name,
        rev_phone: addrData.rev_phone,
        rev_province: addrData.province,
        rev_city: addrData.city,
        rev_address: addrData.address,
      }
      this.addrId = addrData.id
    }
  },
  onLoad (options) {
    this.id = options.id
    this.type = Number(options.type)
    this.from = options.from || 'new'
    this.getData()
    this.$store.commit('SET_ADDRDATA', {})
  }
}
</script>

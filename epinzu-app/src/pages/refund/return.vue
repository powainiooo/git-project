<template>
  <view class="Refund container">
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 快递信息 -->
    <template v-if="tabKey === 'post'">
    <view class="section2" style="margin-bottom: 0;">
      <picker mode="selector" :range="cList" rangeKey="name" @change="onChange">
        <view class="h52 between borderB">
          <view class="c-666">快递公司</view>
          <view class="acenter">
            <view class="c-999" v-if="companyId === ''">{{companyName}}</view>
            <view v-else>{{companyName}}</view>
            <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
          </view>
        </view>
      </picker>
    </view>
    <Field label="快递单号" labelColor="#666666" placeholder="请输入" textAlign="right" v-model="kdNo" />

    <Form title="退货留言"
          ref="form"
          placeholder="请你详细填写退货留言"
          class="mt8" />
    </template>
    <!-- 自还信息 -->
    <template v-if="tabKey === 'return'">
    <view class="bg-fff ovh mt8">
      <view class="return-title">取件码</view>
      <view class="f22 c-red tc mb16">{{code}}</view>
      <view class="hr"></view>
      <view class="mt8 mb8 ml12 mr12 f12 c-666">
        <view class="c-333 mb8">提示</view>
        <view class="mb4">1、上门自还前请先跟商家协商好，并约定好上门时间，以免白跑一趟</view>
        <view>2、送货上门后，要求商家输入取件码完成取件，证明你已归还货物，如若逾期未归还系统将自动取消售后</view>
      </view>
    </view>

    <view class="section2 pt8 pb8 send-info">
      <view class="pr mb8">商家信息</view>
      <view class="flex mb4">
        <view style="flex: 1 0 0;" class="flex f12 c-666">
          <view>退货地址：</view>
          <view style="flex: 1 0 0;">{{address.province}}{{address.city}}{{address.address}}</view>
        </view>
        <image src="@/img/dot.png" mode="widthFix" class="w20 ml18" @tap="location" />
      </view>
      <view class="mb4 f12 c-666">收件人：{{address.name}} {{address.phone}}</view>
      <view class="mb8 f12 c-666">商家留言：{{address.return_msg}}</view>
    </view>
    </template>
    <!-- 底部按钮 -->
    <view class="footer-container" v-if="tabKey === 'post'">
      <view class="wp100 pl12 pr12">
        <button class="c-btn" @tap="handleSubmit">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from '@/c/common/Tabs'
import Field from '@/c/common/Field'
import Form from '@/c/common/Form'
import { getAction, postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Tabs,
    Field,
    Form
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      tabs: [
        { key: 'post', label: '快递发货' },
        { key: 'return', label: '上门自还' }
      ],
      tabKey: 'post',
      cList: [],
      address: {},
      companyName: '请选择',
      companyId: '',
      kdNo: '',
      code: '',
      id: '',
      isAjax: false
    }
  },
  methods: {
    tabChange (e) {
      this.tabKey = e
    },
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      getAction('/userapi/after/fetch/page/data', {
        id: this.id
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.address = res.data.address
          this.code = res.data.code
        }
      })
    },
    getCompany () {
      getAction('/userapi/express/companies').then(res => {
        if (res.code === 0) {
          this.cList = res.data
        }
      })
    },
    onChange (e) {
      console.log(e)
      const item = this.cList[e.detail.value]
      this.companyName = item.name
      this.companyId = item.id
    },
    handleSubmit () {
      if (this.isAjax) return
      this.isAjax = true
      const formData = this.$refs.form.getParams()
      const params = {}
      params.id = this.id
      params.express_company_id = this.companyId
      params.kdno = this.kdNo
      params.return_msg = formData.content
      params.return_images = formData.images
      if (params.express_company_id === '') {
        Taro.showToast({
          title: '请选择快递公司'
        })
        return
      }
      if (params.kd_no === '') {
        Taro.showToast({
          title: '请输入快递单号'
        })
        return
      }
      if (params.content === '') {
        Taro.showToast({
          title: '请输入退货留言'
        })
        return
      }
      postAction('/userapi/after/deliver', params).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          Taro.navigateBack({
            delta: 1
          })
        } else {
          this.isAjax = false
        }
      })
    },
    location () {
      Taro.openLocation({
        name: this.address.name,
        address: `${this.address.province}${this.address.city}${this.address.address}`,
        latitude: Number(this.address.lat),
        longitude: Number(this.address.lng),
        success (res) {
          console.log('openLocation', res)
        }
      })
    },
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
    this.getCompany()
  }
}
</script>

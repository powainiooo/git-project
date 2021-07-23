<template>
  <view class="Rent container">
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 店铺信息 -->
    <view class="section" v-if="tabKey === 'return'">
      <view class="mt8 acenter">
        <view class="w60 f12 c-999">联系人：</view>
        <view class="f12">{{address.name}} {{address.phone}}</view>
      </view>
      <view class="mt8 between mb8">
        <view class="acenter">
          <view class="w60 f12 c-999">商家地址：</view>
          <view class="f12">{{address.province}}{{address.city}}{{address.address}}</view>
        </view>
        <image src="@/img/dot.png" mode="widthFix" class="w14" />
      </view>
    </view>
    <!-- 订单信息 -->
    <view class="section2 mb8">
      <view class="goods-item-hor mt8 mb8">
        <image :src="imgSrc + goods.goods_cover" mode="aspectFill" class="img" />
        <view class="infos">
          <view class="title ellipsis mnb4">{{goods.goods_name}}</view>
          <view class="c-999 f12 mb4">{{goods.goods_attr}}</view>
          <view class="f12 mb4">数量：{{goods.buy_nums}}件</view>
        </view>
      </view>
      <view class="hr"></view>
      <view class="mt8 mb8">订单信息</view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">支付押金:</view>
        <view><text class="f10">￥</text>{{counts.goods_deposit}}</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">单日租金:</view>
        <view><text class="f10">￥</text>{{counts.rent_day_amount}}</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">起租天数:</view>
        <view>{{counts.rent_day_min}}天</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">租赁天数:</view>
        <view>{{counts.rent_days}}天</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">可退押金:</view>
        <view class="c-red"><text class="f10">￥</text>{{counts.remain_deposit}}</view>
      </view>
    </view>
    <!-- 快递信息 -->
    <template v-if="tabKey === 'post'">
    <view class="section2" style="margin-bottom: 0;">
      <picker mode="selector" :range="cList" rangeKey="name" @change="onChange">
        <view class="h52 between borderB">
          <view class="c-666">快递公司</view>
          <view class="acenter">
            <view class="c-999">{{companyName}}</view>
            <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
          </view>
        </view>
      </picker>
    </view>
    <Field label="快递单号" placeholder="请输入" textAlign="right" v-model="kdNo" />
    </template>
    <!-- 底部按钮 -->
    <view class="footer-container">
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
import { getAction, postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Tabs,
    Field
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      tabs: [
        { key: 'post', label: '快递' },
        { key: 'return', label: '自还' }
      ],
      tabKey: 'post',
      cList: [],
      companyName: '请选择',
      companyId: '',
      kdNo: '',
      id: '',
      address: {},
      goods: {},
      counts: {},
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
      getAction('/userapi/rent/back/page/data', {
        id: this.id
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.address = res.data.address
          this.goods = res.data.goods
          this.counts = res.data.counts
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
      const params = {
        id: this.id,
        express_company_id: this.companyId,
        kd_no: this.kdNo
      }
      if (this.tabKey === 'post') {
        params.express_type = 1
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
      } else if (this.tabKey === 'return') {
        params.express_type = 0
      }
      postAction('/userapi/rent/back', params).then(res => {
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
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
    this.getCompany()
  }
}
</script>

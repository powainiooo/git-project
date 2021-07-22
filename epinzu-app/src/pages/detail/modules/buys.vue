<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys">
    <view class="flex pb16 borderB">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="ml8" v-if="record.type === 1">
        <view class="c-red f12 mb4">租金：￥<text class="f18">{{selected.price}}</text>/天</view>
        <view class="acenter">
          <view class="f12">押金：￥{{selected.deposit}}</view>
          <view class="f12 c-999 ml16">{{record.rent_day_min}}天起租</view>
        </view>
        <view class="f12 mt22" v-if="selected.attr_name">已选：{{selected.attr_name}}</view>
      </view>
      <view class="ml8" v-if="record.type === 2">
        <view class="c-red f12">售价：￥<text class="f18">{{selected.price}}</text></view>
        <view class="f12 mt42" v-if="selected.attr_name">已选：{{selected.attr_name}}</view>
      </view>
    </view>
    <view class="mt16 mb16">规格</view>
    <view class="flex wrap mb26">
      <view class="cate-item"
            :class="{
              'cate-item-active': attrId === item.id,
              'cate-item-disabled': item.store_nums === 0
            }"
            v-for="item in attrs"
            :key="item.id"
            @tap="selectAttr(item)">{{item.attr_name}}</view>
    </view>

    <view class="between">
      <view class="acenter">
        <view>数量</view>
        <view class="f12 c-999 ml16" v-if="selected.store_nums !== undefined">库存{{selected.store_nums}}件</view>
      </view>
      <stepper v-model="num" :max="selected.store_nums || 100" />
    </view>

    <view class="footer-container">
      <view class="c-btn-group ml12 mr12">
        <button class="c-btn" style="background-color: #FC7F1B;" @tap="addCart">加入购物车</button>
        <button class="c-btn" @tap="handleBuy">立即下单</button>
      </view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import Popup from '@/c/common/Popup'
import Stepper from '@/c/common/Stepper'
import { postAction } from '@/utils/api'

export default {
	name: 'app',
  components: {
    Popup,
    Stepper
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
	  attrs () {
	    return this.record.attrs || []
    },
	  selected () {
      const item = this.attrs.find(i => i.id === this.attrId)
      if (item) {
        return item
      } else {
        return {
          cover: this.record.cover,
          price: this.record.price_min,
          deposit: this.record.deposit_min,
        }
      }
    }
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc,
      visible: false,
      num: 1,
      attrId: 0,
      isAjax: false
    }
	},
	methods: {
	  show () {
	    this.visible = true
      this.attrId = 0
      this.num = 1
    },
    selectAttr (item) {
	    if (item.store_nums !== 0) {
        this.attrId = item.id
        this.num = 1
      }
    },
    getParams () {
	    return [
        {
          goods_id: this.record.id,
          attr_id: this.attrId,
          buy_nums: this.num
        }
      ]
    },
    addCart () {
	    if (this.attrId === 0) {
	      Taro.showToast({
          title: '请选择规格'
        })
        return
      }
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/shopping/add', {
        goods: this.getParams()
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          this.$emit('refresh')
          this.visible = false
        }
      })
    },
    handleBuy () {
      if (this.attrId === 0) {
        Taro.showToast({
          title: '请选择规格'
        })
        return
      }
      this.$store.commit('SET_ORDERGOODS', this.getParams())
      Taro.navigateTo({
        url: '/pages/order/confirm/index'
      })
    }
  }
}
</script>

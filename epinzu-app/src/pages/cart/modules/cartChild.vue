<style lang="stylus" type="text/stylus">
@import '../../../static/css/mixin.styl'
.c-cart-child
  display flex;
  &-img
    size(85px, 85px); position relative; border-radius 4px; overflow hidden; margin-right 8px;
    .img
      size(100%, 100%);
    .tag
      width 16px; abTL(0, 0)
  &-info
    width 210px;
    .title
      ellipsis(); margin-bottom 8px;
  &-selects
    size(100%, 20px); border-radius 10px; background-color #F5F5F5;
    &>view
      width 180px; ellipsis(); font-size 10px; color #999999; margin-right 4px; margin-left 8px;
</style>

<template>
<view class="acenter">
  <view class="btn-check" @tap="toggle">
    <image src="@/img/radio-check.png" mode="widthFix" v-if="checked" />
    <image src="@/img/radio.png" mode="widthFix" v-else />
  </view>
  <view class="c-cart-child">
    <view class="c-cart-child-img">
      <image :src="imgSrc + record.cover" mode="aspectFill" class="img" @tap="toDetail" />
      <image src="@/img/icon-rent.png" mode="widthFix" class="tag" v-if="record.type === 1" />
      <image src="@/img/icon-buy.png" mode="widthFix" class="tag" v-if="record.type === 3" />
    </view>
    <view class="c-cart-child-info">
      <view class="title">{{record.title}}</view>
      <view class="between mb16">
        <view class="c-cart-child-selects acenter" @tap="openAttrs">
          <view>{{attrs.attr_name}}</view>
          <image src="@/img/ar2.png" mode="widthFix" class="w10" />
        </view>
        <view class="f12 c-red" v-if="attrs.store_nums === 0">库存不足</view>
      </view>
      <view class="between">
        <view>
          <view class="c-red f10" v-if="record.type === 1"><text class="f12">租金：</text>￥<text class="f12">{{attrs.price}}</text>/天</view>
          <view class="c-red f10" v-if="record.type === 3"><text class="f12">售价：</text>￥<text class="f12">{{attrs.price}}</text></view>
          <view class="f10" v-if="record.type === 1"><text class="f12">押金：</text>￥<text class="f12">{{attrs.deposit}}</text></view>
        </view>
        <stepper v-model="record.buy_nums" />
      </view>
    </view>
  </view>

  <Popup :show.sync="visible" round>
    <view class="tc center borderB h50"
          v-for="item in attrList"
          :key="item.id"
          @tap="selectAttr(item)">{{item.attr_name}}</view>
    <view class="tc center h50" @tap="visible = false">取消</view>
  </Popup>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import Stepper from '@/c/common/Stepper'
import { getAction, postAction } from '@/utils/api'
import Popup from '@/c/common/Popup'

export default {
	name: 'app',
  components: {
    Stepper,
    Popup
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    ids: {
      type: Array,
      default: () => []
    }
  },
  computed: {
	  attrs () {
	    return this.attrChange ? this.newAttr : this.record.attrs
    },
    checked () {
	    return this.ids.includes(this.record.id)
    }
  },
  watch: {
	  'record.buy_nums' (val, oldVal) {
	    console.log('record.buy_nums', val, oldVal)
      if (val > oldVal) {
        this.add()
      } else if (val < oldVal) {
        this.reduce()
      }
    }
  },
	data() {
		return {
      imgSrc: Taro.imgSrc,
      visible: false,
      attrList: [],
      attrChange: false,
      newAttr: {}
    }
	},
	methods: {
    add () {
      postAction('/userapi/shopping/nums/add', {
        id: this.record.id
      }).then(res => {
        if (res.code !== 0) {
          this.record.buy_nums -= 1
        } else {
          this.numsChange()
        }
      })
    },
    reduce () {
      postAction('/userapi/shopping/nums/reduce', {
        id: this.record.id
      }).then(res => {
        if (res.code !== 0) {
          this.record.buy_nums += 1
        } else {
          this.numsChange()
        }
      })
    },
    openAttrs () {
      Taro.showLoading({
        title: '加载中'
      })
      getAction('/userapi/shopping/attrs', {
        goods_id: this.record.goods_id
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.attrList = res.data
          this.visible = true
        }
      })
    },
    selectAttr (data) {
      postAction('/userapi/shopping/attr/update', {
        id: this.record.id,
        attr_id: data.id
      }).then(res => {
        if (res.code === 0) {
          this.newAttr = data
          this.attrChange = true
          this.visible = false
        }
      })
    },
    toggle () {
      console.log('toggle')
      this.$emit('toggle', this.record.id)
    },
    numsChange () {
      this.$emit('nums', this.record.id)
    },
    toDetail () {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${this.record.goods_id}`
      })
    }
  }
}
</script>

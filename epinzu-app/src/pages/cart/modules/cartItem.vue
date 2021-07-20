<style lang="stylus" type="text/stylus">
@import '../../../static/css/mixin.styl'
.c-cart-item
  border-radius 4px; padding 8px; background-color #FFFFFF;
  .btn-check
    size(24px, 24px); padding-top 4px;
    image
      width 16px;
  .thead
    margin-bottom 16px;
    .avatar
      size(40px, 40px); border-radius 50%; margin-right 8px;
    .c-btn
      size(45px, 20px); font-size 10px; line-height 18px;
  .child-item
    margin-bottom 24px;
    &:last-child
      margin-bottom 0
</style>

<template>
<view class="c-cart-item">
  <view class="thead between">
    <view class="acenter">
      <view class="btn-check" @tap="AllToggle">
        <image src="@/img/radio-check.png" mode="widthFix" v-if="checkAll" />
        <image src="@/img/radio.png" mode="widthFix" v-else />
      </view>
      <image :src="imgSrc + record.logo" mode="aspectFill" class="avatar" />
      <view class="c-tag c-tag-yel mr4" v-if="record.type === 1">个人</view>
      <view class="c-tag c-tag-red mr4" v-if="record.type === 2">企业</view>
      <view>{{record.shop_name}}</view>
    </view>
    <button class="c-btn c-btn-border2" v-if="ids.length > 0" @tap="delCart">删除</button>
  </view>
  <view class="child-item"
        v-for="item in goods"
        :key="item.id">
    <cart-child :record="item" :ids="ids" @toggle="itemToggle" />
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import cartChild from './cartChild'
import { postAction } from '@/utils/api'

export default {
	name: 'app',
  components: {
    cartChild
  },
  props: {
	  record: {
	    type: Object,
      default: () => {}
    },
    shopId: {
	    type: Number,
      default: 0
    }
  },
  computed: {
	  goods () {
	    return this.record.goods || []
    }
  },
  watch: {
    shopId (val) {
      if (this.record.shop_id !== val) {
        this.ids = []
        this.checkAll = false
      }
    }
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc,
      checkAll: false,
      ids: []
    }
	},
	methods: {
    itemToggle (id) {
      if (this.ids.includes(id)) {
        const index = this.ids.findIndex(i => i === id)
        this.ids.splice(index, 1)
      } else {
        this.ids.push(id)
      }
      this.checkAll = this.ids.length === this.record.goods.length
      this.change()
    },
    AllToggle () {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.ids = this.record.goods.map(i => i.id)
      } else {
        this.ids = []
      }
      this.change()
    },
    delCart () {
      postAction('/userapi/shopping/destroy', {
        ids: this.ids
      }).then(res => {
        if (res.code === 0) {
          this.$emit('refresh')
        }
      })
    },
    change () {
      const arr = []
      let buy = 0
      let rent = 0
      let deposit = 0
      for (let i of this.goods) {
        if (this.ids.includes(i.id)) {
          arr.push({
            goods_id: i.goods_id,
            attr_id: i.attr_id,
            buy_nums: i.buy_nums
          })
          if (i.type === 1) {
            rent += i.attrs.price
            deposit += i.attrs.deposit
          } else if (i.type === 3) {
            buy += i.attrs.price
          }
        }
      }
      this.$emit('change', {
        shopId: arr.length > 0 ? this.record.shop_id : 0,
        buy,
        rent,
        deposit,
        goods: arr
      })
    }
  }
}
</script>

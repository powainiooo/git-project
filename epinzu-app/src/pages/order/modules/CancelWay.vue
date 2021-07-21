<style lang="stylus" type="text/stylus">

</style>

<template>
<Popup :show.sync="visible" round>
  <view class="tc center borderB h50">取消原因</view>
  <view class="tc center borderB h50"
        v-for="(item, i) in list"
        :key="i"
        @tap="select(item)">{{item}}</view>
  <view class="tc center h50" @tap="close">取消</view>
</Popup>
</template>

<script type='es6'>
import Popup from "@/c/common/Popup"
export default {
	name: 'app',
  components: {
    Popup
  },
	data() {
		return {
      visible: false,
      list: [
        '收货地址或者手机号填错',
        '忘记支付密码/余额不足',
        '无法正常支付',
        '不想买了',
        '其他原因'
      ]
    }
	},
	methods: {
    show () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    select (item) {
      this.$emit('confirm', item)
      this.close()
    }
  }
}
</script>

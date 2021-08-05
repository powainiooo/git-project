<style>
.goods-cates { width: 100%; }
.goods-cates-list { display: flex; margin: 0 6px; align-items: baseline }
.goods-cates-item { height: 40px; line-height: 40px; padding: 0 15px 16px 0; flex: 1 0 auto; font-size: 14px; }
.goods-cates-list .active { color: #FE322B; }
</style>

<template>
<scroll-view :scrollX="true"
             :scrollIntoView="value"
             :scrollWithAnimation="true"
             class="goods-cates">
  <view class="goods-cates-list">
    <view class="goods-cates-item"
          :class="{'active': item.cid === value}"
          v-for="item in list"
          :id="item.cid"
          :key="item.cid"
          @tap="toggle(item.cid)">{{item.cname}}</view>
  </view>
</scroll-view>
</template>

<script type='es6'>
export default {
	name: 'navs',
  props: {
	  list: Array,
    value: {
	    type: [String, Number],
      default: ''
    }
  },
	data() {
		return {}
	},
	methods: {
    toggle (cid) {
      this.$emit('input', cid)
      this.$emit('change')
    }
  }
}
</script>

<style>
.index-navs { width: 100%; }
.index-navs-list { display: flex; margin: 0 6px; align-items: baseline }
.index-navs-item { padding: 0 0 16px 0; margin-right: 15px; flex: auto 0 0; font-size: 14px; color: #FFFFFF; }
.index-navs-list .active { font-size: 18px; position: relative; }
.index-navs-list .active:after { content: ''; width: 20px; height: 2PX; background-color: #FFFFFF; position: absolute; left: 50%; bottom: 8px; transform: translateX(-50%); }
</style>

<template>
<scroll-view scrollX="true" class="index-navs">
  <view class="index-navs-list">
    <view class="index-navs-item"
          :class="{'active': current === ''}"
          @tap="toggle()">推荐</view>
    <view class="index-navs-item"
          :class="{'active': current === cate.cid}"
          v-for="cate in list"
          :key="cate.cid"
          @tap="toggle(cate)">{{cate.cname}}</view>
  </view>
</scroll-view>
</template>

<script type='es6'>
export default {
	name: 'navs',
  props: {
	  list: Array
  },
	data() {
		return {
      current: ''
    }
	},
	methods: {
    toggle (cate = {cid: '', color: ''}) {
      console.log('cate', cate)
      this.current = cate.cid
      this.$emit('change', {
        cid: cate.cid,
        color: cate.index_top_bg
      })
    }
  }
}
</script>

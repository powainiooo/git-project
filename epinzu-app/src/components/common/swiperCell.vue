<style lang="stylus" type="text/stylus">
.c-swiper-cell
  width 100%; overflow hidden;
  &-line
    width 100%; display flex; position relative; transition transform .2s ease-out;
  &-main
    width 100%; background-color #FFFFFF;
  &-right
    position absolute; top 0; right 0; transform translateX(100%); height 100%;
</style>

<template>
<view class="c-swiper-cell"
      catchMove
      @blur="cellBlur"
      @touchmove="tm"
      @touchstart="ts"
      @touchend="te">
  <view class="c-swiper-cell-line"
        :style="{'transform': 'translateX(' + (showRight ? '-' + rightWidth : '0') + ')'}">
    <view class="c-swiper-cell-main"><slot /></view>
    <view class="c-swiper-cell-right"><slot name="right" /></view>
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  rightWidth: {
	    type: String,
      default: '0px'
    }
  },
	data() {
		return {
      showRight: false,
      sx: 0
    }
	},
	methods: {
    ts (e) {
      console.log('ts', e)
      this.sx = e.changedTouches[0].clientX
    },
    te (e) {
      const ex = e.changedTouches[0].clientX
      if (this.sx > ex + 50) {
        this.showRight = true
      }
      if (ex > this.sx + 50) {
        this.showRight = false
      }
    },
    tm (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    cellBlur () {
      console.log('cellBlur')
    }
  }
}
</script>

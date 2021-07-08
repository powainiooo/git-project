<style lang="stylus" type="text/stylus">
.c-cell
  display flex; padding 16px 0; overflow hidden; background-color #FFFFFF;
  &:last-child:after
    height 0
  &-title
    flex 1
  &-value
    flex 1; text-align right;
  &-label
    margin-top 4px;
  &-arrow
    width 10px; display inline-block; margin-right 12px; margin-top 5px; margin-left 8px;
</style>

<template>
<view class="c-cell borderB" @tap="tapLink">
  <view class="c-cell-title">
    <text v-if="title">{{title}}</text>
    <slot name="title" v-else />
    <view class="c-cell-label">
      <text v-if="label">{{label}}</text>
      <slot name="label" v-else />
    </view>
  </view>
  <view class="c-cell-value">
    <text v-if="value">{{value}}</text>
    <slot name="value" v-else />
  </view>
  <image src="@/img/ar1.png" mode="widthFix" class="c-cell-arrow" v-if="isLink" />
</view>
</template>

<script type='es6'>
export default {
	name: 'Cell',
  props: {
	  title: {
	    type: String,
      default: ''
    },
	  value: {
	    type: String,
      default: ''
    },
	  label: {
	    type: String,
      default: ''
    },
    isLink: {
	    type: Boolean,
      default: false
    }
  },
	data() {
		return {}
	},
	methods: {
    tapLink () {
      if (this.isLink) {
        this.$emit('tap')
      }
    }
  }
}
</script>

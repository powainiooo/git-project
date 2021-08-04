<style lang="stylus" type="text/stylus">
.c-stepper
  width 82px; height 24px; border 1PX solid #F5F5F5; border-radius 12px; background-color #FFFFFF; display flex; overflow hidden;
  &-btn
    width 22px; display flex; justify-content center; align-items center;
  &-btn-disabled
    image
      opacity .3
  input
    width 36px; height 100%; text-align center; color #4D4D4D; font-size 12px; border-left 1PX solid #F5F5F5; border-right 1PX solid #F5F5F5;
</style>

<template>
<view class="c-stepper">
  <view class="c-stepper-btn c-stepper-reduce"
        :class="{'c-stepper-btn-disabled': value == 1}"
        @tap="reduce">
    <image src="@/img/reduce.png" mode="widthFix" class="w10" />
  </view>
  <input :value="value" />
  <view class="c-stepper-btn c-stepper-add" @tap="add"><image src="@/img/add.png" mode="widthFix" class="w10" /></view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
    value: {
	    type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
	data() {
		return {}
	},
	methods: {
    reduce () {
      const val = Number(this.value)
      if (val > 1) {
        this.$emit('input', val - 1)
        this.$emit('change', val - 1)
      }
    },
    add () {
      const val = Number(this.value)
      if (val < this.max) {
        this.$emit('input', val + 1)
        this.$emit('change', val + 1)
      }
    }
  }
}
</script>

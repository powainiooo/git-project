<style lang="stylus" type="text/stylus">
.overlay
  width 100%; height 100vh; position fixed; top 0; left 0; background-color rgba(0, 0, 0, .5); transition opacity .3s ease-out; opacity 0;
  &-show
    opacity 1
.c-popup
  width 100%; height 100vh; position fixed; top 0; left 0; z-index 100;
  &-box
    width 100%; min-height 100px; max-height 80vh; background-color #FFFFFF; position absolute; left 0; transition transform .3s ease-out
  &-bottom
    bottom 0; transform translateY(100%);
    &.round
      border-radius 8px 8px 0 0;
  &-top
    top 0; transform translateY(-100%);
    &.round
      border-radius 0 0 8px 8px;
  &-show
    transform translateY(0)
</style>

<template>
<view class="c-popup" v-if="show">
  <view class="overlay"
        :class="{'overlay-show': showItem}"
        @transitionend="onTransitionEnd"
        @tap="close"></view>
  <view class="c-popup-box" :class="boxClass">
    <slot />
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
    show: {
      type: Boolean,
      default: false
    },
	  placement: {
	    type: String,
      default: 'bottom'
    },
    round: {
	    type: Boolean,
      default: false
    }
  },
  computed: {
	  boxClass () {
	    return {
        [`c-popup-${this.placement}`]: true,
        'c-popup-show': this.showItem,
        'round': this.round
      }
    }
  },
  watch: {
	  show (val) {
	    if (val) {
	      setTimeout(() => {
          this.showItem = true
        }, 50)
      } else {
	      this.showItem = false
      }
    }
  },
	data () {
		return {
      showItem: false
    }
	},
	methods: {
    close () {
      this.showItem = false
    },
    onTransitionEnd () {
      if (!this.showItem) {
        this.$emit('update:show', false)
      }
    }
  }
}
</script>

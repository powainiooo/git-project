<style lang="stylus" type="text/stylus">
.overlay
  width 100%; height 100vh; overflow hidden; position fixed; top 0; left 0; background-color rgba(0, 0, 0, .4); transition opacity .3s ease-out; opacity 0;
  &-show
    opacity 1
.c-popup
  width 100%; height 100vh; position fixed; top 0; left 0; z-index 500; overflow hidden;
  &-box
    width 100%; min-height 100px; max-height 83vh; overflow hidden; background-color #FFFFFF; position absolute; left 0; transition transform .3s ease-out
  &-bottom
    bottom 0; transform translateY(100%);
    &.round
      border-radius 8px 8px 0 0;
  &-top
    top 0; transform translateY(-100%);
    &.round
      border-radius 0 0 8px 8px;
  &-close
    position absolute; top 16px; right 12px; z-index 50;
  &-scrolls
    height 100%; max-height 83vh;
  &-show
    transform translateY(0)
</style>

<template>
<view class="c-popup" v-if="show" catchMove @touchmove="tm">
  <view class="overlay"
        :class="{'overlay-show': showItem}"
        @transitionend="onTransitionEnd"
        @tap="close" catchMove></view>
  <view class="c-popup-box" :class="boxClass">
    <view class="c-popup-close"
          @tap="close"
          v-if="closeable">
      <image src="@/img/close.png" mode="widthFix" class="w20" />
    </view>
    <scroll-view :scrollY="true" class="c-popup-scrolls" catchMove>
      <slot />
    </scroll-view>
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'Popup',
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
    },
    closeable: {
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
	  show: {
	    handler (val) {
        if (val) {
          setTimeout(() => {
            this.showItem = true
          }, 50)
        } else {
          this.showItem = false
        }
      },
      immediate: true
    }
  },
	data () {
		return {
      showItem: false
    }
	},
	methods: {
    tm (e) {},
    close () {
      this.showItem = false
      this.$emit('close')
    },
    onTransitionEnd () {
      if (!this.showItem) {
        this.$emit('update:show', false)
      }
    }
  }
}
</script>

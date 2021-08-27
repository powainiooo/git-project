<style scoped>

</style>

<template>
<view class="audio-hint"
      :class="{'audio-hint-cancel': cancel}"
      v-if="visible">
  <view class="icons" v-if="cancel">
    <image src="@/img/retract.png" mode="widthFix" class="w60" />
  </view>
  <view class="icons" v-else>
    <image src="@/img/mic.png" mode="widthFix" class="w60" />
    <image src="@/img/voicel1.png" mode="widthFix" class="w24" v-show="index === 1" />
    <image src="@/img/voicel2.png" mode="widthFix" class="w24" v-show="index === 2" />
    <image src="@/img/voicel3.png" mode="widthFix" class="w24" v-show="index === 3" />
    <image src="@/img/voicel4.png" mode="widthFix" class="w24" v-show="index === 4" />
  </view>
  <view class="tc c-fff">手指上滑，取消发送</view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  cancel: Boolean
  },
	data() {
		return {
		  index: 1,
      visible: false,
      t: 0
    }
	},
	methods: {
	  start () {
	    this.visible = true
	    this.t = setInterval(() => {
	      this.index += 1
        if (this.index > 4) {
          this.index = 1
        }
      }, 300)
    },
    stop () {
      this.visible = false
	    clearInterval(this.t)
      this.index = 1
    }
  }
}
</script>

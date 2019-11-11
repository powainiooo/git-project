<style lang="stylus" type="text/stylus" scoped>
.btn-func
   position fixed
   top 23px
   right 43px
   a
      width 26px
      height 26px
      display block
      background-position center center
      background-repeat no-repeat
      background-size 100%
   .btn-close
      background-image url("../assets/images/icon-close.png")
   .btn-menu
      background-image url("../assets/images/icon-menu.png")
</style>

<template>
<div class="btn-func" :style="styles">
   <a href="javascript:;" class="btn-close" v-if="type === 'close'"></a>
   <a href="javascript:;" class="btn-menu" v-if="type === 'menu'"></a>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
   props: {
	   zIndex: {
	      type: Number,
         default: 10
      },
      type: {
	      type: String,
         default: 'close'
      }
   },
	computed: {
	   styles () {
	      return {
	         'z-index': this.zIndex,
	         // 'position': this.type === 'menu' ? 'fixed' : 'absolute'
            "top": this.type === 'menu' ? '23px' : '58px',
            "right": this.type === 'menu' ? '43px' : '53px',
         }
      }
   }
}
</script>

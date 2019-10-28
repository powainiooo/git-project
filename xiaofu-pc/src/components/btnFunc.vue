<style lang="stylus" type="text/stylus" scoped>
.btn-func
   position absolute
   top 60px
   right 60px
   a
      width 30px
      height 30px
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
	         'position': this.type === 'menu' ? 'fixed' : 'absolute'
         }
      }
   }
}
</script>

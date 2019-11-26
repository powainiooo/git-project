<style lang="stylus" type="text/stylus" scoped>
.btn-func
   position fixed
   top 23px
   right 43px
   a
      font-size 32px
      color #ffffff
</style>

<template>
<div class="btn-func" :style="styles">
   <a href="javascript:;" style="color: #002aa6" v-if="type === 'close'"><Icon type="md-close" /></a>
   <a href="javascript:;" v-if="type === 'menu'"><Icon type="ios-menu" /></a>
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
      },
      fixed: {
	      type: Boolean,
         default: false
      }
   },
	computed: {
	   styles () {
	      return {
	         'z-index': this.zIndex,
	         'position': this.fixed ? 'fixed' : 'absolute',
            "top": this.type === 'menu' ? '23px' : '58px',
            "right": this.type === 'menu' ? '43px' : '103px',
         }
      }
   }
}
</script>

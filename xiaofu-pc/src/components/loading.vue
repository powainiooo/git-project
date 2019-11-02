<style lang="stylus" type="text/stylus" scoped>
.z-loading
   position relative
   margin 20px 0
   text-align center
   &-dot
      width 10px
      height 10px
      display inline-block
      border 1px solid #ffffff
      border-radius 50%
      margin 0 3px
   &-active
      background-color #ffffff
</style>

<template>
<div class="z-loading">
   <span v-for="i in 4" class="z-loading-dot" :class="{'z-loading-active': i === index}"></span>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
         index: 1
      }
	},
   mounted () {
	   setInterval(() => {
	      this.index += 1
         if (this.index === 5) {
	         this.index = 1
         }
      } ,300)
   },
	methods: {}
}
</script>

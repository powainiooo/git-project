<style lang="stylus" type="text/stylus" scoped>
.z-block
   position relative
   margin 0 0 100px 0
   padding-left 125px
   &::after
      content ''
      width 435px
      height 1px
      position absolute
      bottom -50px
      left 158px
      background-color #dddddd
   .title
      font-size 26px
      line-height 1
      font-weight bold
      margin-bottom 30px
      margin-left 30px
.z-block-none
   &::after
      height 0
</style>

<template>
<div class="z-block">
   <div class="title">{{title}}</div>
   <slot></slot>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
   props: {
	   title: {
	      type: String,
         default: ''
      }
   },
	methods: {}
}
</script>

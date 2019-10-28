<style lang="stylus" type="text/stylus" scoped>
.menu-block
   height 100vh
   overflow auto
   background-color #f2f2f2
   &::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
   &::-webkit-scrollbar-thumb{ background-color: #002aa6;}
   .title-en
      font-size 50px
      font-family Helve
      line-height 60px
      padding 25px 50px
      border-bottom 1px solid #e2e2e2
      background-color #ffffff
   .title-cn
      font-size 32px
      font-family Helve
      line-height 1
      padding 20px 50px
      font-weight bold
      background-color #ffffff
</style>

<template>
<div class="menu-block">
   <div class="title-en"><slot name="en"></slot></div>
   <div class="title-cn"><slot name="cn"></slot></div>
   <div>
      <slot></slot>
   </div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>

<style lang="stylus" type="text/stylus" scoped>
.actor-list
   width 470px
   margin-left 15px
   &>li
      height 330px
      margin-bottom 24px
      box-shadow 0 0 20rpx rgba(0,0,0,0.25)
      border-radius 15px
      overflow hidden
      position relative
      img
         width 100%
         height 100%
      h3
         color #ffffff
         width 100%
         height 50px
         padding 0 20px
         display flex
         align-items center
         font-family Helve
         font-size 18px
         background-color #002aac
         word-break break-all
         position absolute
         bottom 0
         left 0
</style>

<template>
<div>
   <ul class="actor-list">
      <li>
         <img src="../../assets/images/img2.jpg">
         <h3>姓名</h3>
      </li>
      <li>
         <img src="../../assets/images/img2.jpg">
         <h3>姓名</h3>
      </li>
   </ul>
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

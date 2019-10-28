<style lang="stylus" type="text/stylus" scoped>
.qrcode
   width 650px
   height 260px
   display flex
   justify-content space-between
   align-items center
   background-color #ffffff
   padding 0 40px 0 20px
   border-radius 20px
   box-shadow 0 2px 3px rgba(0, 0, 0, 0.2)
   .code
      width 210px
      height 210px
</style>

<template>
<div class="qrcode">
   <img src="@/assets/images/img.jpg" class="code"/>
   <img src="@/assets/images/scan-hint.png" class="hint"/>
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

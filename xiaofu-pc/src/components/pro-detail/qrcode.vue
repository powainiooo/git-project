<style lang="stylus" type="text/stylus" scoped>
.qrcode
   width 480px
   height 190px
   display flex
   justify-content space-between
   align-items center
   background-color #ffffff
   padding 0 20px 0 20px
   border-radius 20px
   box-shadow 0 2px 3px rgba(0, 0, 0, 0.2)
   .code
      width 150px
      height 150px
   .hint
      width 255px
      height 72px
      margin-right 10px
</style>

<template>
<div class="qrcode">
   <img :src="imgData" class="code"/>
   <img src="@/assets/images/scan-hint.png" class="hint"/>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
   props: {
      imgData: {
         type: String,
         default: ''
      }
   },
	methods: {}
}
</script>

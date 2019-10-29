<style lang="stylus" type="text/stylus" scoped>
.contact-frame
   width 400px
   margin-left 30px
   display flex
   justify-content space-between
   align-items center
   img
      width 120px
   p
      font-size 16px
</style>

<template>
<div class="contact-frame">
   <img :src="imgSrc + itemData.cover" />
   <p>{{itemData.mobile}}</p>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
   props: {
      itemData: {
         type: Object,
         default: () => {}
      }
   },
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      }
   },
	methods: {}
}
</script>

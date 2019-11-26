<style lang="stylus" type="text/stylus" scoped>
.actor-list
   width 470px
   margin-left 15px
   list-style none
   &>li
      height 225px
      margin-bottom 24px
      box-shadow 0 0 20px rgba(0, 0, 0, .25)
      border-radius 15px
      overflow hidden
      position relative
      img
         width 100%
         height 100%
         border-radius 15px
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
      <li v-for="(i, index) in listData" :key="index">
         <img :src="imgSrc + i.picture">
         <h3>{{i.username}}</h3>
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
   props: {
      listData: {
         type: Array,
         default: () => []
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

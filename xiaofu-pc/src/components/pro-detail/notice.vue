<style lang="stylus" type="text/stylus" scoped>
.notice-list
   width 440px
   margin-left 30px
   li
      display flex
      margin-bottom 50px
      span
         width 95px
         font-size 58px
         line-height 1
         font-family Helve
      p
         width 345px
         color #888888
         font-size 14px
         line-height 1.4
         margin-bottom 2px
         align-self flex-end
</style>

<template>
<div>
   <ul class="notice-list">
      <li v-for="(item, index) in listData" :keys="index">
         <span>{{index<9 ? 0 : ''}}{{index + 1}}</span>
         <p>{{item}}</p>
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
	methods: {}
}
</script>

<style lang="stylus" type="text/stylus">
   .z-btn
      width 270px
      height 40px
      display flex
      justify-content center
      align-items center
      background-color #ffffff
      border-radius 20px
      box-shadow 0 2px 3px rgba(0, 0, 0, 0.2)
      color #000000
      font-weight bold
   .z-select
      select
         width 200px
         height 40px
         border-radius 20px
         box-shadow 0 2px 3px rgba(0, 0, 0, 0.2)
         padding 0 20px
         outline none
         border none
   .banner-container
      min-width 1090px
      height 365px
      position relative
      background-position center center
      background-repeat no-repeat
      background-image: url("../assets/images/banner.jpg")
      .z-btn
         position absolute
         top 160px
         right 160px
      .opera
         width 1090px
         position absolute
         bottom -20px
         left 50%
         margin-left -545px
</style>

<template>
<div class="banner-container">
   <a href="javascript:;" class="z-btn">了解详情</a>
   <div class="opera">
      <div class="z-select">
         <select>
            <option>深圳</option>
         </select>
      </div>
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

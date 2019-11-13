<template>
   <div id="app">
      <router-view/>
   </div>
</template>
<style lang="stylus" type="text/stylus">
   @import "assets/css/helve.css"
   @import "assets/css/micons.css"
   *
      margin 0
      padding 0
      box-sizing border-box
   body
      min-height 100vh
      min-width 1365px
      background linear-gradient(160deg, #0951db, #0026aa 54%,#003bbd)
   a
      text-decoration none
   #app
      color #000000
      font-family 'Avenir', Helvetica, Arial, sans-serif
      -webkit-font-smoothing antialiased
      -moz-osx-font-smoothing grayscale
   .swiper-btn
      width 30px
      height 30px
      border-radius 50%
      display none
      justify-content center
      align-items center
      background-color #ffffff
      position absolute
      top 98px
      z-index 10
      outline none
      &:hover
         background-color #002aa6
      i
         width 6px
         height 10px
   .swiper-btn-prev
      left 20px
      i
         background-image url("assets/images/arrow-left.png")
      &:hover
         i
            background-image url("assets/images/arrow-left-active.png")
   .swiper-btn-next
      right 20px
      i
         background-image url("assets/images/arrow-right.png")
      &:hover
         i
            background-image url("assets/images/arrow-right-active.png")
</style>

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
</style>

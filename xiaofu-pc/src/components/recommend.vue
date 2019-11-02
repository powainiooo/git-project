<style lang="stylus" type="text/stylus" scoped>
   .recommend-list
      width 100%
      height 365px
      flex-shrink 0
      background url("../assets/images/bg1.jpg") no-repeat
      background-position left center
      background-color #dddddd
      margin-top -50px
      margin-bottom 50px
</style>

<template>
   <div class="recommend-list" :style="styles">

   </div>
</template>

<script>
   export default {
      name: "recommend",
      computed: {
         wWidth () {
            return this.$store.state.wWidth
         },
         styles () {
            const w = this.wWidth
            return {
               'margin-left': -(w - 460 - 1090 - 50)/2 + 'px',
               'width': (w - 460) + 'px'
            }
         }
      }
   }
</script>

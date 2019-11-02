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
      display flex
      overflow-y hidden
      overflow-x auto
      padding-left 200px
      &::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
      &::-webkit-scrollbar-thumb{ background-color: #002aa6;}
      .list-item
         margin 80px 10px 0 0
</style>

<template>
   <div class="recommend-list" :style="styles">
      <list-item
         :width="265"
         v-for="i in listData"
         :key="i.id"
         :itemData="i"
         fold>
      </list-item>
   </div>
</template>

<script>
   import listItem from '@/components/listItem.vue'
   export default {
      name: "recommend",
      components: {listItem},
      props: {
         listData: {
            type: Array,
            default: () => []
         }
      },
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

<style lang="stylus" type="text/stylus">
.container
   min-height 100vh
   background-image url("../assets/images/go.png")
   background-repeat no-repeat
   background-position 0 42%
   background-attachment fixed
   .right
      margin-left 460px
      height 100vh
      overflow auto
      background-color rgba(255, 255, 255, 0.1)
   .pro-list-container
      width 1090px
      margin 70px auto 0 auto
      .pro-list
         margin 0 -25px
         display flex
         flex-wrap wrap
         .list-item
            margin 0 25px 100px 25px
</style>

<template>
   <div class="container">
      <search></search>
      <div class="right">
         <banner></banner>
         <div class="pro-list-container">
            <div class="pro-list">
               <list-item
                  v-for="i in listData"
                  :key="i.id"
                  :itemData="i"
                  fold
                  @click.native="getDetailData">
               </list-item>
            </div>
         </div>
      </div>
      <pro-detail :show.sync="showDetail" :itemData="detailData"></pro-detail>
      <z-menu></z-menu>
   </div>
</template>

<script>
   import search from '@/components/search.vue'
   import banner from '@/components/banner.vue'
   import listItem from '@/components/listItem.vue'
   import proDetail from '@/components/pro-detail/index.vue'
   import zMenu from '@/components/menu/index.vue'
   import {getProList, getProDetail, getMenuInfo} from '@/api.js'
   export default {
      name: 'home',
      components: {
         search,
         banner,
         listItem,
         proDetail,
         zMenu
      },
      data() {
         return {
            showDetail: false,
            listData: [],
            detailData: {}
         }
      },
      mounted () {
         this.getListData()
      },
      methods: {
         getListData () {
            getProList({
               keyword: '',
               page: 1,
               city: '',
               mid: ''
            }).then(res => {
               this.listData = res.data.list
            })
            getMenuInfo().then(res => {
               console.log(res)
            })
         },
         getDetailData (id) {
            getProDetail({
               tid: 1478,
               city: ''
            }).then(res => {
               this.detailData = res.data
               this.showDetail = true
            })
         }
      }
   }
</script>

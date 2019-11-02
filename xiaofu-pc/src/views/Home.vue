<style lang="stylus" type="text/stylus">
.container
   min-height 100vh
   background-image url("../assets/images/go.png")
   background-repeat no-repeat
   background-position 0 42%
   background-attachment fixed
   .right
      margin-left 460px
      min-width 1090px
      height 100vh
      overflow-y auto
      overflow-x hidden
      background-color rgba(255, 255, 255, 0.1)
      &::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
      &::-webkit-scrollbar-thumb{ background-color: #002aa6;}
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
      <search @search="doSearch"></search>
      <div class="right">
         <banner></banner>
         <div class="pro-list-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
            <div class="pro-list">
               <list-item
                  v-for="i in listData"
                  :key="i.id"
                  :itemData="i"
                  fold
                  v-if="i.cate === 'activity'"
                  @tap="getDetailData">
               </list-item>
               <!--<recommend></recommend>-->
            </div>
         </div>
         <loading v-if="isLoading"></loading>
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
   import recommend from '@/components/recommend.vue'
   import loading from '@/components/loading.vue'
   import {getProList, getProDetail} from '@/api.js'
   import {formatDate} from '@/util.js'
   export default {
      name: 'home',
      components: {
         search,
         banner,
         listItem,
         proDetail,
         zMenu,
         recommend,
         loading,
      },
      data() {
         return {
            showDetail: false,
            isLoading: false,
            listData: [],
            detailData: {},
            keyword: '',
            date: '',
            page: 1,
            city: '',
         }
      },
      mounted () {
         this.getListData()
      },
      methods: {
         getListData () {
            const date = this.date === '' ? '' : formatDate(this.date, 'yyyy/MM/dd')
            getProList({
               keyword: this.keyword,
               date,
               page: this.page,
               city: this.city,
               mid: ''
            }).then(res => {
               this.listData = res.data.list
            })
         },
         getDetailData (id) {
            console.log(id)
            getProDetail({
               tid: id,
               city: ''
            }).then(res => {
               this.detailData = res.data
               this.showDetail = true
            })
         },
         doSearch (data) {
            this.keyword = data.keyword
            this.date = data.date
            this.getListData()
         },
         loadMore () {
            console.log('loadMore')
         }
      }
   }
</script>

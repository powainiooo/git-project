<style lang="stylus" type="text/stylus">
.container
   min-height 100vh
   background-image url("../assets/images/go.png")
   background-repeat no-repeat
   background-position 0 42%
   background-attachment fixed
   overflow hidden
   .right
      min-width 1030px
      height 100vh
      overflow-y auto
      overflow-x hidden
      background-color rgba(255, 255, 255, 0.1)
      &::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
      &::-webkit-scrollbar-thumb{ background-color: #002aa6;}
   .pro-list-container
      max-width 1090px
      min-width 1030px
      margin 70px auto 0 auto
      .pro-list
         margin 0 -25px
         display flex
         flex-wrap wrap
         &>.pro-item
            margin-bottom 100px
</style>

<template>
   <div class="container">
      <search @search="doSearch" ref="search"></search>
      <div class="right">
         <banner showCity></banner>
         <div class="pro-list-container"
              ref="container"
              :style="proContainerStyle"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="isLoading"
              infinite-scroll-distance="10">
            <div class="pro-list" :style="proListStyle">
               <div v-for="i in listData" :key="i.id" :style="getProItemStyle(i.cate)">
                  <list-item
                     :itemData="i"
                     fold
                     v-if="i.cate === 'activity'"
                     @tap="getDetailData">
                  </list-item>
                  <recommend v-if="i.cate === 'recommend'" :listData="i.list"></recommend>
                  <!--<banner v-if="i.cate === 'banner'"></banner>-->
               </div>
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
      computed: {
         marginDis () {
            return this.$store.state.marginDis
         },
         wWidth () {
            return this.$store.state.wWidth
         },
         containerWidth () {
            return (330 + 2*this.marginDis)*3 - 2*this.marginDis
         },
         proContainerStyle () {
            return {
               width: `${this.containerWidth}px`
            }
         },
         proListStyle () {
            return {
               margin: `0 -${this.marginDis}px`
            }
         },
         proItemStyle () {
            return {
               margin: `0 ${this.marginDis}px 100px ${this.marginDis}px`
            }
         }
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
         getProItemStyle(cate) {
            if (cate === 'activity') {
               return {
                  margin: `0 ${this.marginDis}px 100px ${this.marginDis}px`
               }
            } else if (cate === 'recommend') {
               const searchW = this.$refs.search.$el.clientWidth
               let containerW = this.containerWidth
               return {
                  width: `${this.wWidth - searchW + this.marginDis}px`,
                  marginLeft: `-${(this.wWidth - searchW - containerW - this.marginDis) / 2}px`
               }
            }
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

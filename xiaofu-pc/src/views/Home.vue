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
      position relative
      .empty
         position absolute
         top 0
         left 0
      .pro-list
         margin 0 -25px
         display flex
         flex-wrap wrap
         &>.pro-item
            margin-bottom 100px
</style>

<template>
   <div class="container">
      <search @search="doSearch" ref="search" @taplogo="resetSearch"></search>
      <div class="right">
         <banner showCity
                 :id="bannerId"
                 :type="bannerType"
                 :citys="cityList"
                 @getcity="setCity"
                 :img="bannerImg"
                 @linkTo="getDetailData"
                 ref="banner"></banner>
         <div class="pro-list-container"
              :style="proContainerStyle"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="isLoading"
              infinite-scroll-distance="10">
            <img src="@/assets/images/empty.png" class="empty" v-if="showEmpty"/>
            <div class="pro-list" :style="proListStyle">
               <div v-for="(i, index) in listData" :key="index" :style="getProItemStyle(i.cate)">
                  <list-item
                     :itemData="i"
                     fold
                     v-if="i.cate === 'activity'"
                     @tap="getDetailData" style="margin: 50px 0;">
                  </list-item>
                  <recommend v-if="i.cate === 'recommend' && i.list.length !== 0" :listData="i.list" :bgSrc="bgSrc" :style="{width: frameW + 'px'}" :title="recommendTitle"  @linkTo="getDetailData"></recommend>
                  <banner v-if="i.cate === 'banner'" :id="i.id" :img="i.pc_image" @linkTo="getDetailData" :style="{width: frameW + 'px'}" :type="i.re_type"></banner>
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
   import {getProList, getProDetail, getCityBanner} from '@/api.js'
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
            isLoading: true,
            showEmpty: false,
            listData: [],
            detailData: {},
            keyword: '',
            date: '',
            page: 1,
            city: '',
            bannerId: '',
            bannerType: '',
            cityList: [],
            bannerImg: '',
            isListOver: false,
            recommendTitle: '',
            bgSrc: ''
         }
      },
      mounted () {
         this.getListData()
         this.getCityBanner()
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
         },
         frameW () {
            const searchW = this.$refs.search.$el.clientWidth
            return this.wWidth - searchW
         }
      },
      provide () {
         return {
            getDetailData: this.getDetailData
         }
      },
      methods: {
         getListData () {
            // const date = this.date === '' ? '' : formatDate(this.date, 'yyyy/MM/dd')
            this.showEmpty = false
            this.$store.commit('toggleCitySelect', this.date === '' && this.keyword === '')
            const date = this.date
            getProList({
               keyword: this.keyword,
               date,
               page: this.page,
               city: this.city,
               mid: ''
            }).then(res => {
               this.listData = this.listData.concat(res.data.list)
               this.isLoading = false
               if (res.data.list.length === 0 && this.page > 1) {
                  this.isListOver = true
               }
               this.showEmpty = this.listData.length === 0
            })
         },
         getCityBanner () {
            getCityBanner().then(res => {
               this.bannerId = res.data.b_id
               this.bannerType = res.data.type
               this.cityList = res.data.citys
               this.bannerImg = res.data.pccover
               this.recommendTitle = res.data.words
               this.bgSrc = res.data.drink
            })
         },
         getDetailData (id, callback) {
            console.log(id)
            getProDetail({
               tid: id,
               city: ''
            }).then(res => {
               this.detailData = res.data
               this.showDetail = true
               if (typeof callback === 'function') callback()
            })
         },
         getProItemStyle(cate) {
            const searchW = this.$refs.search.$el.clientWidth
            if (cate === 'activity') {
               return {
                  margin: `0 ${this.marginDis}px 0 ${this.marginDis}px`
               }
            } else if (cate === 'recommend') {
               let containerW = this.containerWidth
               return {
                  width: `${this.frameW}px`,
                  marginLeft: `-${(this.wWidth - searchW - containerW) / 2 - this.marginDis}px`
               }
            } else if (cate === 'banner') {
               let containerW = this.containerWidth
               return {
                  width: `${this.frameW}px`,
                  marginLeft: `-${(this.wWidth - searchW - containerW) / 2 - this.marginDis}px`,
                  marginBottom: '50px'
               }
            }
         },
         doSearch (data) {
            this.keyword = data.keyword
            this.date = data.date
            this.city = ''
            this.page = 1
            this.listData = []
            this.$refs.banner.resetCity()
            this.getListData()
         },
         setCity (id) {
            this.city = id === 0 ? '' : id
            this.page = 1
            this.keyword = ''
            this.date = ''
            this.listData = []
            this.$refs.search.reset()
            this.getListData()
         },
         loadMore () {
            if (this.isListOver) return
            this.isLoading = true
            console.log('loadMore'+this.isLoading)
            this.page += 1
            this.getListData()
         },
         resetSearch () {
            this.keyword = ''
            this.date = ''
            this.city = ''
            this.page = 1
            this.listData = []
            this.$refs.banner.resetCity()
            this.$refs.search.reset()
            this.getListData()
         }
      }
   }
</script>

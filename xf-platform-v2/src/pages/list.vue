<style>
    .prolist-frame{ width: 100vw; height: 100vh; overflow-y: scroll;}
    .prolist-frame::-webkit-scrollbar{ width: 3px; background-color: rgba(0,0,0,0);}
    .prolist-frame::-webkit-scrollbar-thumb{ background-color: #ffffff;}
    .prolist-frame .company-name{ font-size: 157px; color: #fff; position: absolute; left:60px; top: 90px; font-family: 'Helve';}
    .prolist-frame .list-content{  width: 1560px; display: flex; margin: 320px auto 0 auto; flex-wrap: wrap; position: relative; z-index: 900;}
    .prolist-frame .list-content>div{ margin:0 30px; transition: transform 0.15s ease-in-out; cursor: pointer;}
    .prolist-frame .list-content>div.touch{ transform: scale(0.96,0.96);}

    .prolist-frame .detail-frame{ width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 1011;}
    .prolist-frame .detail-frame .list-item{ margin-right: 60px; margin-top: 270px;}

    .prolist-frame .anim-detail{ animation-duration: 0.5s; animation-timing-function: cubic-bezier(.25,.76,.36,.97)}
    .prolist-frame .anim-detail2{ animation-duration: 0s; animation-timing-function: cubic-bezier(.25,.76,.36,.97)}
    .prolist-frame .btn-link{ width: 270px; position: fixed; top: 200px; right: 50px;}
    .prolist-frame .search{ position: fixed; top: 15px; right: 90px; z-index: 390;}

    .prolist-frame .xf-page { color: #ffffff;}
    .prolist-frame .xf-page .ivu-page-next, .xf-page .ivu-page-prev { background-color: transparent;}
    .prolist-frame .xf-page .ivu-page-next a, .xf-page .ivu-page-prev a { color: #ffffff;}
    .prolist-frame .xf-page .ivu-page-next:hover a, .xf-page .ivu-page-prev:hover a { color: #ffffff;}
    .prolist-frame .xf-page .ivu-page-next a:hover, .xf-page .ivu-page-prev a:hover { color: #ffffff;}
    .prolist-frame .xf-page.ivu-page-simple .ivu-page-simple-pager input { background-color: transparent; border-color: #ffffff; color: #ffffff;}
</style>

<template>
    <section class="prolist-frame" @scroll="pageScroll($event)">
        <div class="company-name">{{userActivity}}</div>
        <div class="btn-link" v-if="!showDetail && !showExample && frameST === 0"><t-button extraClass="white" @dotap="gotoPublish(-1)">发布新活动</t-button></div>
        <example v-if="showExample" @intolist="showExample=false"></example>

        <div class="search">
            <t-search @dosearch="dosearch"></t-search>
        </div>

        <transition enter-active-class="animated anim-detail fadeIn" leave-active-class="animated anim-detail2 fadeOut">
        <div class="list-content" v-if="!showExample && !showDetail">
            <div v-for="(item,index) in listData"
                 :key="index"
                 :class="touchIndex == index ? 'touch' : ''"
                 @mousedown="mDown(index)"
                 @mouseup="gotoDetail(index)"
                 :style="{cursor:item.status == 3 ? 'default' : 'pointer'}">
                <list-item
                    :itemdata="item"
                    :fileurl="fileurl"
                    @dooff="getListData"></list-item>
            </div>
        </div>
        </transition>
       <div style="width: 1500px; margin: 0 auto" v-if="!showExample && !showDetail">
          <Page :current="pageNo" :total="total" simple class-name="xf-page" @on-change="pageChange"/>
       </div>

        <div class="detail-frame" v-show="!showExample && showDetail">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated bounceOut">
            <list-item :itemdata="detailData" v-if="showDetail" :fileurl="fileurl" @dooff="itemChange"></list-item>
            </transition>
            <transition enter-active-class="animated anim-detail slideInRight" leave-active-class="animated anim-detail slideOutRight">
            <detail-frame v-if="showDetail"
                          ref="detailFrame"
                          @close="doCloseDetail"
                          @change="itemChange"
                          :itemData="detailData"
                          :fileurl="fileurl" ></detail-frame>
            </transition>
        </div>
    </section>
</template>

<script type='es6'>
import Example from '@/components/list/Example.vue'
import ListItem from '@/components/list/ListItem.vue'
import DetailFrame from '@/components/list/DetailFrame.vue'
import TButton from '@/components/common/TButton.vue'
import TSearch from '@/components/common/TSearch.vue'
import Cookies from 'js-cookie'
export default {
   name: 'app',
   components: { Example, ListItem, DetailFrame, TButton, TSearch },
   data () {
      return {
         showExample: false,
         showDetail: false,
         listData: [],
         detailData: {},
         frameST: 0,
         fileurl: '',
         touchIndex: -1,
         keyword: '',
         pageSize: 10,
         pageNo: 1,
         total: 0
      }
   },
   computed: {
      userActivity () {
         return this.$store.state.userData.activity || ''
      }
   },
   mounted () {
      this.$store.commit('doShowGlobalMenu', true)
      this.$ajax.defaults.headers.common['mid'] = Cookies.get('xfmid')
      this.$ajax.defaults.headers.common['tokey'] = Cookies.get('xftokey')
      // this.$ajax.defaults.baseURL = 'http://wechat.leesticket.com';
      let self = this
      this.$ajax.interceptors.response.use(res => {
         if (res.data.status === 0) {
            self.$tModal.warn({
               title: '登录信息过期，请重新登录。',
               onOk () {
                  self.$router.push('index')
               }
            })
         }
         return res
      }, function (error) {
      // 对响应错误做点什么
         return Promise.reject(error)
      })
      this.getListData()
      this.getNoticeList()
   },
   methods: {
      dosearch (keyword) {
         this.keyword = keyword
         this.getListData()
      },
      mDown (index) {
         let data = this.listData[index]
         if (data.status !== 3) {
            this.touchIndex = index
         }
      },
      getNoticeList () {
         let self = this
         this.$ajax.get('/client/api/notify_list').then(res => {
            let data = res.data
            for (let i of data.data) {
               let func = i.checked === '2' ? 'success' : 'error'
               let name = i.checked === '2' ? 'table' : 'refund-error'
               let title
               if (i.type === '1') {
                  title = i.checked === '2' ? '退款申请审核通过' : '退款申请审核不通过'
               } else if (i.type === '2') {
                  title = i.checked === '2' ? '提现申请审核通过' : '提现申请审核不通过'
               }
               this.$Notice[func]({
                  title: title,
                  duration: 0,
                  name: `notice${i.id}`,
                  render: h => {
                     return h('span', {
                        style: {
                           cursor: 'pointer',
                           'line-height': 1.5
                        },
                        on: {
                           click () {
                              if (i.type === 1) {
                                 self.gotoDetail2(i.goods_id, name)
                              }
                              self.$Notice.close(`notice${i.id}`)
                           }
                        }
                     }, i.content)
                  }
               })
            }
         })
      },
      pageChange (e) {
         this.pageNo = e
         this.getListData()
      },
      getListData () {
         let self = this
         this.$ajax.get('/client/api/activity_list', {
            params: {
               keyword: this.keyword,
               pageNo: this.pageNo,
               pageSize: this.pageSize
            }
         }).then(res => {
            let data = res.data
            const list = data.data.list
            this.total = data.data.total
            if (list.length === 0) {
               self.showExample = true
            } else {
               self.showExample = false
               self.listData = list
               self.fileurl = data.fileurl
            }
         })
      },
      gotoDetail (index) {
         let data = this.listData[index]
         if (data.status === 3) { // 审核未通过
            // this.$store.commit('setEditorData',data);
            // this.$router.push('publish');
         } else {
            this.touchIndex = -1
            setTimeout(() => {
               this.detailData = data
               this.showDetail = true
               this.$store.commit('doShowGlobalMenuDetail', false)
            }, 200)
         }
      },
      gotoDetail2 (id, name) {
         this.$ajax.get('/client/api/activity_info', {
            params: {
               aid: id
            }
         }).then(res => {
            this.detailData = res.data.data
            this.showDetail = true
            this.$store.commit('doShowGlobalMenuDetail', false)
            this.$nextTick(() => {
               this.$refs.detailFrame.switchPage(name)
            })
         })
      },
      pageScroll (e) {
         this.frameST = e.target.scrollTop
      },
      gotoPublish (id) {
         this.$store.commit('setEditorData')
         this.$store.commit('setErrorData')
         this.$router.push('publish')
      },
      itemChange (id) {
         let self = this
         this.$ajax.get('/client/api/activity_info', {
            params: {
               aid: id
            }
         }).then(res => {
            let data = res.data
            self.detailData = data.data
         })
      },
      doCloseDetail () {
         this.showDetail = false
         this.getListData()
      }
   }
}

</script>

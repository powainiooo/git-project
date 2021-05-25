<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.btn-publish
  width 125px
  position fixed
  top 84px
  right 40px
  z-index 400
.list-container
  width 1340px
  margin 130px auto 0 auto
  .list-item
    animation: scaleIn .4s cubic-bezier(.14,.66,.57,1.26) both;
  .ivu-col:nth-child(1)
    .list-item
      animation-delay .3s
  .ivu-col:nth-child(2)
    .list-item
      animation-delay .4s
  .ivu-col:nth-child(3)
    .list-item
      animation-delay .5s
  .ivu-col:nth-child(4)
    .list-item
      animation-delay .6s
  .ivu-col:nth-child(5)
    .list-item
      animation-delay .7s
  .ivu-col:nth-child(6)
    .list-item
      animation-delay .8s
  .ivu-col:nth-child(7)
    .list-item
      animation-delay .9s
  .ivu-col:nth-child(8)
    .list-item
      animation-delay 1s
  .ivu-col:nth-child(9)
    .list-item
      animation-delay 1.1s
  .c-ticket
    margin-bottom 40px
  .xf-page
    color #ffffff
    .ivu-page-next
      background-color transparent
      a
        color #ffffff
        &:hover
          color #ffffff
    .ivu-page-prev
      background-color transparent
      a
        color #ffffff
        &:hover
          color #ffffff
.detail-frame
  size(100%, 100%)
  acenter()
  justify-content flex-end
  abTL(0, 0)
  overflow hidden
  z-index 600
  .c-ticket
    margin-right: 60px;
@keyframes scaleIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
<template>
  <div class="home">
    <template v-if="showWelcome">
      <bg-slide />
      <welcome />
    </template>
    <template v-else>
      <z-header />
      <Button class="btn-publish" @click="$router.push('/publish')">发布新活动</Button>
      <div class="list-container" v-if="!showDetail">
        <Row :gutter="40">
          <Col span="8" v-for="(item, index) in list" :key="item.id">
            <div @mousedown="mDown(index)" @mouseup="gotoDetail(index)" class="list-item">
              <ticket :record="item"
                      operates
                      :class="{'c-ticket-touch': index === touchIndex}"
                      @offline="handleOff"
              />
            </div>
          </Col>
        </Row>
        <div v-if="!showWelcome && !showDetail && total !== 0 && total > pageSize">
          <Page :current="pageNo"
                :total="total"
                :page-size="pageSize"
                simple
                class-name="xf-page" @on-change="pageChange"/>
        </div>
      </div>
    </template>

    <div class="detail-frame" v-show="showDetail">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated bounceOut">
      <ticket :record="selectRecord"
              operates
              v-if="showDetail" />
      </transition>
      <transition enter-active-class="animated anim-detail slideInRight" leave-active-class="animated anim-detail slideOutRight">
      <c-details ref="details"
                 :record="detailRecord"
                 @close="closeDetail"
                 v-if="showDetail" />
      </transition>
    </div>
  </div>
</template>

<script>
import bgSlide from '@/components/bgSilde'
import welcome from '@/components/home/welcome'
import cDetails from '@/components/home/details'
import zHeader from '@/components/header'
import ticket from '@/components/ticket'
import { postAction } from '@/utils'

export default {
  name: 'Home',
  components: {
    bgSlide,
    welcome,
    cDetails,
    zHeader,
    ticket
  },
  data () {
    return {
      showWelcome: false,
      showDetail: false,
      list: [],
      selectRecord: {},
      detailRecord: {},
      total: 0,
      pageNo: 1,
      pageSize: 9,
      touchIndex: -1,
      isAjax: false
    }
  },
  created () {
    this.getData()
  },
  provide () {
    return {
      getDetails: this.getDetails
    }
  },
  methods: {
    getData () {
      postAction('/editor/ticket/lists', {
        page: this.pageNo,
        limit: this.pageSize
      }).then(res => {
        if (res.code === 1) {
          this.total = res.data.total
          this.list = res.data.list
          this.showWelcome = this.list.length === 0
        }
      })
    },
    pageChange (e) {
      this.pageNo = e
      this.getData()
    },
    mDown (index) {
      console.log('mDown', index)
      const data = this.list[index]
      if (data.sub_state !== 1) {
        this.touchIndex = index
      }
    },
    gotoDetail (index) {
      this.touchIndex = -1
      this.selectRecord = this.list[index]
      postAction('/editor/ticket/detail', {
        id: this.selectRecord.id
      }).then(res => {
        if (res.code === 1) {
          this.detailRecord = res.data
          this.$nextTick(() => {
            this.showDetail = true
          })
        }
      })
    },
    getDetails (id) {
      postAction('/editor/ticket/detail', {
        id
      }).then(res => {
        if (res.code === 1) {
          this.detailRecord = res.data
        }
      })
    },
    closeDetail () {
      this.showDetail = false
      this.getData()
    },
    handleOff (record) {
      if (this.isAjax) return
      let subState = 3
      let title = '是否确认下架该票务？'
      let content = '确认下架后，在小夫有票售票平台将隐藏该票务，用户无法获取该票务信息。'
      console.log('record', record)
      if (record.sub_state === 3) {
        subState = 2
        title = '是否确认上架该票务？'
        content = '确认上架后，在小夫有票售票平台将显示该票务，用户可获取该票务信息并进行购买操作。'
      }
      this.$tModal.confirm({
        title,
        content,
        onOk: () => {
          this.isAjax = true
          postAction('/editor/ticket/set_sale_state', {
            id: record.id,
            sub_state: subState
          }).then(res => {
            if (res.code === 1) {
              this.getData()
            }
            this.isAjax = false
          })
        }
      })
    }
  }
}
</script>

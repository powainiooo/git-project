<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.btn-publish
  width 125px
  position fixed
  top 84px
  right 40px
  z-index 500
.list-container
  width 1340px
  margin 130px auto 0 auto
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
  z-index 1200
  .anim-detail
    animation-duration .5s
    animation-timing-function cubic-bezier(.25,.76,.36,.97)
  .c-ticket
    margin-right: 60px;
</style>
<template>
  <div class="home">
    <template v-if="showWelcome">
      <bg-slide />
      <welcome />
    </template>
    <template v-else>
      <z-header />
      <Button class="btn-publish">发布新活动</Button>
      <div class="list-container" v-if="!showDetail">
        <Row :gutter="40">
          <Col span="8" v-for="(item, index) in list" :key="item.id">
            <div @mousedown="mDown(index)" @mouseup="gotoDetail(index)">
              <ticket :record="item"
                      operates
                      :class="{'c-ticket-touch': index === touchIndex}"
              />
            </div>
          </Col>
        </Row>
        <div v-if="!showWelcome && !showDetail && total !== 0">
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
      touchIndex: -1
    }
  },
  created () {
    this.getData()
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
    pageChange (e) {},
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
    closeDetail () {
      this.showDetail = false
      this.getData()
    }
  }
}
</script>

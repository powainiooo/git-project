<style lang="stylus" type="text/stylus" scoped>
@import "../../assets/css/global.styl"
.c-infos
  padding 128px 20px 80px 20px
.c-infos-line1
  margin 20px 25px 60px 25px
  display flex
  justify-content space-between
  flex-wrap wrap
.c-infos-ticket
  position relative;
  .hint
    font-size 12px; color #E63828; abTL(30px, 30px); animation-timing-function ease-out
  .thead
    between()
    margin 12px 36px 30px 30px
    li
      color #C8C9CA
  .tr
    between()
    margin 0 20px 30px 20px
    .names
      size(200px, 40px)
      background-color #EEEEEF
      border-radius 10px
      padding 0 5px 0 10px
      between()
      div
        size(65px, 30px)
        background-color #ffffff
        border-radius 6px
        padding 0 5px
        color #9E9E9F
        input
          size(34px, 100%)
          border none
          color #C8C9CA
        span
          color #C8C9CA
      h3
        color #6D9BF5
        font-size 16px
    .nums
      color #6D9BF5
      font-family HelveB
      font-size 36px
.c-infos-qrcode
  width 430px
  margin 50px auto 0 auto
  between()
  .item
    width 150px
    text-align center
    button
      width 90px
    .imgs
      size(130px, 130px)
      border-radius 8px
      center()
      margin-bottom 30px
    .wxcode
      size(150px, 150px)
      border-radius 50%
      margin-bottom 20px
</style>

<template>
<div class="c-infos">
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(1)" />
      <span>活动基本信息</span>
    </div>
  </div>
  <div class="c-infos-line1">
    <tag-line title="开票时间">
      <div class="between" style="color: #C8C9CA">
        <span>{{sDate}}</span>
        <span>{{sTime}}</span>
      </div>
    </tag-line>
    <tag-line title="停票时间">
      <div class="between" style="color: #C8C9CA">
        <span>{{eDate}}</span>
        <span>{{eTime}}</span>
      </div>
    </tag-line>
    <tag-line title="音乐类型" class="mt10">
      <div class="between" style="color: #C8C9CA">{{record.music_type_text}}</div>
    </tag-line>
  </div>

  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(2)" />
      <span>票务基本信息</span>
    </div>
    <Button size="small" @click="$emit('toggle', 'orders')">订单详情</Button>
  </div>

  <div class="c-infos-ticket">
    <ul class="thead">
      <li>票种</li>
      <li>数量（张）</li>
      <li>已售（张）</li>
      <li>销售状态</li>
    </ul>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" duration="400">
      <div class="hint" v-if="showHint">请按键盘“回车键”保存修改。</div>
    </transition>
    <div class="tr" v-for="item in record.price" :key="item.id">
      <div class="names">
        <h3>{{item.name}}</h3>
        <div class="between">
<!--          <span>{{item.num}}</span>-->
          <input v-model="item.num"
                 @focus="showHint = true"
                 @blur="showHint = false"
                 @keyup.enter="changeNums($event, item.id)" />张
<!--          <InputNumber-->
<!--            @on-focus="showHint = true"-->
<!--            @on-blur="showHint = false"-->
<!--            @on-keyup="changeNums($event, item.id)"-->
<!--            :min="item.num"-->
<!--            :value="item.num"-->
<!--            :formatter="value => `${value} 张`"-->
<!--            :parser="value => value.replace(' 张', '')"></InputNumber>-->
        </div>
      </div>
      <div class="nums">{{item.sold_num}}</div>
      <t-switch v-model="item.sold_out_flag" :true-value="1" :false-value="0" @on-change="statusChange($event, item.id)">
        <span slot="open">已售罄</span>
        <span slot="close">销售中</span>
      </t-switch>
    </div>
  </div>

  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(3)" />
      <span>链接码 及 验票码</span>
    </div>
    <Button size="small">验票流程</Button>
  </div>

  <div class="c-infos-qrcode">
    <div class="item">
      <div class="imgs wxcode">
        <img :src="record.miniapp_code_image" width="128" />
      </div>
      <Button size="small" @click="downloadImg(record.miniapp_code_image, '链接码')">下载链接码</Button>
    </div>
    <div class="item">
      <div class="imgs">
        <img :src="record.check_code_image" width="128" />
      </div>
      <Button size="small" @click="downloadImg(record.check_code_image, '验票码')">下载验票码</Button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import tagLine from '@/components/tagLine'
import TSwitch from '@/components/TSwitch'
import { formatDate } from '@/utils/tools'
import { postAction } from '../../utils'
export default {
  name: 'app',
  components: {
    tagLine,
    TSwitch
  },
  props: {
    record: Object,
    default: () => {}
  },
  watch: {
    record (val) {
      console.log('record', val)
    }
  },
  computed: {
    sDate () {
      if (this.record.sale_start_time) {
        return formatDate(new Date(this.record.sale_start_time * 1000), 'yyyy/MM/dd')
      }
      return '--'
    },
    sTime () {
      if (this.record.sale_start_time) {
        return formatDate(new Date(this.record.sale_start_time * 1000), 'HH:mm')
      }
      return '--'
    },
    eDate () {
      if (this.record.sale_end_time) {
        return formatDate(new Date(this.record.sale_end_time * 1000), 'yyyy/MM/dd')
      }
      return '--'
    },
    eTime () {
      if (this.record.sale_end_time) {
        return formatDate(new Date(this.record.sale_end_time * 1000), 'HH:mm')
      }
      return '--'
    }
  },
  data () {
    return {
      showHint: false
    }
  },
  inject: ['getDetails'],
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    },
    changeNums (e, id) {
      console.log('changeNums', e)
      const params = {
        ticket_price_id: id,
        num: e.target.value
      }
      this.changeTicketInfo(params)
    },
    statusChange (e, id) {
      console.log('statusChange', e)
      const params = {
        ticket_price_id: id,
        sold_out_flag: e
      }
      this.changeTicketInfo(params)
    },
    changeTicketInfo (params) {
      postAction('/editor/ticket/ticket_price_edit', params).then(res => {
        if (res.code === 1) {
          this.$Message.success('修改成功！')
          this.getDetails(this.record.id)
        }
      })
    },
    onfocus () {
      console.log('onfocus')
    },
    downloadImg (src, name) {
      window.open(src)
    }
  }
}
</script>

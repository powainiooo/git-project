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
      size(200px, auto)
      min-height 40px
      background-color #EEEEEF
      border-radius 10px
      padding 0 5px 0 10px
      between()
      div.between
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
        padding 6px 6px 6px 0
        text-align left
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
.canvas-frame
  fxTL(-10000px, -100000px)
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
    <Button size="small" @click="$emit('toggle', 'orders')" v-if="record.sub_state !== 0">订单详情</Button>
  </div>

  <div class="c-infos-ticket">
    <ul class="thead">
      <li>票种</li>
      <li>数量（张）</li>
      <li>已售（张）</li>
      <li>销售状态</li>
    </ul>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" duration="400">
    </transition>
    <div class="tr" v-for="(item, index) in prices" :key="item.id">
      <div class="names pr">
        <h3>{{item.name}}</h3>
        <div class="between">
<!--          <span>{{item.num}}</span>-->
          <input v-model="item.num"
                 @focus="showHintIndex = index"
                 @blur="ticketBlur(index)"
                 @keyup="changeNums($event, item)" />张
        </div>
        <div class="warnTxt" v-if="showHintIndex === index" style=" left: 105%; top: 10px;"><span>请按键盘“回车键”保存。</span></div>
      </div>
      <div class="nums">{{item.sold_num}}</div>
      <t-switch v-model="item.sold_out_flag" :true-value="1" :false-value="0" @on-change="statusChange($event, item.id)">
        <span slot="open">已售罄</span>
        <span slot="close">销售中</span>
      </t-switch>
    </div>
  </div>

  <div class="c-infos-titles" v-if="record.sub_state !== 0">
    <div class="l">
      <img :src="getIndexSrc(3)" />
      <span>链接码 及 验票码</span>
    </div>
    <Button size="small" @click="downloadImg(moduleSrc)">验票流程</Button>
  </div>

  <div class="c-infos-qrcode" v-if="record.sub_state !== 0">
    <div class="item">
      <div class="imgs wxcode">
        <img :src="qrSrc" width="128" id="qrcode" />
      </div>
      <Button size="small" @click="downloadQr(record.miniapp_code_image)">下载链接码</Button>
    </div>
    <div class="item">
      <div class="imgs wxcode">
        <img :src="record.check_code_image" width="128" />
      </div>
      <Button size="small" @click="downloadImg(record.check_code_image)">下载验票码</Button>
    </div>
  </div>

  <div class="canvas-frame">
    <canvas width="500" height="723" id="qrcanvas"></canvas>
    <img src="@/assets/img/qrframe.png" width="200" id="qrframe" />
  </div>
</div>
</template>

<script type='es6'>
import tagLine from '@/components/tagLine'
import TSwitch from '@/components/TSwitch'
import { downFile, postAction } from '../../utils'
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
    record: {
      handler (val) {
        const prices = []
        val.price.forEach(i => {
          prices.push({
            ...i,
            min: i.num
          })
        })
        this.prices = prices
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    sDate () {
      const st = this.record.sale_start_time_text
      if (st) {
        return st.split(' ')[0]
      }
      return '--'
    },
    sTime () {
      const st = this.record.sale_start_time_text
      if (st) {
        return st.split(' ')[1]
      }
      return '--'
    },
    eDate () {
      const et = this.record.sale_end_time_text
      if (et) {
        return et.split(' ')[0]
      }
      return '--'
    },
    eTime () {
      const et = this.record.sale_end_time_text
      if (et) {
        return et.split(' ')[1]
      }
      return '--'
    },
    qrSrc () {
      return `${window.baseUrl}/api/common/down_image?path=${this.record.miniapp_code_image}`
    }
  },
  data () {
    return {
      showHintIndex: false,
      prices: [],
      moduleSrc: 'https://image.leesticket.com//uploads/20210610/26706d8b5a89a5853470767ffc83dbdd.jpg'
    }
  },
  inject: ['getDetails'],
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    },
    changeNums (e, record) {
      console.log('changeNums', e)
      if (!/^[\d|\.]*$/.test(record.num)) {
        record.num = record.min
        return
      }
      if (e.key === 'Enter') {
        if (Number(e.target.value) < record.min) {
          this.$tModal.warning({
            title: '无法低于原有数量！',
            content: '设置的票数无法低于原来设置的数量，只可高于原有票数，请重新操作。',
            okText: '返回'
          })
          return
        }
        const params = {
          ticket_price_id: record.id,
          num: e.target.value
        }
        this.changeTicketInfo(params)
      }
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
    downloadImg (url) {
      window.open(`${window.baseUrl}/api/common/down_image?path=${url}`)
    },
    downloadQr (url) {
      const canvas = document.getElementById('qrcanvas')
      const ctx = canvas.getContext('2d')
      const bg = document.getElementById('qrframe')
      ctx.drawImage(bg, 0, 0)
      let reader = new FileReader()
      downFile('/api/common/down_image', {
        path: this.record.miniapp_code_image
      }).then(res => {
        console.log('down_image', res)
        reader.readAsDataURL(res)
      })
      reader.onload = function (e) {
        console.log('reader onload')
        var img = document.createElement('img')
        img.src = e.target.result
        img.onload = () => {
          console.log('img onload')
          ctx.beginPath()
          ctx.arc(248, 470, 230, 0, Math.PI * 2)
          ctx.fillStyle = '#FFFFFF'
          ctx.fill()
          ctx.clip()
          // const code = document.getElementById('qrcode')
          ctx.drawImage(img, 54, 276, 386, 386)
          setTimeout(() => {
            const content = canvas.toDataURL('image/png')
            const fileName = 'qrcode.png'
            const a = document.createElement('a')
            a.href = content
            a.download = fileName
            a.click()
            // document.removeChild(a)
          }, 1000)
        }
      }

    },
    ticketBlur (index) {
      this.showHintIndex = false
      const record = this.prices[index]
      if (Number(record.num) < record.min) {
        record.num = record.min
      }
    }
  }
}
</script>

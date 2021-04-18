<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.ticket-name
  height 40px
  background-color #EEEEEF
  border-radius 10px
  between()
  margin-bottom 10px
  div
    display flex
    align-items center
  a
    size(20px, 20px)
    border-radius 50%
    border 1px solid #6D9BF5
    margin 0 10px
    center()
    &.active:after
      content ''
      size(10px, 10px)
      border-radius 50%
      bgG()
  p
    font-size 16px
    color #6D9BF5
  input
    size(120px, 30px)
    background-color #ffffff
    border-radius 6px
    padding 0 10px
    margin-right 5px
    border none
    -webkit-tap-highlight-color transparent
    outline none
    line-height 30px
.ticket-name-diy
  display flex
  align-items center
  margin-bottom 10px
.btn-add
  display block
  width 30px
  margin 24px auto
</style>

<template>
<div class="center step-frame">
  <form-box :width="900" :height="280" :index="step">
    <template slot="button">
    <Button size="small" v-if="step !== 1" @click="handlePrev">上一步</Button>
    <Button size="small" :disabled="nextDisabled" @click="handleNext">下一步</Button>
    </template>
    <div class="form-grid">
      <div class="form-col">
        <Form class="form">
          <div class="form-title" style="margin-bottom: 0;">票务信息</div>
          <div class="form-cell"
               v-for="(item, index) in ticketList"
               :key="index">
            <div class="ticket-name" v-if="item.type === 'default'">
              <div>
                <a href="javascript:;" :class="{'active': item.check}" @click="item.check = !item.check"></a>
                <p>{{item.name}}</p>
              </div>
              <input v-model="item.price" placeholder="价格（元）" />
            </div>
            <div class="ticket-name-diy" v-else-if="item.type === 'diy'">
              <Input v-model="item.name" placeholder="票种名称" style=" margin-right: 10px;" />
              <a href="javascript:;" @click="delTicket(index)"><img src="@/assets/img/ico-del.png" /></a>
            </div>
            <div class="between">
              <Input v-model="item.num" placeholder="张数" style="width: 120px" />
              <Input v-model="item.limit" placeholder="限购张数" style="width: 120px" />
            </div>
            <div style="margin-top: 10px;" v-if="item.type === 'diy'">
              <Input v-model="item.price" placeholder="价格（元）" />
            </div>
          </div>
          <a href="javascript:;" class="btn-add" @click="addTicket"><img src="@/assets/img/ico-add.png" /></a>
        </Form>
      </div>
      <div class="form-col">
        <Form class="form">
          <div class="form-title" style="margin-bottom: 0;">票务信息</div>
          <div class="form-cell" style="margin-bottom: 20px">
            <FormItem>
              <Select placeholder="门票类型" v-model="formData.ticket_type">
                <Option :value="1">电子票</Option>
                <Option :value="2">纸质票</Option>
              </Select>
            </FormItem>
            <FormItem style="margin-bottom: 0">
              <Select placeholder="是否需要身份证" v-model="formData.id_card_flag">
                <Option :value="1">是</Option>
                <Option :value="0">否</Option>
              </Select>
            </FormItem>
          </div>
          <FormItem>
            <c-date-time placeholder="显示时间" type="time" v-model="formData.show_time" />
          </FormItem>
          <FormItem>
            <c-date-time placeholder="开票时间" type="time" v-model="formData.sale_start_time" />
          </FormItem>
          <FormItem>
            <c-date-time placeholder="结束售票时间" type="time" v-model="formData.sale_end_time" />
          </FormItem>
        </Form>
      </div>
      <div class="form-col">
        <Form class="form">
          <div class="form-title" style="margin-bottom: 0;">活动须知（点击修改）</div>
          <div class="form-cell"
               v-for="(item, index) in noticeList"
               :key="index">
            <img :src="getIndexSrc(index)" style="display: block; margin-bottom: 10px; margin-left: 10px; "/>
            <Input type="textarea" :rows="4" placeholder="填写须知(30字内)" v-model="item.notice" />
          </div>
          <a href="javascript:;" class="btn-add" @click="addNotice"><img src="@/assets/img/ico-add.png" /></a>
        </Form>
      </div>
    </div>
  </form-box>
</div>
</template>

<script type='es6'>
import formBox from '@/components/formBox'
import cDateTime from '@/components/cDateTime'
export default {
  name: 'app',
  props: {
    step: [Number, String]
  },
  components: {
    formBox,
    cDateTime
  },
  computed: {
    nextDisabled () {
      const d = this.formData
      for (const key in d) {
        if (d[key] === '') {
          return true
        }
      }
      for (const i of this.ticketList) {
        if (i.name === '' || i.price === '' || i.num === '' || i.limit === '') {
          return true
        }
      }
      for (const i of this.noticeList) {
        if (i.notice === '') {
          return true
        }
      }
      return false
    }
  },
  data () {
    return {
      ticketList: [
        {
          type: 'default',
          check: true,
          name: '早鸟票',
          price: '',
          num: '',
          limit: ''
        },
        {
          type: 'default',
          check: true,
          name: '预售票',
          price: '',
          num: '',
          limit: ''
        },
        {
          type: 'default',
          check: true,
          name: '普通票',
          price: '',
          num: '',
          limit: ''
        }
      ],
      noticeList: [
        { notice: '请遵守法律法规，不要吸食毒品，拒绝黄赌毒侵蚀活动现场。' },
        { notice: '未满18岁请勿购买，概不退换。' },
        { notice: '本门票只能在xxx使用' }
      ],
      formData: {
        ticket_type: '',
        id_card_flag: '',
        show_time: '',
        sale_start_time: '',
        sale_end_time: ''
      }
    }
  },
  methods: {
    handlePrev () {
      this.$emit('change', 'back')
    },
    handleNext () {
      this.$emit('change', 'next')
    },
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + (index + 1) + '.png')
    },
    addTicket () {
      this.ticketList.push({
        type: 'diy',
        name: '',
        price: '',
        num: '',
        limit: ''
      })
    },
    delTicket (index) {
      this.ticketList.splice(index, 1)
    },
    addNotice () {
      this.noticeList.push({
        notice: ''
      })
    },
    getParams () {
      const ts = []
      for (const t of this.ticketList) {
        delete t.type
        delete t.check
        ts.push(t)
      }
      const params = { ...this.formData }
      params.ticket_prices = JSON.stringify(ts)
      params.notices = JSON.stringify([...this.noticeList])
      return params
    }
  }
}
</script>

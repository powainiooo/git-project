<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.ticket-name
  height 40px
  background-color #EEEEEF
  border-radius 10px
  between()
  margin-bottom 10px
  position relative
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
    padding 0 25px 0 10px
    margin-right 5px
    border none
    -webkit-tap-highlight-color transparent
    outline none
    line-height 30px
  span.info
    display inline-block
    size(120px, 30px)
    line-height 30px
    color #9E9E9F
.ticket-info2
  size(120px, 40px)
  border-radius 10px
  background-color #EEEEEF
  color #9E9E9F
  padding-left 10px
  line-height 40px
.ticket-name-diy
  display flex
  align-items center
  margin-bottom 10px
.btn-add
  display block
  width 30px
  margin 24px auto
  &:hover
    opacity .5
  img
    width 100%
.btn-close:hover
  opacity: .5;
.t-unit
  position absolute; top 10px; right 10px;
.t-pre
  position absolute; top 10px; left 10px; z-index 2;
.unit-input
  .ivu-input
    padding-right 30px
.unit-input2
  .ivu-input
    padding-left 56px
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
          <!-- 审核显示 -->
          <template v-if="isEditor">
            <div class="form-cell"
                 v-for="item in ticketList"
                 :key="item.id">
              <div class="ticket-name">
                <div>
                  <p class="ml10">{{item.name}}</p>
                </div>
                <span class="info">{{item.price}}元</span>
              </div>
              <div class="between">
                <span class="ticket-info2">{{item.num}} 张</span>
                <span class="ticket-info2">限购 {{item.limit}} 张数</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="form-cell"
                 v-for="(item, index) in ticketList"
                 :key="index">
              <div class="ticket-name" v-if="item.type === 'default'">
                <div>
                  <a href="javascript:;" :class="{'active': item.check}" @click="item.check = !item.check"></a>
                  <p>{{item.name}}</p>
                </div>
                <input v-model="item.price" placeholder="价格（元）" />
                <span class="t-unit" v-if="item.price !== ''">元</span>
              </div>
              <div class="ticket-name-diy" v-else-if="item.type === 'diy'">
                <Input v-model="item.name" placeholder="票种名称" :maxlength="12" show-word-limit style=" margin-right: 10px;" />
                <a href="javascript:;" @click="delTicket(index)"><img src="@/assets/img/ico-del.png" /></a>
              </div>
              <div class="pr" v-if="item.type === 'diy'">
                <Input v-model="item.price" placeholder="价格（元）" />
                <span class="t-unit" v-if="item.price !== ''">元</span>
              </div>
              <div class="between" style="margin-top: 10px;" >
                <div class="pr">
                  <Input v-model="item.num" placeholder="张数" style="width: 120px" class="unit-input" />
                  <span class="t-unit" v-if="item.num !== ''">张</span>
                </div>
                <div class="pr">
                  <span class="t-pre" v-if="item.limit !== ''">限购</span>
                  <Input v-model="item.limit"
                         placeholder="限购张数"
                         style="width: 120px"
                         class="unit-input"
                         :class="{'unit-input2': item.limit !== ''}" />
                  <span class="t-unit" v-if="item.limit !== ''">张</span>
                </div>
              </div>
            </div>
            <a href="javascript:;" class="btn-add" @click="addTicket"><img src="@/assets/img/ico-add.png" /></a>
          </template>
        </Form>
      </div>
      <div class="form-col">
        <Form class="form borderR">
          <div class="form-title" style="margin-bottom: 0;">票务信息</div>
          <div class="form-cell" style="margin-bottom: 20px">
            <FormItem>
              <tag-line title="门票类型" v-if="isEditor">{{formData.ticket_type === 1 ? '电子票' : '纸质票'}}</tag-line>
              <Select placeholder="门票类型" v-model="formData.ticket_type" v-else>
                <Option :value="1">电子票</Option>
                <Option :value="2">纸质票</Option>
              </Select>
            </FormItem>
            <FormItem style="margin-bottom: 0">
              <tag-line title="证件类型" v-if="isEditor">身份证</tag-line>
              <Select placeholder="是否需要证件" v-model="formData.id_card_flag" v-else>
                <Option :value="0">否</Option>
                <Option :value="1">是</Option>
              </Select>
            </FormItem>
          </div>
          <FormItem>
            <tag-line title="显示时间" v-if="isEditor">{{showTime}}</tag-line>
            <c-date-time placeholder="显示时间" format="yyyy-MM-dd HH:mm" type="datetime" :clearable="false" v-model="formData.show_time" v-else />
          </FormItem>
          <FormItem>
            <tag-line title="开票时间" v-if="isEditor">{{saleStartTime}}</tag-line>
            <c-date-time placeholder="开票时间" format="yyyy-MM-dd HH:mm" type="datetime" :clearable="false" v-model="formData.sale_start_time" v-else />
          </FormItem>
          <FormItem>
            <tag-line title="停票时间" v-if="isEditor">{{saleEndTime}}</tag-line>
            <c-date-time placeholder="停票时间" format="yyyy-MM-dd HH:mm" type="datetime" :clearable="false" v-model="formData.sale_end_time" v-else />
          </FormItem>
        </Form>
      </div>
      <div class="form-col">
        <Form class="form notice-list borderL">
          <div class="form-title" style="margin-bottom: 0;">活动须知（点击修改）</div>
          <div class="form-cell pr "
               v-for="(item, index) in noticeList"
               :key="index">
            <img :src="getIndexSrc(index)" style="display: block; margin-bottom: 10px; margin-left: 10px; height: 30px; "/>
            <a href="javascript:;"
               class="btn-close"
               v-if="index > 0 && !isEditor"
               @click="delNotice(index)"
               style="position: absolute; top: 30px; right: 26px;">
              <img src="@/assets/img/ico-close2.png" width="20" />
            </a>
            <Input type="textarea"
                   :rows="4"
                   placeholder="填写须知(30字内)"
                   v-model="item.notice"
                   :class="{'err-inp': isEditor && errorData.notice && errorData.notice[index]}" />
            <div class="warnTxt"
                 style="left: 24%; top: 20px;"
                 v-if="isEditor && errorData.notice && errorData.notice[index]"><span>{{errorData.notice[index]}}</span></div>
          </div>
          <a href="javascript:;" class="btn-add" @click="addNotice" v-if="!isEditor && noticeList.length < 20"><img src="@/assets/img/ico-add.png" /></a>
        </Form>
      </div>
    </div>
  </form-box>
</div>
</template>

<script type='es6'>
import formBox from '@/components/formBox'
import cDateTime from '@/components/cDateTime'
import tagLine from '../tagLine'
import { formatDate } from '@/utils/tools'
export default {
  name: 'app',
  props: {
    step: [Number, String],
    type: {
      type: String,
      default: 'new'
    }
  },
  components: {
    formBox,
    cDateTime,
    tagLine
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
        if (i.type === 'default') {
          if (i.check) {
            if (i.name === '' || i.price === '' || i.num === '') {
              return true
            }
          } else {
            continue
          }
        } else {
          if (i.name === '' || i.price === '' || i.num === '') {
            return true
          }
        }
      }
      for (const i of this.noticeList) {
        if (i.notice === '') {
          return true
        }
      }
      return false
    },
    errorData () {
      return this.$store.state.errorData
    },
    isEditor () {
      return this.type === 'modify'
    },
    showTime () {
      if (this.formData.show_time) {
        return formatDate(new Date(this.formData.show_time), 'yyyy-MM-dd HH:mm')
      } else {
        return ''
      }
    },
    saleStartTime () {
      if (this.formData.sale_start_time) {
        return formatDate(new Date(this.formData.sale_start_time * 1000), 'yyyy-MM-dd HH:mm')
      } else {
        return ''
      }
    },
    saleEndTime () {
      if (this.formData.sale_end_time) {
        return formatDate(new Date(this.formData.sale_end_time * 1000), 'yyyy-MM-dd HH:mm')
      } else {
        return ''
      }
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
        check: true,
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
    delNotice (index) {
      this.noticeList.splice(index, 1)
    },
    getParams () {
      const ts = []
      for (const t of this.ticketList) {
        if (t.check) {
          delete t.type
          delete t.check
          ts.push(t)
        }
      }
      const params = { ...this.formData }
      params.ticket_prices = JSON.stringify(ts)
      params.notices = JSON.stringify([...this.noticeList])
      return params
    },
    setData (record) {
      const ticket = []
      for (const i of record.price) {
        i.check = true
        ticket.push(i)
      }
      this.ticketList = ticket
      const arr = []
      for (const i of record.notice_list) {
        arr.push({
          notice: i
        })
      }
      this.noticeList = arr
      for (const key in this.formData) {
        this.formData[key] = record[key]
      }
      console.log('this.formData', this.formData)
    }
  }
}
</script>

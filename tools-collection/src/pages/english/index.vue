<style scoped>
.box1 { border: 2px solid #D4D4D4; border-radius: 4px; padding: 30px 20px; min-height: 294px; font-size: 24px; color: #666666; line-height: 40px; margin-bottom: 40px; }
.englist-tab { justify-content: flex-start; }
.englist-tab li { width: 60px; font-size: 24px; margin-right: 50px; }
.englist-tab li.active { color: #3366CC; border-bottom-color: #3366CC; }

.box2 { min-height: 216px; background-color: #F9F9F9; border-radius: 4px; padding: 30px 20px; font-size: 24px; color: #666666; line-height: 40px; }

.e-title { height: 70px; padding-left: 38px; font-size: 24px; color: #3366CC; }

</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml30 mr30">

      <div class="between mt40 mb20">
        <div class="f24 c-99" @click="toDay('pre')">前一天</div>
        <div class="f24 c-99" @click="toDay('next')">后一天</div>
      </div>

      <div class="box1">{{record.content}}</div>

      <ul class="tabs2 englist-tab">
        <li :class="{'active': tabKey === 0}" @click="tabKey = 0">译文</li>
        <li :class="{'active': tabKey === 1}" @click="tabKey = 1">来源</li>
      </ul>

      <div class="box2">{{details}}</div>

      <h3 class="e-title acenter">音频地址</h3>

      <c-audio :src="record.tts" title="" />

      <h3 class="e-title acenter">图示</h3>
      <img :src="record.imgurl" mode="widthFix" class="w100 mb40">
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cAudio from '@/components/audio'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates,
    cAudio
  },
  data () {
    return {
      id: '',
      record: {},
      tabKey: 0,
      type: '',
      date: ''
    }
  },
  computed: {
    details () {
      if (this.tabKey === 0) {
        return this.record.note
      } else if (this.tabKey === 1) {
        return this.record.source
      }
    }
  },
  methods: {
    getData () {
      postAction('english_day', {
        date: this.date,
        type: this.type
      }).then(res => {
        if (res.ret === 0) {
          if (res.data.length === 0) {
            mpvue.showToast({
              title: res.message,
              icon: 'none'
            })
          } else {
            this.record = res.data[0]
          }
          this.date = res.date
        }
      })
    },
    toDay (type) {
      this.type = type
      this.getData()
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '每日英语',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

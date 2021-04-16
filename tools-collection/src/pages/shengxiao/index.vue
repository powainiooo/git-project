<style scoped>
.pair-item { width: 188px; height: 130px; background: #F9F9F7; border-radius: 4px; }
.pair-item .line1 { width: 100%; height: 50px; border-radius: 0 0 50px 50px; font-size: 30px; color: #FFFFFF; margin-bottom: 20px; background-color: #436CB3; }
.pair-item .line1 img { width: 28px; margin-right: 10px; }
.pair-item .selects { width: 160px; height: 42px; border: 2px solid #B6B6B6; border-radius: 4px; font-size: 24px; color: #B6B6B6; padding-left: 14px; margin: 0 auto; }
.pair-item .selects img { width: 14px; margin-left: 12px; margin-right: 20px; }

.btn-pair { width: 250px; border-radius: 35px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml120 mr120 between mt40 mb40">
      <div class="pair-item">
        <div class="line1 center">
          <img src="/static/images/male.png" mode="widthFix" />男生
        </div>
        <picker :range="list" @change="onChange($event, 'man')">
          <div class="selects between">
            <span>{{man === '' ? '选择生肖' : man}}</span>
            <img src="/static/images/arrow8.png" mode="widthFix" />
          </div>
        </picker>
      </div>
      <div class="pair-item">
        <div class="line1 center" style="background-color: #EA749E;">
          <img src="/static/images/female.png" mode="widthFix" />女生
        </div>
        <picker :range="list" @change="onChange($event, 'woman')">
          <div class="selects between">
            <span>{{woman === '' ? '选择生肖' : woman}}</span>
            <img src="/static/images/arrow8.png" mode="widthFix" />
          </div>
        </picker>
      </div>
    </div>

    <div class="tc mb55">
      <button class="btn btn-min btn-pair" @click="getData">立即配对</button>
    </div>

    <div class="blue-box" style="min-height: calc(100vh - 440rpx)" v-if="showResult">
      <h3>生肖{{man}}和生肖{{woman}}</h3>
      <div>
        <p>{{record.data}}</p>
      </div>
    </div>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      list: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
      record: {},
      man: '',
      woman: '',
      showResult: false
    }
  },
  methods: {
    getData () {
      if (this.man === '' || this.woman === '') {
        mpvue.showToast({
          title: '请选择生肖',
          icon: 'none'
        })
        return
      }
      postAction('constellation_zodiac', {
        man: this.man,
        woman: this.woman
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          this.showResult = true
        }
      })
    },
    onChange (e, key) {
      this[key] = this.list[e.mp.detail.value]
    }
  },
  created () {
  }
}
</script>

<style scoped>
.post-container { height: 82vh; overflow-x: hidden; }
.post-container .top-line { padding: 40px 34px 50px 34px; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); }
.post-container .top-line .btn { margin: 50px 0 0 50px; }
.post-container .list { margin: 50px 40px 0 40px; min-height: 100%; padding-bottom: 50px; }
.post-container .list:before { top: 14px; }
.post-container .list li { margin-left: 18px; margin-bottom: 50px; position: relative; }
.post-container .list li:before { content: ''; width: 10px; height: 10px; border-radius: 50%; background-color: #B9BABB; position: absolute; top: 14px; left: -22px; }
.post-container .list li:first-child:before { background-color: #F0916C; }
.post-container .list li div { font-size: 24px; color: #B9BABB; }
.post-container .list li:first-child div { color: #41372D; }
.post-container .list li p { font-size: 20px; line-height: 26px; color: #9E9E9F; }
.post-container .scrolls { height: calc(82vh - 340px); }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box ovh post-container" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>

    <div class="bg-fff top-line">
      <div class="mb50" style="margin-right: 160rpx;">
        <p class="form-title ml15 c-9e">快递公司</p>
        <div class="form-line">
          <div class="form-item">
            <input :value="record.kd_company" disabled style="font-size: 30rpx;" />
          </div>
        </div>
      </div>
      <div class="flex">
        <div style="flex: 1;">
          <p class="form-title ml15 c-9e">快递单号</p>
          <div class="form-line">
            <div class="form-item">
              <input :value="record.kd_no" class="large" disabled />
            </div>
          </div>
        </div>
        <button class="btn btn-style1" hover-class="hscale" hover-stay-time="10" @click="copy">复制单号</button>
      </div>
    </div>
    <scroll-view scroll-y class="scrolls">
      <ul class="list borderL">
        <li v-for="i in list" :key="index">
          <div>{{i.title}}</div>
          <p>{{i.datetime}}</p>
        </li>
      </ul>
    </scroll-view>
  </div>
</div>
</template>

<script type='es6'>
import {getAction} from '@/utils/api'

export default {
  name: 'app',
  data() {
    return {
      visible: false,
      showItem: false,
      record: {},
      list: []
    }
  },
  methods: {
    show (id) {
      this.visible = true
      getAction('/userapi/nearby/order/express', {
        order_id: id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
          this.list = res.data.list
          this.$nextTick(() => {
            this.showItem = true
          })
        } else {
          this.visible = false
        }
      })
    },
    hide () {
      this.showItem = false
      setTimeout(() => {
        this.visible = false
      }, 500)
    },
    animationend () {
      this.visible = false
    },
    copy () {
      mpvue.setClipboardData({
        data: this.record.kd_no,
        success (res) {
          console.log('setClipboardData', res)
        }
      })
    }
  }
}
</script>

<style scoped>
.box { width: 690px; margin: 0 auto 36px auto; background-color: #FFFFFF; box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08); border-radius: 4px; overflow: hidden; }
.search-box { height: 90px; margin: 70px 50px 60px 50px; background-color: #F2F5F9; position: relative; }
.search-box input { width: 100%; height: 100%; padding-left: 210px; box-sizing: border-box; font-size: 28px; }
.search-box img { width: 28px; position: absolute; top: 30px; left: 160px; }

.res-list { margin: 50px 45px; }
.res-list li { display: flex; font-size: 26px; margin-bottom: 20px; }
.res-list li span { width: 145px; }
.res-list li p { color: #436CB3; }
</style>

<template>
  <div class="container3">
    <img src="/static/images/banner3.png" class="w100" mode="widthFix">

    <div class="box" style="margin-top: -220rpx">
      <div class="search-box">
        <img src="/static/images/sousuo3.png" mode="widthFix" />
        <input type="text" placeholder="请输入手机号码" v-model="keyword" />
      </div>
      <div class="ml50 mr50 mb95">
        <button class="btn" @click="getData">马上查询</button>
      </div>
    </div>

    <div class="box" v-if="showResult">
      <h3 class="tc mt50">【查询结果】</h3>
      <ul class="res-list">
        <li>
          <span>电话号码：</span>
          <p>{{record.phone}}</p>
        </li>
        <li>
          <span>省：</span>
          <p>{{record.province}}</p>
        </li>
        <li>
          <span>市：</span>
          <p>{{record.city}}</p>
        </li>
        <li>
          <span>区号：</span>
          <p>{{record.areacode}}</p>
        </li>
        <li>
          <span>邮编：</span>
          <p>{{record.zip}}</p>
        </li>
        <li>
          <span>运营商：</span>
          <p>{{record.company}}</p>
        </li>
      </ul>
    </div>

    <operates :id="id" />
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
      id: '',
      keyword: '',
      record: {},
      showResult: false
    }
  },
  methods: {
    getData () {
      if (this.keyword === '') {
        mpvue.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return false
      }
      postAction('phone_gsd', {
        phone: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          this.record.phone = this.keyword
          this.showResult = true
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '手机号码查询',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

<style>
.points-container { padding-bottom: 0; }
.points-container .line1 { padding: 22px 25px 0 32px; }
.points-container .line1 .l img { width: 80px; }
.points-container .line1 .l p { font-size: 100px; color: #41372D; line-height: 118px; }
.points-container .icons { width: 100%; height: calc(100% - 176px); display: flex; justify-content: center; align-items: center; }
.points-container .icons .pig { height: 63%; display: block; }
.points-container .icons .coupon { height: 41%; display: block; }
.points-container .icons .gift { height: 53%; display: block; }
.points-container .pig { width: 412px; margin: 50px auto 70px auto; }
.points-list { padding: 20px 34px; }
.points-list li { height: 120px; padding: 0 24px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container points-container">
    <div class="line1 between">
      <div class="l">
        <img src="/static/images/index/tag1.png" mode="widthFix" />
        <p>{{score}}</p>
      </div>
      <div class="r acenter">
        <button class="btn-circle mr15"><img src="/static/images/index/scan.png" mode="widthFix" class="w26" /></button>
        <button class="btn" @click="openRecord">使用记录</button>
      </div>
    </div>
    <div class="pig">
      <img src="/static/images/index/pig.png" mode="widthFix" class="w100" />
    </div>
  </div>
  <div class="container2 points-list">
    <ul>
      <li class="borderB between" v-for="item in list" :key="id">
        <div>
          <div class="f24">{{item.title}}</div>
          <div class="f20 c-c9">{{item.created_at}}</div>
        </div>
        <div class="price c-main"><span>{{item.score > 0 ? '+' + item.score : item.score}}</span>积分</div>
      </li>
    </ul>
  </div>

  <records ref="records" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import records from './modules/records'
import { getAction } from '@/utils/api'
export default {
  components: {
    cHeader,
    records
  },
  data () {
    return {
      score: 0,
      page: 1,
      total: 0,
      list: []
    }
  },

  methods: {
    openRecord () {
      this.$refs.records.show()
    },
    getScore () {
      getAction('/userapi/user/show').then(res => {
        if (res.code === 0) {
          this.score = res.data.score
        }
      })
    },
    getList () {
      getAction('/userapi/user/score/index/data1', {
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    }
  },
  onReachBottom () {
    if (this.total > this.list.length) {
      this.page += 1
      this.getList()
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.getScore()
    this.getList()
  }
}
</script>

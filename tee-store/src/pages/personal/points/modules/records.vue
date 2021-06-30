<style scoped>
.points-list2 { height: calc(82vh - 120px); overflow-y: auto; box-sizing: border-box; }
.points-list2 li { height: 132px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-title">使用记录</div>
    <scroll-view scroll-y class="points-list points-list2" @scrolltolower="reachBottom">
      <ul>
        <li class="borderB between" v-for="item in list" :key="id">
          <div>
            <div class="f24">{{item.title}}</div>
            <div class="f20 c-c9">{{item.use_shop_name}}</div>
            <div class="f20 c-c9">{{item.created_at}}</div>
          </div>
          <div class="price c-main"><span>{{item.score > 0 ? '+' + item.score : item.score}}</span>积分</div>
        </li>
      </ul>
    </scroll-view>
  </div>
</div>
</template>

<script type='es6'>
import { getAction } from '@/utils/api'

export default {
  name: 'app',
  data() {
    return {
      visible: false,
      showItem: false,
      page: 1,
      total: 0,
      list: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    show () {
      this.list = []
      this.page = 1
      this.getData()
      this.visible = true
      this.$nextTick(() => {
        this.showItem = true
      })
    },
    getData () {
      getAction('/userapi/user/score/index/data2', {
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
          this.$emit('load', this.list.length)
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
    reachBottom () {
      if (this.total > this.list.length) {
        this.page += 1
        this.getData()
      }
    }
  }
}
</script>

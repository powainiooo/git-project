<style>
.index-goods { width: 700px; height: calc(100vh - 104px); margin-top: 0; position: absolute; top: calc(100vh - 370px); left: 0; z-index: 50; transition: top 0.4s cubic-bezier(.23,.78,.33,.97); }
.index-goods-show { top: 126px; }
.index-goods .arrows { width: 80px; height: 60px; position: absolute; top: -30px; left: 66px; display: flex; flex-direction: column; align-items: center; z-index: 10; }
.index-goods .arrows .a1 { width: 100%; }
.index-goods .arrows .a2 { width: 16px; transition: transform 0.4s cubic-bezier(.23,.78,.33,.97); }
.index-goods-show .arrows .a2 { width: 16px; transform: rotateZ(180deg); }

.index-scrolls { width: 100%; height: calc(100% - 100px); }
</style>

<template>
<div class="container2 index-goods" :class="{'index-goods-show': visible}">
  <div class="arrows" @click="toggle">
    <img src="/static/images/index/arrow1.png" mode="widthFix" class="a1" />
    <img src="/static/images/index/arrow2.png" mode="widthFix" class="a2" />
  </div>
  <div class="acenter pt50 pl50" @click="toggle">
    <img src="/static/images/index/icon1.png" mode="widthFix" class="w28 mr15" />
    <span class="f30">兑换好礼</span>
  </div>
  <scroll-view scroll-y class="index-scrolls" @scrolltolower="reachBottom">
    <goods-list v-if="visible" :list="list" />
  </scroll-view>
</div>
</template>

<script type='es6'>
import goodsList from '@/components/goodsList'
import store from '@/store'
import { getAction } from '@/utils/api'

export default {
  name: 'app',
  components: {
    goodsList
  },
  computed: {
    isLogin () {
      return store.state.isLogin
    },
    token () {
      return store.state.token
    }
  },
  watch: {
    token (token) {
      if (token !== '') {
        this.getData()
      }
    }
  },
  data () {
    return {
      visible: false,
      page: 1,
      total: 0,
      list: []
    }
  },
  mounted () {
    if (this.isLogin) {
      this.getData()
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    reachBottom () {
      if (this.total > this.list.length) {
        this.page += 1
        this.getData()
      }
    },
    getData () {
      getAction('/userapi/nearby/index/data', {
        cid: 0,
        recommend: 1,
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    }
  }
}
</script>

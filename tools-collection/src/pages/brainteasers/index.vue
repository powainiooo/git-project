<style scoped>
.bt-list li { padding: 30px 40px; }
.bt-list li div { font-size: 30px; line-height: 42px; color: #282828; margin-bottom: 20px; }
.bt-list li p { text-align: right; font-size: 26px; color: #282828; }
.bt-list li p span { color: #436CB3; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <ul class="bt-list borderT">
      <li class="borderB" v-for="(item, index) in list" :key="index">
        <div>【{{index+1}}】{{item.quest}}</div>
        <p><span>【答案】</span>{{item.result}}</p>
      </li>
    </ul>
    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '@/utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      list: [],
      loadOver: false
    }
  },
  methods: {
    getList () {
      postAction('brain_teaser', {
        num: 10
      }).then(res => {
        if (res.ret === 0) {
          this.list = this.list.concat(res.data)
          this.loadOver = res.data.length === 0
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '脑筋急转弯',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onReachBottom () {
    if (!this.loadOver) {
      this.page += 1
      this.getList()
    }
  },
  onShow () {
    this.list = []
  },
  onLoad (options) {
    this.id = options.id
    this.getList()
  }
}
</script>

<style scoped>
.menu-item { border-bottom: 2px solid #3D7FC7; padding-bottom: 50px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search placeholder="输入菜谱或食材" @search="onSearch"/>
    </div>

    <div class="blue-box" v-if="showResult">
      <h3></h3>
      <template v-for="item in list">
        <div class="menu-item">
          <h4>{{item.cp_name}}</h4>
          <h5>【做法】</h5>
          <p><rich-text :nodes="item.zuofa"></rich-text></p>
          <h5>【特性】</h5>
          <p><rich-text :nodes="item.texing"></rich-text></p>
          <h5>【提示】</h5>
          <p><rich-text :nodes="item.tishi"></rich-text></p>
          <h5>【调料】</h5>
          <p><rich-text :nodes="item.tiaoliao"></rich-text></p>
          <h5>【原料】</h5>
          <p><rich-text :nodes="item.yuanliao"></rich-text></p>
        </div>
      </template>
    </div>
    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates,
    cSearch
  },
  data () {
    return {
      id: '',
      list: [],
      keyword: '',
      page: 1,
      loadOver: false,
      showResult: false
    }
  },
  methods: {
    onSearch (e) {
      this.keyword = e
      this.page = 1
      this.list = []
      this.getList()
    },
    getList () {
      postAction('food_menu', {
        page: this.page,
        word: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.list = this.list.concat(res.data)
          this.loadOver = res.data.length === 0
          this.showResult = res.data.length !== 0
          if (res.data.length === 0) {
            mpvue.showToast({
              title: '未查询到菜谱',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '菜谱查询',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onReachBottom () {
    if (!this.loadOver) {
      this.page += 1
      this.getList()
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

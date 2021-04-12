<style scoped>
.trash-list { background-color: #FFFFFF; }
.trash-list .item { display: flex; align-items: center; height: 100px; font-size: 32px; }
.trash-list .item img { width: 38px; margin: 0 42px; }
.trash-list .detail { padding: 20px 40px 20px 120px; }
.trash-list .detail span { padding: 20px 16px; border: 2px dashed #436CB3; border-radius: 4px; font-size: 26px; line-height: 26px; display: inline-block; }
.trash-list .detail p { font-size: 22px; margin-top: 22px; }
</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <ul class="trash-list borderT">
      <li v-for="item in list" :key="index">
        <div class="item borderB">
          <img src="/static/images/trash/icon.png" mode="widthFix" />
          <span>{{item.name}}</span>
        </div>
        <div class="detail borderB">
          <span>{{item.name}} 属于 {{type[item.type]}}</span>
          <p>{{item.tip}}</p>
        </div>
      </li>
    </ul>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import { postAction } from '@/utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      page: 1,
      keyword: '',
      type: ['可回收', '有害', '厨余(湿)', '其他(干)'],
      list: [],
      loadOver: false
    }
  },
  methods: {
    queryData () {
      postAction('refuse_classification', {
        word: this.keyword,
        page: this.page
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          if (res.data.length === 0) {
            this.loadOver = true
          }
        }
      })
    }
  },
  onReachBottom () {
    if (!this.loadOver) {
      this.page += 1
      this.queryData()
    }
  },
  onLoad (options) {
    this.keyword = options.keyword
    this.loadOver = false
    this.queryData()
  }
}
</script>

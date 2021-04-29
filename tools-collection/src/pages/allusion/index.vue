<style scoped>
.al-list li { padding: 40px 30px 10px 30px; }
.al-list li div { margin-bottom: 30px; }
.al-list li div .sp1 { font-size: 26px; color: #282828; }
.al-list li div .sp2 { font-size: 26px; color: #3D7FC7; margin-left: 30px; }
.al-list li div .sp3 { font-size: 20px; line-height: 40px; color: #282828; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search placeholder="搜索成语" @search="getData"/>
    </div>

    <ul class="al-list borderT">
      <li class="borderB" v-for="item in list" :key="index">
        <div>
          <span class="sp1">【成语名称】：</span>
          <span class="sp2">{{item.chengyu}}</span>
        </div>
        <div>
          <span class="sp1">【拼音音标】：</span>
          <span class="sp3">{{item.pinyin}}</span>
        </div>
        <div>
          <span class="sp1">【典故】：</span>
          <span class="sp3">{{item.diangu}}</span>
        </div>
        <div>
          <span class="sp1">【出处】：</span>
          <span class="sp3">{{item.chuchu}}</span>
        </div>
        <div>
          <span class="sp1">【范例】：</span>
          <span class="sp3">{{item.fanli}}</span>
        </div>
      </li>
    </ul>

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
      list: []
    }
  },
  methods: {
    getData (e) {
      postAction('allusion', {
        word: e
      }).then(res => {
        if (res.ret === 0) {
          this.list = res.data
          if (res.data.length === 0) {
            mpvue.showToast({
              title: '未查询到数据',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

<style scoped>
.s-box { margin: 14px 40px 36px 40px; border: 2px solid #436CB3; display: flex; border-radius: 30px; height: 60px; position: relative; }
.s-box .l { width: 540px; height: 100%; padding-left: 24px; display: flex; align-items: center; font-size: 28px; color: #436CB3; border-right: 2px solid #436CB3; }
.s-box .l img { width: 28px; height: 28px; margin-right: 14px; }
.s-box .r { flex: 1; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #436CB3; }
.s-box .yuyin { width: 28px; position: absolute; top: 10px; left: 490px; }

.class-frame { display: flex; }
.class-frame .class-nav { width: 180px; border-right: 10px solid #F8F8F8; background-color: #FFFFFF; position: fixed; top: 78px; left: 0; bottom: 100px; overflow-y: auto; padding-top: 24px; }
.class-nav li { height: 50px; margin-bottom: 30px; border-left: 8px solid #FFFFFF; padding-left: 6px; }
.class-nav li div { height: 50px; display: flex; justify-content: center; align-items: center; }
.class-nav li.active { border-left-color: #436CB3; }
.class-nav li.active div { background-color: #436CB3; color: #FFFFFF; }

.class-list { margin-left: 180px; width: 570px; }
.class-list h3 { margin: 0 0 60px 38px; font-size: 28px; }
</style>

<template>
  <div class="container">
    <div class="s-box" @click="toSearch">
      <div class="l"><img src="/static/images/sousuo.png" />工具名称</div>
      <div class="r">搜索</div>
      <img src="/static/images/yuyin.png" class="yuyin" mode="widthFix" />
    </div>
    <div class="class-frame">
      <ul class="class-nav">
        <li v-for="item in typeList"
            :key="id"
            :class="{'active': item.id === typeId}"
            @click="toggle(item.id)"><div>{{item.name}}</div></li>
      </ul>
      <div class="class-list">
        <h3>常用分类</h3>
        <div class="tool-list">
          <a v-for="item in list"
             :key="id"
             href="#"
             class="tool-item">
            <img :src="imgSrc + item.imgpath" mode="aspectFill" />
            <div>{{item.name}}</div>
          </a>
        </div>
      </div>
    </div>
    <c-footer :current="2" />
  </div>
</template>

<script>
import cFooter from '@/components/footer1'
import { postAction } from '@/utils/api'
import config from '@/config'
const { imgSrc } = config

export default {
  components: {
    cFooter
  },

  data () {
    return {
      imgSrc,
      typeId: '',
      typeList: [],
      list: [],
      page: 1,
      total: 0
    }
  },
  computed: {
    loadOver () {
      return this.total === this.list.length
    }
  },
  methods: {
    getData () {
      postAction('cate').then(res => {
        if (res.code === 1) {
          this.typeList = res.data.all_type
          this.typeId = res.data.all_type[0].id
          this.list = res.data.gj
        }
      })
    },
    toggle (id) {
      this.typeId = id
      this.page = 1
      this.list = []
      this.getOneData()
    },
    getOneData () {
      postAction('sub_list', {
        cid: this.typeId,
        page: this.page
      }).then(res => {
        if (res.code === 1) {
          this.list = this.list.concat(res.data.list)
          this.total = Number(res.data.nums)
        }
      })
    },
    toSearch () {
      mpvue.navigateTo({
        url: '/pages/search/main'
      })
    }
  },
  onReachBottom () {
    if (!this.loadOver) {
      this.page += 1
      this.getOneData()
    }
  },
  onLoad () {
    // let app = getApp()
    this.getData()
  }
}
</script>

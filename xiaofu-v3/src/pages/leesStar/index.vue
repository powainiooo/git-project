<style scoped>
.banner { width: 100%; height: 588px; margin-top: 100px; }
.lees-page { margin: -488px 25px 25px 25px; padding-bottom: 125px; position: relative; z-index: 5; }
.lees-page .lees-star { width: 318px; height: 160px; margin-bottom: 76px; margin-left: 20px;  }

@keyframes moveUp {
  0% { transform: translateY(140px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.less-list .less-item { animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) both; }
.less-list .less-item:nth-child(5n+1) { animation-delay: 0.5s }
.less-list .less-item:nth-child(5n+2) { animation-delay: 0.7s }
.less-list .less-item:nth-child(5n+3) { animation-delay: 0.9s }
.less-list .less-item:nth-child(5n+4) { animation-delay: 1.1s }
.less-list .less-item:nth-child(5n+5) { animation-delay: 1.3s }
</style>

<template>
  <div>
    <c-header
      ref="header"
      bgColor="#000018"
      logo="logo2"
      @close="handleClose"
      @cityChange="cityChange" />
    <img :src="configData.star_background_image" class="banner" />
    <div class="lees-page">
      <img src="/static/images/leesStar/lees-star.png" class="lees-star" />
      <div class="less-list">
        <div class="less-item" v-for="(item, i) in listData" :key="i">
          <c-list-item :record="item" :rank="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cListItem from './modules/listItem'
import { postAction } from '@/utils/api'
import store from '@/store'

export default {
  data () {
    return {
      page: 1,
      listData: [],
      loadOver: false,
      cityId: ''
    }
  },

  components: {
    cHeader,
    cListItem
  },
  computed: {
    configData () {
      return store.state.configData
    }
  },
  methods: {
    handleClose () {
      mpvue.navigateBack({
        delta: -1
      })
    },
    getData () {
      postAction('/api/merchant/index', {
        page: this.page,
        city_id: this.cityId
      }).then(res => {
        this.loadOver = res.data.list.length === 0
        if (!this.loadOver) {
          this.listData = this.listData.concat(res.data.list)
        }
      })
    },
    footPrint () {
      postAction('/api/statistics/record', {
        type: 1,
        element: 2
      }).then(res => {
        console.log(res)
      })
    },
    cityChange (id) {
      this.page = 1
      this.cityId = id
      this.listData = []
      this.getData()
    }
  },
  onReachBottom () {
    if (this.loadOver) return
    this.page += 1
    this.getData()
  },
  onShow () {
    // let app = getApp()
    this.footPrint()
  },
  mounted () {
    this.$refs.header.setStatus('onlyClose')
    this.$refs.header.showCity = true
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.getData()
  }
}
</script>

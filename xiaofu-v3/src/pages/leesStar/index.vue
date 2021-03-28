<style scoped>
.banner { width: 100%; height: 588px; margin-top: 100px; }
.lees-page { margin: -488px 25px 50px 25px; position: relative; z-index: 5; }
.lees-page .lees-star { width: 318px; height: 160px; margin-bottom: 76px; margin-left: 20px;  }
</style>

<template>
  <div>
    <c-header
      ref="header"
      bgColor="#000018"
      logo="logo2"
      @close="handleClose" />
    <img :src="configData.star_background_image" class="banner" />
    <div class="lees-page">
      <img src="/static/images/leesStar/lees-star.png" class="lees-star" />
      <div>
        <c-list-item v-for="(item, i) in listData" :key="i" :record="item" />
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
      loadOver: false
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
        city_id: ''
      }).then(res => {
        this.loadOver = res.data.list.length === 0
        if (!this.loadOver) {
          this.listData = this.listData.concat(res.data.list)
        }
      })
    }
  },
  onReachBottom () {
    if (this.loadOver) return
    this.page += 1
    this.getData()
  },
  onShow () {
    // let app = getApp()
    this.getData()
  },
  mounted () {
    this.$refs.header.setStatus('onlyClose')
  },
  onLoad () {
  }
}
</script>

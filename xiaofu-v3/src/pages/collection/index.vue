<style scoped>
.banner { width: 100%; height: 400px; margin-top: 100px; }
.collection-page { margin: -354px 25px 50px 25px; position: relative; z-index: 5; }
.collection-page .c-tag { margin-bottom: 46px }
.list-container { display: flex; flex-wrap: wrap; justify-content: space-between; }
.item-small { width: 340px; margin-bottom: 20px; }
.item-large { width: 100%; margin-bottom: 20px; }
</style>

<template>
  <div>
    <c-header
      ref="header"
      @close="handleClose" />
    <img :src="record.image" class="banner" />
    <div class="collection-page">
      <div class="c-tag">{{record.name}}</div>
      <div class="list-container">
        <div v-for="(item, index) in list"
             :class="[index === 0 ? 'item-large' : 'item-small']">
          <c-ticket :record="item" size="large" v-if="index === 0" />
          <c-ticket :record="item" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicket from '@/pages/index/modules/ticket'
import { postAction } from '@/utils/api'

export default {
  data () {
    return {
      id: '',
      record: {},
      list: []
    }
  },

  components: {
    cHeader,
    cTicket
  },

  methods: {
    handleClose () {
      mpvue.navigateBack({
        delta: -1
      })
    },
    getData () {
      postAction('/api/collection/detail', {
        id: this.id
      }).then(res => {
        if (res.code === 1) {
          this.record = res.data
          this.list = res.data.tickets
        }
      })
    }
  },
  mounted () {
    this.$refs.header.setStatus('onlyClose')
  },
  onLoad (options) {
    this.id = options.id || 1
    this.getData()
    // let app = getApp()
  }
}
</script>

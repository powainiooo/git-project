<style scoped>

</style>

<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  style="background-color: #ffffff; min-height: calc(100vh - 186px);"
>
  <item v-for="item in list" :key="item.id" :record="item" @refresh="handleRefresh" />
</van-list>
</template>

<script type='es6'>
import item from './item2'
import { getAction } from '@/utils'

export default {
  name: 'app',
  components: {
    item
  },
  computed: {
    currentDate () {
      return this.$store.state.currentDate
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      limit: 10
    }
  },
  methods: {
    getParams () {
      return {
        type: 2,
        word: this.word,
        date: this.currentDate,
        // date: '',
        status: '0',
        page: this.page,
        limit: this.limit
      }
    },
    onLoad () {
      this.page += 1
      getAction('/shopapi/order/index/data', this.getParams()).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.finished = this.list.length === res.count || res.data.length === 0
          this.loading = false
        }
      })
    },
    handleRefresh (id) {
      console.log('handleRefresh', id)
      getAction('/shopapi/order/index/data', this.getParams()).then(res => {
        if (res.code === 0) {
          res.data.forEach((item, index) => {
            if (item.id === id) {
              console.log('item', item)
              this.$set(this.list, index, item)
            }
          })
        }
      })
    }
  }
}
</script>

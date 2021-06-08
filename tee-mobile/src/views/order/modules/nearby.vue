<style scoped>

</style>

<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  style="background-color: #ffffff;"
>
  <item v-for="(item, index) in list" :key="item.id" :record="item" @refresh="handleRefresh(index)" />
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
      page: 1,
      limit: 10
    }
  },
  methods: {
    getParams () {
      return {
        type: 2,
        word: this.word,
        // date: this.currentDate,
        date: '',
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
    handleRefresh (index) {
      getAction('/shopapi/order/index/data', this.getParams()).then(res => {
        if (res.code === 0) {
          const id = this.list[index].id
          const item = this.list.find(i => i.id === id)
          this.list[index] = item
        }
      })
    }
  }
}
</script>

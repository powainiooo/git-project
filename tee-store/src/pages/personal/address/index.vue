<style scoped>
.addr-container { min-height: calc(100vh - 104px); background-color: #ffffff; overflow: hidden; padding-bottom: 20px; }
.addr-container .header { height: 122px; background-color: #F9F9F9; padding: 0 40px; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 addr-container">
    <div class="header between">
      <span class="f30">收货地址</span>
      <button class="btn-circle btn-style1" @click="openForm"><img src="/static/images/add.png" mode="widthFix" class="w22" /></button>
    </div>
    <div class="mt40">
      <item v-for="item in list"
            :key="id"
            :record="item"
            :type="type"
            @edit="handleEdit"
            @tap="tap"
            @ok="refresh" />
    </div>
  </div>

  <modal-form ref="modalForm" @ok="refresh" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import item from './modules/item'
import modalForm from './modules/modalForm'
import { getAction } from '@/utils/api'
import store from '@/store'

export default {
  components: {
    cHeader,
    item,
    modalForm
  },
  data () {
    return {
      page: 1,
      total: 0,
      type: 'view',
      list: []
    }
  },

  methods: {
    openForm () {
      this.$refs.modalForm.show()
    },
    handleEdit (id) {
      this.$refs.modalForm.edit(id)
    },
    getData () {
      getAction('/userapi/user/address/index/data', {
        page: this.page,
        limit: 10
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data.list)
          this.total = res.data.pageSize
        }
      })
    },
    refresh () {
      this.list = []
      this.page = 1
      this.getData()
    },
    tap (record) {
      store.commit('SET_ADDR', record)
      this.$nextTick(() => {
        mpvue.navigateBack({
          delta: -1
        })
      })
    }
  },
  onReachBottom () {
    if (this.total > this.list.length) {
      this.page += 1
      this.getData()
    }
  },
  onLoad (options) {
    console.log('address options', options)
    Object.assign(this.$data, this.$options.data())
    this.getData()
    this.type = options.type || 'view'
  }
}
</script>

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
      <item />
      <item />
      <item />
    </div>
  </div>

  <modal-form ref="modalForm" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import item from './modules/item'
import modalForm from './modules/modalForm'
export default {
  components: {
    cHeader,
    item,
    modalForm
  },
  data () {
    return {
    }
  },

  methods: {
    openForm () {
      this.$refs.modalForm.show()
    }
  },

  created () {
  }
}
</script>

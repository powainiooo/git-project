<style scoped>
.nearby-container { min-height: calc(100vh - 260px); margin-top: 0; overflow: hidden; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <addr-info showCart showShare />
    <div class="container2 nearby-container">
      <div class="mt25">
        <goods-list />
      </div>
    </div>

  </div>
  <c-footer current="store" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import addrInfo from '@/components/addrInfo'
import goodsList from '@/components/goodsList'
export default {
  components: {
    cHeader,
    cFooter,
    addrInfo,
    goodsList
  },
  data () {
    return {
    }
  },

  methods: {
  },

  created () {
  }
}
</script>

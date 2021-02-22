<style scoped>
.order-container {
  padding-top: 100px;
}
.order-container .title {
  height: 108px;
  display: flex;
  align-items: center;
  padding-left: 38px;
  font-size: 24px;
}
.order-container .title span {
  margin-right: 18px;
  font-family: HelveB;
  font-size: 26px;
}
.order-list {
  margin: 0 55px;
  position: relative;
  overflow: hidden;
}
.order-list:before {
  content: '';
  width: 2px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100px;
  background-color: #DBDCDC;
}
.order-list .years {
  width: 54px;
  height: 28px;
  border-radius: 14px;
  background-color: #D8D8D8;
  margin-left: 74px;
  position: relative;
  z-index: 5;
  font-size: 18px;
  color: #ffffff;
  font-family: HelveL;
  margin-bottom: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
<div>
  <c-header onlyLogo />
  <div class="order-container">
    <div class="title"><span>Order center</span>已购票务</div>
    <div class="order-list">
      <div class="years">2021</div>
      <c-list-item />
      <c-list-item />
      <div class="years">2021</div>
      <c-list-item />
      <c-list-item />
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import cListItem from './modules/listItem'
export default {
  data () {
    return {
    }
  },

  components: {
    cHeader,
    cListItem
  },

  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>

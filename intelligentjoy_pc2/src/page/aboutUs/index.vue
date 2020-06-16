<template>
  <div class="centerBox" id="au-cont">
    <slide-left></slide-left>
    <div class="s-right">
      <div class="s-title">
        <span>{{ $t("footer."+ $route.name) }}</span>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import slideLeft from '@/components/slide/left.vue'
  export default {
    data() {
      return {

      }
    },
    components: {
      slideLeft
    }
  }
</script>

<style lang="less" scoped>
  #au-cont{
    margin: 45px auto 67px;
    display: flex;
    justify-content: space-between;
    .s-right{
      width: 980px;
      padding: 0 0 50px 0;
      border-radius: 2px;
      background: #fff;
      .s-title{
        padding: 19px 0 19px 39px;
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
</style>

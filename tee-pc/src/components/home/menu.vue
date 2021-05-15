<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.c-menu
  width 320px; margin-top 80px;
  &-item
    size(270px, 80px); border-radius 0 40px 40px 0; margin-bottom 20px; display flex; align-items center; font-size 18px; color #B2A89E; transition-duration .3s
    &:hover
      color #3E311F
    .icons
      size(26px, 28px); center(); margin-left 68px; margin-right 16px;
      img
        height 100%
      .icon-active
        display none
  &-active
    background-color #ffffff; box-shadow 0px 10px 20px 0px rgba(0, 0, 0, 0.08);
</style>

<template>
<div class="c-menu">
  <router-link v-for="(item, index) in list"
               :key="item.index"
               :to="item.url"
               :class="{'c-menu-active': current === item.url}"
               class="c-menu-item ts1">
    <div class="icons">
      <img :src="getImg('icon' + (index + 1) + '.png')" class="icon" />
      <img :src="getImg('icon' + (index + 1) + '-active.png')" class="icon-active" />
    </div>
    <span>{{item.name}}</span>
  </router-link>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      current: '/index/datas',
      list: [
        { name: '门店数据', url: '/index/datas' },
        { name: '管理茶饮', url: '/index/goods' },
        { name: '管理周边', url: '/index/peripheral' },
        { name: '订单详情', url: '/index/orders' },
        { name: '收益提现', url: '/index/profit' }
      ]
    }
  },
  watch: {
    '$route' (val) {
      console.log(val)
      this.current = val.path
    }
  },
  methods: {
    getImg (name) {
      return require(`@/assets/img/menu/${name}`)
    }
  }
}
</script>

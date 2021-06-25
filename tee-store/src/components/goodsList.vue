<style scoped>
.c-goods-grid { padding: 32px; min-height: 100%; position: relative; display: flex; align-items: baseline; flex-wrap: wrap; padding-top: 10px; }
.c-goods-grid:before { content: ''; width: 2px; position: absolute; left: 50%; top: 0; bottom: 0; background-color: #E2E2E2; transform: scaleX(.5); }
.c-goods-col { width: 50%; height: 420px; display: flex; position: relative; padding-bottom: 15px; padding-top: 44px; }
.c-goods-col:after { content: ''; height: 2px; position: absolute; left: 0; right: 0; bottom: 0; background-color: #E2E2E2; transform: scaleY(.5); }
.c-goods-col:nth-child(1) { padding-top: 0; }
.c-goods-col:nth-child(2) { padding-top: 0; }
.c-goods-col:nth-last-child(1):after { height: 0; }
.c-goods-col:nth-last-child(2):after { height: 0; }
.c-goods-col:nth-child(2):after { height: 2px; }
.c-goods-col:nth-child(2n) { justify-content: flex-end; }
.c-goods-grid .goods-item { width: 275px; }
.c-goods-grid .goods-item .imgs { width: 100%; height: 220px; border-radius: 35px; background-color: #D8D8D8; overflow: hidden; margin-bottom: 20px; }
.c-goods-grid .goods-item .imgs img { width: 100%; height: 100%; }
.c-goods-grid .goods-item .titles { font-size: 24px; margin-left: 4px; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; }
.c-goods-grid .goods-item .price1 { display: inline-block; padding: 0 4px; margin: 0 4px; font-size: 26px; font-family: DinL; line-height: 32px; color: #C9C9C9; position: relative; }
.c-goods-grid .goods-item .price1:after { content: ''; width: 100%; height: 2px; position: absolute; left: 0; right: 0; bottom: 50%; background-color: #F0916C; transform: scaleY(.5); }
.c-goods-grid .goods-item .icon { width: 75px; margin-right: 5px; }
.c-goods-grid .goods-item .price2 { font-size: 20px; color: #F0916C; font-family: DinL; }
.c-goods-grid .goods-item .price2 span { font-size: 54px; line-height: 65px; }
.c-goods-grid .goods-item .arrow { width: 46px; height: 46px; border-radius: 50%; background-color: #F0916C; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15); }
.c-goods-grid .goods-item .arrow img { width: 12px; }
</style>

<template>
<div class="c-goods-grid">
  <div class="c-goods-col" v-for="item in list" :key="id">
    <div class="goods-item"
         hover-class="hscale"
         hover-stay-time="10"
         @click="toDetail(item)">
      <div class="imgs"><img :src="imgSrc + item.cover" mode="aspectFill" /></div>
      <div class="titles">{{item.title}}</div>
      <div class="price1">{{item.price}}元</div>
      <div class="between">
        <div class="acenter">
          <img src="/static/images/jfh.png" mode="widthFix" class="icon" />
          <div class="price2"><span>{{item.sell_price}}</span>元</div>
        </div>
        <div class="arrow center"><img src="/static/images/arrow1.png" mode="widthFix" /></div>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc
    }
  },
  methods: {
    toDetail (record) {
      mpvue.navigateTo({
        url: '/pages/nearby/details/main?id=' + record.id
      })
    }
  }
}
</script>

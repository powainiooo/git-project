<style scoped>
.parti-item {
  width: 634px;
}
.parti-item img {
  width: 100%;
  height: 334px;
  background: #D8D8D8;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-bottom: 40px;
}
.parti-item div {
  margin: 0 16px;
  font-size: 20px;
  color: #9E9E9F;
  line-height: 30px;
}
.parti-bBorder {
  height: 1px;
  margin: 0 25px;
}
</style>

<template>
<div>
  <div class="c-ticket-title"><span>Particulars</span>详情</div>
  <swiper previous-margin="58rpx" next-margin="35rpx" duration="200" style="min-height: 640rpx;">
    <swiper-item v-for="(item, i) in list" :key="i">
      <div class="parti-item">
        <img :src="item.image" class="pic" />
        <div>{{item.content}}</div>
      </div>
    </swiper-item>
  </swiper>
  <div class="parti-bBorder bBorder"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

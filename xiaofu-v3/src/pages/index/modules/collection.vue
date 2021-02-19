<style scoped>
.c-collection {
  width: 100%;
  height: 267px;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}
.c-collection img {
  width: 100%;
  height: 100%;
}
.c-collection h3 {
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, .4);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.c-collection h3 p {
  font-size: 20px;
  color: #ffffff;
  line-height: 30px;
  padding-left: 22px;
}
.c-collection h3 p.en {
  font-size: 26px;
  font-family: HelveB;
}
</style>

<template>
<div class="c-collection">
  <img src="/static/images/img.jpg" />
  <h3>
    <p class="en">Hip-hop all night</p>
    <p>燃爆深圳嘻哈场</p>
  </h3>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

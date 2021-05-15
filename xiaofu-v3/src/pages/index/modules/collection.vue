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
  height: 267px;
}
.c-collection .blur-img {
  width: 100%;
  height: 80px;
  overflow: hidden;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(4px);
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
<div class="c-collection"
     hover-class="hscale"
     hover-stay-time="10"
     @click="toDetail">
  <img :src="record.image" mode="aspectFill" />
  <div class="blur-img">
    <img :src="record.image" mode="aspectFill" />
  </div>
  <h3>
    <p class="en">{{record.name}}</p>
    <p>{{record.intro}}</p>
  </h3>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    record: Object
  },
  data () {
    return {}
  },
  methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/collection/main?id=${this.record.id}`
      })
    }
  }
}
</script>

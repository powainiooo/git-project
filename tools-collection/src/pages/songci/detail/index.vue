<style scoped>
.details h1 { font-size: 36px; color: #3D7FC7; text-align: center; margin: 40px 30px 30px 30px; }
.details .author { font-size: 26px; color: #666666; margin-bottom: 30px; margin-right: 120px; text-align: right; }
.details .poetry { font-size: 36px; line-height: 65px; margin:0 50px 70px 50px; display: flex; justify-content: center; }
.details .content { margin: 30px; font-size: 20px; line-height: 44px; }
</style>

<template>
  <div class="container details">
    <div class="hr20"></div>
    <h1>《{{record.title}}》</h1>
    <div class="author">[宋] {{record.author}}</div>
    <div class="poetry">
      <rich-text :nodes="record.content"></rich-text>
    </div>

    <ul class="tabs2 borderB">
      <li class="active">译文</li>
    </ul>

    <div class="content">{{record.yiwen}}</div>
  </div>
</template>

<script>
import store from '../../../store'

export default {
  data () {
    return {}
  },
  computed: {
    record () {
      return store.state.poetryData
    }
  },
  created () {
  }
}
</script>

<style scoped>
.details h1 { font-size: 36px; color: #3D7FC7; text-align: center; margin: 40px 30px 30px 30px; }
.details .author { font-size: 26px; color: #666666; margin-bottom: 30px; margin-right: 120px; text-align: right; }
.details .poetry { font-size: 36px; line-height: 65px; margin:0 50px 70px 50px; display: flex; justify-content: center;  }
.details .content { margin: 30px; font-size: 20px; line-height: 44px; }
</style>

<template>
  <div class="container details">
    <div class="hr20"></div>
    <h1>《{{record.title}}》</h1>
    <div class="author">[唐] {{record.author}}</div>
    <div class="poetry">
      <text>{{record.content}}</text>
    </div>

    <ul class="tabs1">
      <li class="active">注释</li>
      <li>译文</li>
      <li>赏析</li>
    </ul>

    <div class="content">注释注释注释注释注释注释</div>
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

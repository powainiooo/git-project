<style scoped>
.riddle-item { padding: 40px 60px; }
.riddle-item h3 { font-size: 30px; color: #3D7FC7; margin-bottom: 20px; text-align: center; }
.riddle-item h4 { font-size: 26px; color: #666666; margin-bottom: 50px; text-align: center; }
.riddle-item div { font-size: 26px; line-height: 40px; }
.riddle-item div span { color: #3D7FC7; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="riddle-item borderT borderB">
      <h3>全国上下一起欢呼高兴</h3>
      <h4>（打一四字成语）</h4>
      <div><span>答案：</span></div>
    </div>

    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {}
  },

  created () {
  }
}
</script>

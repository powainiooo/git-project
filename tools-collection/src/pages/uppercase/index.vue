<style scoped>

</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="form mb45">
      <div class="formLine">
        <div class="formLabel">金额</div>
        <div class="formContent"><input type="number" placeholder="请输入数字金额" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">大写金额</div>
        <div class="formContent"><input type="number" placeholder="展示大写金额" /></div>
      </div>
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

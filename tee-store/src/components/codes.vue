<style scoped>
.c-codes { display: flex; justify-content: center; }
.c-codes li { width: 80px; height: 108px; border: 1px solid #ECECEC; border-radius: 15px; font-size: 100px; line-height: 106px; font-family: DinL; text-align: center; margin: 0 10px; }
.c-codes-small li { width: 56px; height: 74px; font-size: 54px; line-height: 65px; margin: 0 7px; }
</style>

<template>
<ul class="c-codes" :class="['c-codes-' + size]">
  <li v-for="i in code" :key="index">{{i}}</li>
</ul>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    code: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

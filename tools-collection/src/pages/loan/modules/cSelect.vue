<style scoped>
.c-select { width: 100%; height: 56px; line-height: 52px; border: 2px solid #EEEEEE; font-size: 20px; color: #666666; padding: 0 12px; position: relative; }
.c-select-arrow { position: absolute; top: 50%; right: 12px; width: 14px; height: 10px; margin-top: -5px; }
</style>

<template>
<picker :range="list" range-key="name" @change="onChange" :value="index">
  <div class="c-select">
    {{name}}
    <img src="/static/images/arrow8.png" class="c-select-arrow" />
  </div>
</picker>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array,
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    index () {
      if (this.value === '') {
        return 0
      } else {
        const index = this.list.findIndex(i => i.value === this.value)
        this.name = this.list[index].name
        return index || 0
      }
    }
  },
  methods: {
    onChange (e) {
      const record = this.list[e.mp.detail.value]
      this.name = record.name
      this.$emit('input', record.value)
    }
  }
}
</script>

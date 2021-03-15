<style>
.c-select {
  position: relative;
}
.c-select-line {
  width: 90px;
  height: 30px;
  background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  color: #ffffff;
  line-height: 30px;
  padding: 0 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c-select-select {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.c-select .c-select-select .ivu-select-selection {
  opacity: 0;
  height: 30px;
}
</style>

<template>
<div class="c-select">
  <div class="c-select-line">
    <span>全部</span>
    <Icon type="ios-arrow-down" />
  </div>
  <Select v-model="value" class="c-select-select">
    <Option value="1">银行1</Option>
  </Select>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      value: ''
    }
  },
  methods: {}
}
</script>

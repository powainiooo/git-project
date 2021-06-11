<style>
.c-select {
  position: relative;
  transition: all .2s ease-in-out;
}
.c-select-line {
  min-width: 90px;
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
.c-select:hover .c-select-line {
  background: linear-gradient(349deg, #A5C0F7 0%, #A5C0F7 100%)
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
<div class="c-select" @mousedown.stop="sm" @mouseup.stop="sm" @click.stop="sm">
  <div class="c-select-line">
    <span>{{name}}</span>
    <Icon type="ios-arrow-down" />
  </div>
  <Select v-model="value" class="c-select-select" @on-change="onChange">
    <Option :value="-1">全部</Option>
    <Option v-for="item in list"
            :key="item.id"
            :value="item.id">{{item.name}}</Option>
  </Select>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array
  },
  data () {
    return {
      value: '',
      name: '全部'
    }
  },
  methods: {
    sm (e) {
      e.preventDefault()
    },
    onChange (e) {
      let record = this.list.find(i => i.id === e)
      if (record === undefined) {
        record = {
          id: -1,
          name: '全部'
        }
      }
      this.name = record.name
      this.$emit('change', record)
    }
  }
}
</script>

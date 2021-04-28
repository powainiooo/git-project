<style scoped>
.notice-bBorder {
  height: 1px;
  margin: 76px 25px 0 25px;
}
.c-ticket-information {
  margin-bottom: 200px;
}
</style>

<template>
<div class="c-ticket-information">
  <div class="c-ticket-title"><span>Select</span>选择票种、张数</div>
  <ul class="form-list">
    <li v-for="(item, index) in list" :key="id">
      <div class="rank"><img :src="'/static/images/number/'+ (index + 1) +'.png'" mode="heightFix" /></div>
      <div class="content"
           :class="{'active': item.id === priceId}"
           hover-class="hscale"
           hover-stay-time="10">
        <input placeholder-style="color: #fff;" v-model="item.name" disabled @click="selectTicket(item)" />
        <picker :range="numsArr" @change="numsChange" v-if="item.id === priceId">
          <button style="width: 134rpx">
            <img src="/static/images/common/select-img2.png" mode="heightFix" />
            <div class="nums"><span>{{nums}}</span>张</div>
          </button>
        </picker>
      </div>
    </li>
  </ul>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      priceId: '',
      numsArr: [],
      nums: 0
    }
  },
  methods: {
    selectTicket (record) {
      this.priceId = record.id
      this.setNumsArr(record.limit)
      if (this.nums > record.limit) this.nums = record.limit
      this.$emit('change', {
        key: 'price_id',
        value: record.id
      })
    },
    setNumsArr (limit) {
      let nums = limit
      if (!limit || limit === '' || limit === 0) {
        nums = 20
      }
      const arr = []
      for (let i = 0; i < nums; i++) {
        arr.push(i + 1)
      }
      this.numsArr = arr
    },
    numsChange (e) {
      this.nums = this.numsArr[e.mp.detail.value]
      this.$emit('change', {
        key: 'num',
        value: this.nums
      })
    }
  }
}
</script>

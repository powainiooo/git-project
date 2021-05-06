<style scoped>

</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="form mb45">
      <div class="formLine">
        <div class="formLabel">金额</div>
        <div class="formContent">
          <input type="digit" placeholder="请输入数字金额" v-model="money" @input="change" style="width: 100%;" />
        </div>
      </div>
      <div class="formLine">
        <div class="formLabel">大写金额</div>
        <div class="formContent">
          <input type="digit" placeholder="展示大写金额" v-model="moneyStr" disabled style="width: 100%;" />
        </div>
      </div>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import { postAction } from '@/utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      money: '',
      moneyStr: '',
      t: 0
    }
  },
  methods: {
    change () {
      clearTimeout(this.t)
      this.t = setTimeout(() => {
        postAction('money_convert', {
          money: this.money
        }).then(res => {
          if (res.ret === 0) {
            this.moneyStr = res.data[0].cnresult
          }
        })
      }, 500)
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '金额转大写',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

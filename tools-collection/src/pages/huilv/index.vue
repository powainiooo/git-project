<style scoped>
.banner { width: 100%; position: absolute; top: -50px; left: 0; z-index: 0; }
.form-box { margin: 60px 30px 38px 30px; background-color: #FFFFFF; border-radius: 10px; padding: 50px 60px 0 60px; overflow: hidden; }
.form-item { height: 65px; border-radius: 6px; border: 2px solid #666666; padding:0 20px; font-size: 30px; color: #666666; display: flex; align-items: center; }
.selects { width: 212px;  justify-content: space-between; }
.selects img { width: 22px; }
.line1 { width: 315px; margin: 0 auto 50px auto; }

.result {  margin: 0 30px; position: relative; }
.result .icon { width: 100px; position: absolute; top: 30px; left: 298px; }
.result h3 { width: 100%; position: absolute; top: 160px; left: 0; font-size: 32px; color: #FFFFFF; text-align: center; }
.result div { width: 100%; color: #FFFFFF; text-align: center; position: absolute; top: 236px; left: 0; font-size: 28px; }
.result div span { font-size: 50px; }
</style>

<template>
  <div class="container3">
    <img src="/static/images/banner1.png" class="banner" />
    <div class="pr">

      <div class="form-box">
        <div class="between mb50">
          <picker :range="typeList" range-key="name" @change="selectChange($event, '1')">
            <div class="selects form-item">
              <span>{{name1 === '' ? '请选择' : name1}}</span>
              <img src="/static/images/arrow2.png" mode="widthFix" />
            </div>
          </picker>
          <img src="/static/images/arrow3.png" mode="widthFix" class="w44" />
          <picker :range="typeList" range-key="name" @change="selectChange($event, '2')">
            <div class="selects form-item">
              <span>{{name2 === '' ? '请选择' : name2}}</span>
              <img src="/static/images/arrow2.png" mode="widthFix" />
            </div>
          </picker>
        </div>
        <div class="line1">
          <input type="number" class="form-item" placeholder="请输入换算金额" v-model="money" />
        </div>
        <div class="line1">
          <button class="btn btn-min" @click="handleCalc">立即换算</button>
        </div>
      </div>

      <div class="result" v-if="showResult">
        <img src="/static/images/bg2.png" class="w100" mode="widthFix" />
        <img src="/static/images/suc.png" class="icon" mode="widthFix" />
        <h3>换算成功</h3>
        <div>换算结果¥ <span>{{result.currencyMoney}}</span></div>
      </div>
    </div>

    <operates />
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
      typeList: [],
      key1: '',
      name1: '',
      key2: '',
      name2: '',
      money: '',
      showResult: false,
      result: {}
    }
  },
  methods: {
    getData () {
      postAction('pre_hlzh').then(res => {
        if (res.ret === 0) {
          this.typeList = res.data.list
        }
      })
    },
    selectChange (e, key) {
      const i = this.typeList[e.mp.detail.value]
      this[`key${key}`] = i.code
      this[`name${key}`] = i.name
    },
    handleCalc () {
      if (this.key1 === '' || this.key2 === '') {
        mpvue.showToast({
          title: '请选择币种',
          icon: 'none'
        })
        return
      }
      if (this.money === '') {
        mpvue.showToast({
          title: '请输入金额',
          icon: 'none'
        })
        return
      }
      postAction('hlzh', {
        from: this.key1,
        to: this.key2,
        money: this.money
      }).then(res => {
        if (res.ret === 0) {
          this.result = res.data.result
          this.showResult = true
        }
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>

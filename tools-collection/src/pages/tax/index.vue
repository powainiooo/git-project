<style scoped>
.tax-form { margin: 0 30px 30px 30px; }
.tax-form-item { display: flex; align-items: center; margin-bottom: 40px; }
.tax-form-item .l { font-size: 32px; width: 200px; text-align: right; }
.tax-form-item .r { font-size: 32px; width: 490px; padding-left: 35px; display: flex; align-items: center; }
.tax-form-item .r input { width: 376px; height: 60px; border: 2px solid #3366CC; font-size: 26px; color: #666666; padding: 0 20px; margin-right: 14px; box-sizing: border-box; }
.tax-form-item .r span { font-size: 26px; color: #666666; }
.tax-form-item .btn { width: 180px; margin-right: 16px; margin-left: 0; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="tc f36 mt40 mb55">累计预扣预缴个税计算器2021</div>

    <div class="tax-form">
      <div class="tax-form-item">
        <div class="l">收入类型</div>
        <div class="r">
          <input value="工资、薪金所得（月薪）" disabled />
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">纳税期数</div>
        <div class="r">
          <input type="digit" v-model="formData.taxPeriod" />
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">本月工资</div>
        <div class="r">
          <input type="digit" v-model="formData.txtIncome" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计</div>
        <div class="r">
          <input disabled v-model="totalIncome" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">社会保险费</div>
        <div class="r">
          <input type="digit" v-model="formData.insure" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计</div>
        <div class="r">
          <input disabled v-model="totalInsure" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">专项附加扣除</div>
        <div class="r">
          <input type="digit" v-model="formData.txtZXFJ" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计</div>
        <div class="r">
          <input disabled v-model="totalZX" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l"> </div>
        <div class="r acenter">
          <button class="btn btn-min" @click="reset">重 置</button>
          <button class="btn btn-min btn-light" @click="doCalc">计 算</button>
        </div>
      </div>
    </div>
    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import store from '../../store'

export default {
  components: {
    operates
  },
  computed: {
    totalIncome () {
      if (this.formData.taxPeriod === '' || this.formData.txtIncome === '') {
        return 0
      } else {
        try {
          return Number(this.formData.taxPeriod) * Number(this.formData.txtIncome)
        } catch (e) {
          return 0
        }
      }
    },
    totalInsure () {
      if (this.formData.taxPeriod === '' || this.formData.insure === '') {
        return 0
      } else {
        try {
          return Number(this.formData.taxPeriod) * Number(this.formData.insure)
        } catch (e) {
          return 0
        }
      }
    },
    totalZX () {
      if (this.formData.taxPeriod === '' || this.formData.txtZXFJ === '') {
        return 0
      } else {
        try {
          return Number(this.formData.taxPeriod) * Number(this.formData.txtZXFJ)
        } catch (e) {
          return 0
        }
      }
    }
  },
  data () {
    return {
      id: '',
      formData: {
        type: 1,
        taxPeriod: 0,
        txtIncome: 0,
        insure: 0,
        txtZXFJ: 0
      }
    }
  },
  methods: {
    doCalc () {
      store.commit('SET_TAX', this.formData)
      mpvue.navigateTo({
        url: '/pages/taxResult/main'
      })
    },
    reset () {
      this.formData = {
        type: 1,
        taxPeriod: 0,
        txtIncome: 0,
        insure: 0,
        txtZXFJ: 0
      }
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

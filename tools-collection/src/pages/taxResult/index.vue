<style scoped>
.tax-form { margin: 0 30px 30px 30px; }
.tax-form-item { display: flex; align-items: center; margin-bottom: 40px; }
.tax-form-item .l { font-size: 34px; width: 200px; text-align: right; }
.tax-form-item .r { font-size: 34px; width: 490px; padding-left: 35px; display: flex; align-items: center; }
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
        <div class="l">应纳税所得额</div>
        <div class="r">
          <span>{{record.taxableIncome}}</span>
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">适用税率</div>
        <div class="r">
          <span>{{record.R}} %</span>
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">速算扣除数</div>
        <div class="r">
          <span>{{record.Q}} 元</span>
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计应缴纳税款</div>
        <div class="r">
          <input readonly v-model="record.taxAll" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">已缴税款</div>
        <div class="r">
          <input readonly v-model="record.lastTaxAll" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">应补（退）税款</div>
        <div class="r">
          <input readonly v-model="record.tax" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">本月税后收入</div>
        <div class="r">
          <input readonly v-model="record.realIncome" />元
        </div>
      </div>
    </div>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import store from '../../store'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  computed: {
    taxData () {
      return store.state.taxData
    }
  },
  data () {
    return {
      record: {}
    }
  },
  methods: {
    getData () {
      postAction('tax', this.taxData).then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    }
  },
  onLoad () {
    this.getData()
  }
}
</script>

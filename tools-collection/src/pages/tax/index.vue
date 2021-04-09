<style scoped>
.tax-form { margin: 0 30px 30px 30px; }
.tax-form-item { display: flex; align-items: center; margin-bottom: 40px; }
.tax-form-item .l { font-size: 34px; width: 200px; text-align: right; }
.tax-form-item .r { font-size: 34px; width: 490px; padding-left: 35px; display: flex; align-items: center; }
.tax-form-item .r input { width: 376px; height: 60px; border: 2px solid #3366CC; font-size: 26px; color: #666666; padding: 0 20px; margin-right: 14px; box-sizing: border-box; }
.tax-form-item .r span { font-size: 26px; color: #666666; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="tc f36 mt40 mb55">累计预扣预缴个税计算器2021</div>

    <div class="tax-form">
      <div class="tax-form-item">
        <div class="l">收入类型</div>
        <div class="r">
          <input placeholder="工资、薪金所得（月薪）" />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">纳税期数</div>
        <div class="r">
          <input />
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">本月工资</div>
        <div class="r">
          <input />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计</div>
        <div class="r">
          <input />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">社会保险费</div>
        <div class="r">
          <input />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计</div>
        <div class="r">
          <input />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">专项附加扣除</div>
        <div class="r">
          <input />元
        </div>
      </div>
      <div class="tax-form-item">
        <div class="l">累计</div>
        <div class="r">
          <input />元
        </div>
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

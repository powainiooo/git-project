<style scoped>
.loan-form { margin-bottom: 70px; }
.loan-form-item { display: flex; align-items: center; margin-bottom: 18px; }
.loan-form-item .l { width: 180px; font-size: 24px; margin-right: 14px; text-align: right; }
.loan-form-item .r { width: 500px; font-size: 24px; position: relative; }
.loan-form-item .r .ip { width: 100%; height: 46px; border: 2px solid #EEEEEE; font-size: 20px; color: #666666; padding: 0 12px; }
.loan-form-item .r .radio { width: 26px; height: 26px; }
.loan-form-item .r .unit { font-size: 20px; color: #666666; position: absolute; top: 12px; right: 12px; }
.loan-form-item .r p { font-size: 16px; color: #B8ABAB; margin-top: 15px; }
.loan-form-item .r button { width: 200px; margin-right: 20px; margin-left: 0; }

.loan-title { font-size: 28px; color: #000000; margin-bottom: 20px; }

.loan-table { margin: 0 60px 20px 60px; }
.loan-head { height: 56px; background-color: #FFA801; font-size: 22px; color: #FFFFFF; padding: 0 22px; display: flex; align-items: center; }
.loan-list { position: relative; }
.loan-list:after { content: ''; width: 200%; height: 200%; border: 2px solid #E8E8E8; transform-origin: 0 0; transform: scale(.5); position: absolute; top: 0; left: 0; }
.loan-list1 { height: 128px; display: flex; align-items: center; }
.loan-list1 li { flex: 1; }
.loan-list1 li p { font-size: 22px; margin-bottom: 20px; text-align: center; }
.loan-list1 li p span { font-size: 24px; color: #000000; }
.loan-list1 li div { font-size: 22px; color: #000000; text-align: center; }

.loan-list2 { display: flex; }
.loan-list2 .l { width: 44%; position: relative; padding: 30px; }
.loan-list2 .l:after { content: ''; width: 2px; height: 100%; position: absolute; top: 0; right: 0; background-color: #E8E8E8; transform: scaleX(.5); }
.loan-list2 .l div { font-size: 22px; margin-bottom: 20px; }
.loan-list2 .l div span { color: #878787; margin-left: 15px; }
.loan-list2 .l p { font-size: 22px; margin-bottom: 20px; color: #3D7FC7; }
.loan-list2 .r { width: 56%; position: relative; padding: 24px 0 24px 50px; }
.loan-list2 .r div { font-size: 20px; margin-bottom: 20px; }
.loan-list2 .r div span { margin-left: 60px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <ul class="tabs3 mt30 mb60">
      <li class="active">商业贷款</li>
      <li>公积金贷款</li>
      <li>组合贷款</li>
    </ul>

    <div class="loan-form">
      <div class="loan-form-item">
        <div class="l">计算方式</div>
        <div class="r">
          <input type="radio" class="ml10 mr10 radio" />
          按房屋总价计算
          <input type="radio" class="ml20 radio" />
          按单价与面积计算
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">房屋总价</div>
        <div class="r">
          <input type="text" class="ip" />
          <span class="unit">万元</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款成数</div>
        <div class="r">
          <input type="text" class="ip" />
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款金额</div>
        <div class="r">
          <input type="text" class="ip" />
          <span class="unit">万元</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款年限</div>
        <div class="r">
          <input type="text" class="ip" />
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商贷利率方式</div>
        <div class="r">
          <input type="radio" class="ml10 mr10 radio" />
          基准利率
          <input type="radio" class="ml20 radio" />
          LPR基础利率
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商贷利率</div>
        <div class="r">
          <input type="text" class="ip" />
          <p>注：此计算结果仅为参考，实际缴费应以当地为准</p>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">　</div>
        <div class="r acenter">
          <button class="btn btn-min">重 置</button>
          <button class="btn btn-min btn-light">计 算</button>
        </div>
      </div>
    </div>

    <div class="loan-title">计算结果</div>

    <div class="ml60 mb20">首付：<span class="f28" style="color: #F46C42;">26.70万元</span></div>
    <div class="ml60 mb20">商业贷款利率：4.90%</div>

    <div class="loan-table">
      <div class="loan-head">等额本息，每期等额还款</div>
      <ul class="loan-list loan-list1">
        <li>
          <p>每期还款</p>
          <div><span class="c-3d">4077.887元</span></div>
        </li>
        <li>
          <p>支付利息</p>
          <div>35.56万元</div>
        </li>
        <li>
          <p><span>还款总额</span></p>
          <div>97.85万元</div>
        </li>
      </ul>
    </div>

    <div class="loan-table">
      <div class="loan-head">等额本金  逐期递减还款</div>
      <ul class="loan-list loan-list2">
        <li class="l">
          <div>每期还款</div>
          <p class="c-3d">4077.887元</p>
          <div>支付利息<span>30.65万元</span></div>
          <div>还款总额<span>30.65万元</span></div>
        </li>
        <li class="r">
          <div>第一期还款<span>5193.75元</span></div>
          <div>第一期还款<span>5193.75元</span></div>
          <div>第一期还款<span>5193.75元</span></div>
          <div>第一期还款<span>5193.75元</span></div>
        </li>
      </ul>
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

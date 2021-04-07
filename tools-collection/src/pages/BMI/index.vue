<style scoped>
.ad { margin: 24px 30px 54px 30px; display: block; }
.ad img { width: 100%; display: block; }

.inputs { margin: 0 30px 56px 30px; }
.inputs span { display: block; margin-right: 40px; font-size: 28px; color: #000000; }
.inputs input[type=text] { width: 200px; height: 60px; border-radius: 4px; background-color: #F4F4F4; padding: 0 24px; font-size: 28px; color: #000000; }

.btn-test { width: 290px; border-radius: 10px; margin-bottom: 52px; }

.table .thead { width: 100%; height: 60px; background-color: #436CB3; border-radius: 10px; display: flex; margin-bottom: 26px; }
.table .thead li { flex: 1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #FFFFFF; text-align: center; }
.table .tbody .tr { width: 100%; height: 100px; border-radius: 10px; background-color: #F4F4F4; display: flex; }
.table .tbody .tr:nth-child(2n) { background-color: #FFFFFF; }
.table .tbody .tr li { flex: 1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #000000; text-align: center; padding: 0 15px; }
</style>

<template>
  <div class="container">
    <a href="#" class="ad"><img src="/static/images/img/ad.png" mode="widthFix" /></a>

    <div class="between inputs">
      <div class="acenter">
        <span>身高：</span>
        <input type="text" placeholder="单位：CM" />
      </div>
      <div class="acenter">
        <span>体重：</span>
        <input type="text" placeholder="体重：KG" />
      </div>
    </div>
    <div class="center inputs">
      <div class="acenter">
        <input type="radio" />
        <span>女</span>
      </div>
      <div class="acenter">
        <input type="radio" />
        <span>男</span>
      </div>
    </div>

    <div class="tc"><button class="btn btn-min btn-test">开始测试</button></div>

    <div class="table ml30 mr30">
      <ul class="thead">
        <li>BMI分类</li>
        <li>WHO标准</li>
        <li>亚洲标准</li>
        <li><text>中国\n参考标准</text></li>
        <li><text>相关疾病\n发病的危险性</text></li>
      </ul>
      <div class="tbody">
        <ul class="tr">
          <li>体重过低</li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li>低（但其它疾病危险性增加）</li>
        </ul>
        <ul class="tr">
          <li>体重过低</li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li>低（但其它疾病危险性增加）</li>
        </ul>
        <ul class="tr">
          <li>体重过低</li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li>低（但其它疾病危险性增加）</li>
        </ul>
        <ul class="tr">
          <li>体重过低</li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li> 18.5 </li>
          <li>低（但其它疾病危险性增加）</li>
        </ul>
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

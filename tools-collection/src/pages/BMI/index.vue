<style scoped>
.ad { margin: 24px 30px 54px 30px; display: block; }
.ad img { width: 100%; display: block; }

.inputs { margin: 0 30px 56px 30px; }
.inputs span { width: 100px; display: block; margin-left: 30px; font-size: 28px; color: #000000; }
.inputs input[type=digit] { width: 200px; height: 60px; border-radius: 4px; background-color: #F4F4F4; padding: 0 24px; font-size: 28px; color: #000000; }

.btn-test { width: 290px; border-radius: 10px; margin-bottom: 52px; }

.table .thead { width: 100%; height: 60px; background-color: #436CB3; border-radius: 10px; display: flex; margin-bottom: 26px; }
.table .thead li { flex: 1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #FFFFFF; text-align: center; }
.table .tbody .tr { width: 100%; height: 100px; border-radius: 10px; background-color: #F4F4F4; display: flex; }
.table .tbody .tr:nth-child(2n) { background-color: #FFFFFF; }
.table .tbody .tr li { flex: 1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #000000; text-align: center; padding: 0 15px; }

.bmi-result { margin: 30px 38px; }
.bmi-result p { font-size: 22px; color: #720BE1; line-height: 1.6; }
</style>

<template>
  <div class="container">
    <a href="#" class="ad" v-if="ad !== ''"><img :src="imgSrc + ad" mode="widthFix" /></a>

    <div class="between inputs">
      <div class="acenter">
        <span>身高：</span>
        <input type="digit" placeholder="单位：CM" v-model="height" />
      </div>
      <div class="acenter">
        <span>体重：</span>
        <input type="digit" placeholder="体重：KG" v-model="weight" />
      </div>
    </div>
    <div class="center inputs">
      <div class="radio mr20" :class="{'radio-active': sex === 1}" @click="sex = 1">女</div>
      <div class="radio" :class="{'radio-active': sex === 0}" @click="sex = 0">男</div>
    </div>

    <div class="tc"><button class="btn btn-min btn-test" @click="getData">开始测试</button></div>

    <div class="bmi-result" v-if="showResult">
      <p>中国标准</p>
      <p>结果值：{{record.bmi}}</p>
      <p>疾病风险：{{record.healthy}}</p>
      <p>建议：{{record.tip}}</p>
    </div>

    <div class="table ml30 mr30" v-if="list.length > 0">
      <ul class="thead">
        <li>BMI分类</li>
        <li>WHO标准</li>
        <li>亚洲标准</li>
        <li><text>中国\n参考标准</text></li>
        <li><text>相关疾病\n发病的危险性</text></li>
      </ul>
      <div class="tbody">
        <ul class="tr" v-for="item in list" :key="index">
          <li>{{item.cate}}</li>
          <li>{{item.wto_bz}}</li>
          <li>{{item.yz_bz}}</li>
          <li>{{item.china_bz}}</li>
          <li>{{item.tips}}</li>
        </ul>
      </div>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      ad: '',
      id: '',
      height: '',
      weight: '',
      sex: 1,
      list: [],
      record: {},
      showResult: false
    }
  },
  methods: {
    getData () {
      if (this.height === '') {
        mpvue.showToast({
          title: '请输入身高',
          icon: 'none'
        })
        return false
      }
      if (this.weight === '') {
        mpvue.showToast({
          title: '请输入体重',
          icon: 'none'
        })
        return false
      }
      postAction('bmi', {
        height: this.height,
        weight: this.weight,
        sex: this.sex
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data[0]
          this.showResult = true
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: 'BMI标准体重',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    postAction('bmi_bz').then(res => {
      if (res.ret === 0) {
        this.list = res.data.list
        this.ad = res.data.bmi_gg
      }
    })
  }
}
</script>

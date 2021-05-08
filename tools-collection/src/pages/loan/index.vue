<style scoped>
.loan-form { margin-bottom: 70px; }
.loan-form-item { display: flex; align-items: center; margin-bottom: 18px; }
.loan-form-item .l { width: 180px; font-size: 30px; margin-right: 14px; text-align: right; }
.loan-form-item .r { width: 506px; font-size: 30px; position: relative; }
.loan-form-item .r .ip { width: 100%; height: 56px; border: 2px solid #EEEEEE; font-size: 26px; color: #666666; padding: 0 12px; }
.loan-form-item .r .unit { font-size: 26px; color: #666666; position: absolute; top: 12px; right: 12px; }
.loan-form-item .r button { width: 200px; margin-right: 20px; margin-left: 0; }
.loan-form p.hint { font-size: 16px; color: #B8ABAB; margin-top: 15px; margin-bottom: 18px; margin-left: 180px; }

.loan-title { font-size: 30px; color: #000000; margin-bottom: 20px; }

.loan-table { margin: 0 60px 20px 60px; }
.loan-head { height: 56px; background-color: #FFA801; font-size: 22px; color: #FFFFFF; padding: 0 22px; display: flex; align-items: center; }
.loan-list { position: relative; }
.loan-list:after { content: ''; width: 200%; height: 200%; border: 2px solid #E8E8E8; transform-origin: 0 0; transform: scale(.5); position: absolute; top: 0; left: 0; }
.loan-list1 { height: 128px; display: flex; align-items: center; }
.loan-list1 li { flex: 1; }
.loan-list1 li p { font-size: 24px; margin-bottom: 20px; text-align: center; }
.loan-list1 li p span { font-size: 26px; color: #000000; }
.loan-list1 li div { font-size: 24px; color: #000000; text-align: center; }

.loan-list2 { display: flex; }
.loan-list2 .l { width: 44%; position: relative; padding: 30px; }
.loan-list2 .l:after { content: ''; width: 2px; height: 100%; position: absolute; top: 0; right: 0; background-color: #E8E8E8; transform: scaleX(.5); }
.loan-list2 .l div { font-size: 24px; margin-bottom: 20px; }
.loan-list2 .l div span { color: #878787; margin-left: 15px; }
.loan-list2 .l p { font-size: 24px; margin-bottom: 20px; color: #3D7FC7; }
.loan-list2 .r { width: 56%; position: relative; padding: 24px 0 24px 50px; }
.loan-list2 .r div { font-size: 24px; margin-bottom: 20px; }
.loan-list2 .r div span { margin-left: 60px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <ul class="tabs3 mt30 mb60">
      <li :class="{'active': tabKey === 0}" @click="tabKey = 0">商业贷款</li>
      <li :class="{'active': tabKey === 1}" @click="tabKey = 1">公积金贷款</li>
      <li :class="{'active': tabKey === 2}" @click="tabKey = 2">组合贷款</li>
    </ul>

    <div class="loan-form" v-show="tabKey === 0">
      <div class="loan-form-item">
        <div class="l">计算方式</div>
        <div class="r acenter">
          <div class="radio mr20" :class="{'radio-active': formData.type1 === 0}" @click="formData.type1 = 0">按房屋总价计算</div>
          <div class="radio mr20" :class="{'radio-active': formData.type1 === 1}" @click="formData.type1 = 1">按单价与面积计算</div>
        </div>
      </div>
      <div class="loan-form-item" v-if="formData.type1 === 0">
        <div class="l">房屋总价</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData.housePrice1" />
          <span class="unit">万元</span>
        </div>
      </div>
      <template v-else>
      <div class="loan-form-item">
        <div class="l">单价</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData.price" />
          <span class="unit">元 / ㎡</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">面积</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData.area" />
          <span class="unit">㎡</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">房屋总价</div>
        <div class="r">
          <input type="digit" class="ip" v-model="houseTotal" disabled />
          <span class="unit">万元</span>
        </div>
      </div>
      </template>
      <div class="loan-form-item">
        <div class="l">贷款成数</div>
        <div class="r">
          <c-select :list="percentList" v-model="formData.percentage" />
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款金额</div>
        <div class="r">
          <input type="digit" class="ip" v-model="daikun1" disabled />
          <span class="unit">万元</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款年限</div>
        <div class="r">
          <c-select :list="yearsList" v-model="formData.years" />
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商贷利率方式</div>
        <div class="r">
          <div class="radio mr20" :class="{'radio-active': formData.type2 === 0}" @click="formData.type2 = 0">基准利率</div>
          <div class="radio mr20" :class="{'radio-active': formData.type2 === 1}" @click="formData.type2 = 1">LPR基础利率</div>
        </div>
      </div>


      <div class="loan-form-item" v-if="formData.type2 === 0">
        <div class="l">商贷利率</div>
        <div class="r">
          <div class="acenter">
            <div style="width: 80%">
              <c-select :list="lilvList" v-model="formData.lilv" />
            </div>
            <span>= {{formData.lilv}}%</span>
          </div>
        </div>
      </div>
      <template v-else-if="formData.type2 === 1">
      <div class="loan-form-item">
        <div class="l">LPR</div>
        <div class="r" style="width: 40%">
          <input type="digit" class="ip" v-model="formData.lpr" />
          <span class="unit">%</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">基点</div>
        <div class="r" style="width: 40%">
          <input type="digit" class="ip" v-model="formData.base" />
          <span class="unit">%oo</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商贷利率</div>
        <div class="r">
          <input type="digit" class="ip" v-model="lilv" disabled />
          <span class="unit">%</span>
        </div>
      </div>
      </template>

      <p class="hint">注：此计算结果仅为参考，实际缴费应以当地为准</p>
      <div class="loan-form-item">
        <div class="l">　</div>
        <div class="r acenter">
          <button class="btn btn-min" @click="reset">重 置</button>
          <button class="btn btn-min btn-light" @click="submit">计 算</button>
        </div>
      </div>
    </div>

    <div class="loan-form" v-show="tabKey === 1">
      <div class="loan-form-item">
        <div class="l">计算方式</div>
        <div class="r acenter">
          <div class="radio mr20" :class="{'radio-active': formData1.type1 === 0}" @click="formData1.type1 = 0">按房屋总价计算</div>
          <div class="radio mr20" :class="{'radio-active': formData1.type1 === 1}" @click="formData1.type1 = 1">按单价与面积计算</div>
        </div>
      </div>
      <div class="loan-form-item" v-if="formData1.type1 === 0">
        <div class="l">房屋总价</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData1.housePrice1" />
          <span class="unit">万元</span>
        </div>
      </div>
      <template v-else>
      <div class="loan-form-item">
        <div class="l">单价</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData1.price" />
          <span class="unit">元 / ㎡</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">面积</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData1.area" />
          <span class="unit">㎡</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">房屋总价</div>
        <div class="r">
          <input type="digit" class="ip" v-model="houseTotal2" disabled />
          <span class="unit">万元</span>
        </div>
      </div>
      </template>
      <div class="loan-form-item">
        <div class="l">贷款成数</div>
        <div class="r">
          <c-select :list="percentList" v-model="formData1.percentage" />
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款金额</div>
        <div class="r">
          <input type="digit" class="ip" v-model="daikun2" disabled />
          <span class="unit">万元</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款年限</div>
        <div class="r">
          <c-select :list="yearsList" v-model="formData1.years" />
        </div>
      </div>

      <div class="loan-form-item">
        <div class="l">公积金利率</div>
        <div class="r">
          <div class="acenter">
            <div style="width: 80%">
              <c-select :list="lilvList2" v-model="formData1.lilv" />
            </div>
            <span>= {{formData1.lilv}}%</span>
          </div>
        </div>
      </div>

      <p class="hint">注：此计算结果仅为参考，实际缴费应以当地为准</p>
      <div class="loan-form-item">
        <div class="l">　</div>
        <div class="r acenter">
          <button class="btn btn-min" @click="reset">重 置</button>
          <button class="btn btn-min btn-light" @click="submit">计 算</button>
        </div>
      </div>
    </div>

    <div class="loan-form" v-show="tabKey === 2">
      <div class="loan-form-item">
        <div class="l">公积金贷款金额</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData2.sd_Amount" />
          <span class="unit">万元</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商业贷款金额</div>
        <div class="r">
          <input type="digit" class="ip" v-model="formData2.gjj_Amount1" />
          <span class="unit">万元</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">贷款年限</div>
        <div class="r">
          <c-select :list="yearsList" v-model="formData2.years" />
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">公积金利率</div>
        <div class="r">
          <div class="acenter">
            <div style="width: 80%">
              <c-select :list="lilvList2" v-model="formData2.gjj_APR" />
            </div>
            <span>= {{formData2.gjj_APR}}%</span>
          </div>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商贷利率方式</div>
        <div class="r">
          <div class="radio mr20" :class="{'radio-active': formData2.type2 === 0}" @click="formData2.type2 = 0">基准利率</div>
          <div class="radio mr20" :class="{'radio-active': formData2.type2 === 1}" @click="formData2.type2 = 1">LPR基础利率</div>
        </div>
      </div>


      <div class="loan-form-item" v-if="formData2.type2 === 0">
        <div class="l">商贷利率</div>
        <div class="r">
          <div class="acenter">
            <div style="width: 80%">
              <c-select :list="lilvList" v-model="formData2.sd_APR" />
            </div>
            <span>= {{formData2.sd_APR}}%</span>
          </div>
        </div>
      </div>
      <template v-else-if="formData2.type2 === 1">
      <div class="loan-form-item">
        <div class="l">LPR</div>
        <div class="r" style="width: 40%">
          <input type="digit" class="ip" v-model="formData2.lpr" />
          <span class="unit">%</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">基点</div>
        <div class="r" style="width: 40%">
          <input type="digit" class="ip" v-model="formData2.base" />
          <span class="unit">%oo</span>
        </div>
      </div>
      <div class="loan-form-item">
        <div class="l">商贷利率</div>
        <div class="r">
          <input type="digit" class="ip" v-model="lilv2" disabled />
          <span class="unit">%</span>
        </div>
      </div>
      </template>

      <p class="hint">注：此计算结果仅为参考，实际缴费应以当地为准</p>
      <div class="loan-form-item">
        <div class="l">　</div>
        <div class="r acenter">
          <button class="btn btn-min" @click="reset">重 置</button>
          <button class="btn btn-min btn-light" @click="submit">计 算</button>
        </div>
      </div>
    </div>


    <template v-if="showResult">
    <div class="loan-title">计算结果</div>

    <div class="ml60 mb20">首付：<span class="f28" style="color: #F46C42;">{{record.sf}}万元</span></div>
    <div class="ml60 mb20">商业贷款利率：{{record.lilv}}%</div>

    <div class="loan-table">
      <div class="loan-head">等额本息，每期等额还款</div>
      <ul class="loan-list loan-list1">
        <li>
          <p>每期还款</p>
          <div><span class="c-3d">{{record.fqhk}}元</span></div>
        </li>
        <li>
          <p>支付利息</p>
          <div>{{record.zfll}}万元</div>
        </li>
        <li>
          <p><span>还款总额</span></p>
          <div>{{record.hkze}}万元</div>
        </li>
      </ul>
    </div>

    <div class="loan-table">
      <div class="loan-head">等额本金  逐期递减还款</div>
      <ul class="loan-list loan-list2">
        <li class="l">
          <div>每期还款</div>
          <p class="c-3d">{{record.sf1}}元</p>
          <div>支付利息<span>{{record.zfll1}}万元</span></div>
          <div>还款总额<span>{{record.hkze1}}万元</span></div>
        </li>
        <li class="r">
          <div v-for="(item, index) in record.averageArr">第{{index + 1}}期还款<span>{{item}}元</span></div>
        </li>
      </ul>
    </div>
    </template>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSelect from './modules/cSelect'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates,
    cSelect
  },
  data () {
    return {
      id: '',
      tabKey: 0,
      formData: {
        type1: 0,
        housePrice1: '',
        percentage: 0.7,
        daikuan_total000: '',
        years: 20,
        lilv: '4.9',
        lilv2: '3.25',
        type2: 0,
        lpr: 4.65,
        base: 0,
        price: '',
        area: ''
      },
      formData1: {
        type1: 0,
        housePrice1: '',
        percentage: 0.7,
        daikuan_total000: '',
        years: 20,
        lilv: '3.25',
        price: '',
        area: ''
      },
      formData2: {
        sd_Amount: '',
        gjj_Amount1: '',
        years: 20,
        sd_APR: '4.9',
        gjj_APR: '3.25',
        type2: 0,
        lpr: 4.65,
        base: 0
      },
      showResult: false,
      record: {},
      percentList: [
        { name: '9成', value: 0.9 },
        { name: '8成', value: 0.8 },
        { name: '7成', value: 0.7 },
        { name: '6成', value: 0.6 },
        { name: '5成', value: 0.5 },
        { name: '4成', value: 0.4 },
        { name: '3成', value: 0.3 },
        { name: '2成', value: 0.2 }
      ],
      yearsList: [],
      lilvList: [
        { name: '基准利率7折', value: '3.43' },
        { name: '基准利率75折', value: '3.68' },
        { name: '基准利率8折', value: '3.92' },
        { name: '基准利率85折', value: '4.17' },
        { name: '基准利率9折', value: '4.41' },
        { name: '基准利率95折', value: '4.66' },
        { name: '基准利率（4.9%）', value: '4.9' },
        { name: '基准利率1.05倍', value: '5.15' },
        { name: '基准利率1.1倍', value: '5.39' },
        { name: '基准利率1.15倍', value: '5.63' },
        { name: '基准利率1.2倍', value: '5.88' },
        { name: '基准利率1.25倍', value: '6.13' },
        { name: '基准利率1.3倍', value: '6.37' }
      ],
      lilvList2: [
        { name: '基准利率7折', value: '2.27' },
        { name: '基准利率75折', value: '2.44' },
        { name: '基准利率8折', value: '2.6' },
        { name: '基准利率85折', value: '2.76' },
        { name: '基准利率9折', value: '2.93' },
        { name: '基准利率95折', value: '3.09' },
        { name: '基准利率（3.25%）', value: '3.25' },
        { name: '基准利率1.05倍', value: '3.41' },
        { name: '基准利率1.1倍', value: '3.58' },
        { name: '基准利率1.15倍', value: '3.74' },
        { name: '基准利率1.2倍', value: '3.9' },
        { name: '基准利率1.25倍', value: '4.06' },
        { name: '基准利率1.3倍', value: '4.23' }
      ]
    }
  },
  computed: {
    lilv () {
      return Number(this.formData.lpr) + Number(this.formData.base)
    },
    lilv2 () {
      return Number(this.formData2.lpr) + Number(this.formData2.base)
    },
    houseTotal () {
      if (this.formData.price === '' && this.formData.area === '') {
        return ''
      } else if (this.formData.price !== '' && this.formData.area !== '') {
        return (Number(this.formData.price) * Number(this.formData.area)) / 10000
      } else {
        return 0
      }
    },
    houseTotal2 () {
      if (this.formData1.price === '' && this.formData1.area === '') {
        return ''
      } else if (this.formData1.price !== '' && this.formData1.area !== '') {
        return (Number(this.formData1.price) * Number(this.formData1.area)) / 10000
      } else {
        return 0
      }
    },
    daikun1 () {
      if (this.formData.type1 === 0) {
        if (this.formData.housePrice1 === '') {
          return ''
        } else {
          return Number(this.formData.housePrice1) * this.formData.percentage
        }
      } else {
        if (this.formData.housePrice1 === '') {
          return ''
        } else {
          return Number(this.houseTotal) * this.formData.percentage
        }
      }
    },
    daikun2 () {
      if (this.formData1.type1 === 0) {
        if (this.formData1.housePrice1 === '') {
          return ''
        } else {
          return Number(this.formData1.housePrice1) * this.formData1.percentage
        }
      } else {
        if (this.formData1.housePrice1 === '') {
          return ''
        } else {
          return Number(this.houseTotal2) * this.formData1.percentage
        }
      }
    }
  },
  methods: {
    submit () {
      if (this.tabKey === 0) {
        this.getData()
      } else if (this.tabKey === 1) {
        this.getData1()
      } else if (this.tabKey === 2) {
        this.getData2()
      }
    },
    getData () {
      const params = {
        percentage: this.formData.percentage,
        daikuan_total000: this.daikun1,
        years: this.formData.years
      }
      if (this.formData.type1 === 0) {
        params.housePrice1 = this.formData.housePrice1
      } else {
        params.housePrice1 = this.houseTotal
      }
      if (this.formData.type2 === 0) {
        params.lilv = this.formData.lilv
      } else {
        params.lilv = this.lilv
      }
      postAction('mortgage', params).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          this.showResult = true
        }
      })
    },
    getData1 () {
      const params = {
        percentage: this.formData1.percentage,
        daikuan_total000: this.daikun2,
        years: this.formData1.years,
        lilv: this.formData1.lilv
      }
      if (this.formData1.type1 === 0) {
        params.housePrice1 = this.formData1.housePrice1
      } else {
        params.housePrice1 = this.houseTotal2
      }
      postAction('mortgage', params).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          this.showResult = true
        }
      })
    },
    getData2 () {
      const params = {
        sd_Amount: this.formData2.sd_Amount,
        gjj_Amount1: this.formData2.gjj_Amount1,
        years: this.formData2.years,
        gjj_APR: this.formData2.gjj_APR
      }
      if (this.formData2.type2 === 0) {
        params.sd_APR = this.formData2.sd_APR
      } else {
        params.sd_APR = this.lilv2
      }
      postAction('zh_mortgage', params).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          this.showResult = true
        }
      })
    },
    reset () {
      this.formData = {
        type1: 0,
        housePrice1: '',
        percentage: 0.7,
        daikuan_total000: '',
        years: 20,
        lilv: '4.9',
        lilv2: '3.25',
        type2: 0,
        lpr: 4.65,
        base: 0,
        price: '',
        area: ''
      }
      this.formData1 = {
        type1: 0,
        housePrice1: '',
        percentage: 0.7,
        daikuan_total000: '',
        years: 20,
        lilv: '3.25',
        price: '',
        area: ''
      }
      this.formData2 = {
        sd_Amount: '',
        gjj_Amount1: '',
        years: 20,
        sd_APR: '4.9',
        gjj_APR: '3.25',
        type2: 0,
        lpr: 4.65,
        base: 0
      }
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '房贷查询',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    const years = []
    for (let i = 1; i <= 30; i++) {
      years.push({
        name: `${i}年`,
        value: i
      })
    }
    this.yearsList = years
  }
}
</script>

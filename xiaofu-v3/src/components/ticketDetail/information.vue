<style scoped>
.notice-bBorder {
  height: 1px;
  margin: 76px 25px 0 25px;
}
</style>

<template>
<div class="c-ticket-information">
  <div class="c-ticket-title"><span>Information</span>购买信息</div>
  <ul class="form-list">
    <li>
      <div class="rank"><img :src="'/static/images/number/1.png'" mode="heightFix" /></div>
      <div class="content">
        <input placeholder="姓名 Name"
               placeholder-style="color: #9E9E9F;"
               v-model="name"
               @blur="inputChange('name')"
               @confirm="inputChange('name')" />
      </div>
    </li>
    <li>
      <div class="rank"><img :src="'/static/images/number/2.png'" mode="heightFix" /></div>
      <div class="content">
        <input placeholder="电话 Phone"
               placeholder-style="color: #9E9E9F;"
               v-model="mobile"
               @blur="inputChange('mobile')"
               @confirm="inputChange('mobile')" />
      </div>
    </li>
    <li v-if="needIDcard">
      <div class="rank"><img :src="'/static/images/number/3.png'" mode="heightFix" /></div>
      <div class="content">
        <input :placeholder="placeholder"
               placeholder-style="color: #9E9E9F;"
               v-model="cardNo"
               @blur="inputChange('cardNo')"
               @confirm="inputChange('cardNo')" />
        <picker :range="idTypeArr" @change="idChange" range-key="name">
          <button><img src="/static/images/common/select-img1.png" mode="heightFix" /></button>
        </picker>
      </div>
    </li>
    <li v-if="needAddress">
      <div class="rank">
        <img :src="'/static/images/number/4.png'" mode="heightFix" v-if="needIDcard" />
        <img :src="'/static/images/number/3.png'" mode="heightFix" v-else />
      </div>
      <div class="content">
        <input placeholder="收件地址"
               placeholder-style="color: #9E9E9F;"
               v-model="address"
               @blur="inputChange('address')"
               @confirm="inputChange('address')" />
      </div>
    </li>
  </ul>
  <div class="notice-bBorder bBorder"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    needIDcard: {
      type: Boolean,
      default: true
    },
    needAddress: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: '',
      mobile: '',
      address: '',
      identity_type: 1,
      cardNo: '',
      placeholder: '身份证 ID number',
      idTypeArr: [
        { name: '身份证 ID number', value: 1 },
        { name: '护照 passport', value: 2 }
      ]
    }
  },
  mounted () {
    const nameVal = mpvue.getStorageSync('nameVal')
    const phoneVal = mpvue.getStorageSync('phoneVal')
    const addressVal = mpvue.getStorageSync('addressVal')
    const emailVal = mpvue.getStorageSync('emailVal')
    const idnum = mpvue.getStorageSync('idnum')
    this.name = nameVal
    this.mobile = phoneVal
    this.cardNo = idnum
    this.inputChange()
  },
  methods: {
    idChange (e) {
      const item = this.idTypeArr[e.mp.detail.value]
      this.identity_type = item.value
      this.placeholder = item.name
      this.inputChange()
    },
    inputChange () {
      this.$emit('change', {
        name: this.name,
        mobile: this.mobile,
        cardNo: this.cardNo,
        identity_type: this.identity_type
      })
    }
  }
}
</script>

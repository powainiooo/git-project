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
        <input placeholder="姓名 Name" placeholder-style="color: #9E9E9F;" v-model="formData.name" />
      </div>
    </li>
    <li>
      <div class="rank"><img :src="'/static/images/number/2.png'" mode="heightFix" /></div>
      <div class="content">
        <input placeholder="电话 Phone" placeholder-style="color: #9E9E9F;" v-model="formData.phone" />
      </div>
    </li>
    <li>
      <div class="rank"><img :src="'/static/images/number/3.png'" mode="heightFix" /></div>
      <div class="content">
        <input placeholder="身份证号码 ID number" placeholder-style="color: #9E9E9F;" v-model="formData.number" />
        <picker :range="idTypeArr" @change="idChange">
          <button><img src="/static/images/common/select-img1.png" mode="heightFix" /></button>
        </picker>
      </div>
    </li>
  </ul>
  <div class="notice-bBorder bBorder"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      formData: {
        name: '',
        phone: '',
        number: '',
        type: ''
      },
      idTypeArr: ['身份证 ID card', '护照 passport']
    }
  },
  methods: {
    idChange (e) {
      console.log('idChange', e)
      this.formData.type = this.idTypeArr[e.mp.detail.value]
    }
  }
}
</script>

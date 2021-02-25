<style scoped>
.notice-bBorder {
  height: 1px;
  margin: 76px 25px 0 25px;
}
</style>

<template>
<div class="c-ticket-information" style="margin-bottom: 150rpx">
  <div class="c-ticket-title"><span>Select</span>选择票种、张数</div>
  <ul class="form-list">
    <li>
      <div class="rank"><img :src="'/static/images/number/1.png'" mode="heightFix" /></div>
      <div class="content">
        <input placeholder="姓名 Name" placeholder-style="color: #9E9E9F;" />
      </div>
    </li>
    <li>
      <div class="rank"><img :src="'/static/images/number/2.png'" mode="heightFix" /></div>
      <div class="content active">
        <input placeholder="身份证号码 ID number" placeholder-style="color: #9E9E9F;" v-model="formData.number" />
        <picker :range="idTypeArr" @change="idChange">
          <button style="width: 134rpx">
            <img src="/static/images/common/select-img2.png" mode="heightFix" />
            <div class="nums"><span>2</span>张</div>
          </button>
        </picker>
      </div>
    </li>
  </ul>
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

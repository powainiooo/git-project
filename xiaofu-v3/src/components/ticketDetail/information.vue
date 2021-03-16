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
        <input placeholder="电话 Phone" placeholder-style="color: #9E9E9F;" v-model="formData.mobile" />
      </div>
    </li>
    <li>
      <div class="rank"><img :src="'/static/images/number/3.png'" mode="heightFix" /></div>
      <div class="content">
        <input :placeholder="placeholder" placeholder-style="color: #9E9E9F;" v-model="formData.id_card_no" />
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
        mobile: '',
        id_card_no: '',
        type: ''
      },
      placeholder: '身份证 ID number',
      idTypeArr: [
        { name: '身份证 ID number', value: 1 },
        { name: '护照 passport', value: 2 }
      ]
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

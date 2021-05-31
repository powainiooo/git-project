<style scoped>
.addr-form .footer-btns { left: -25px; right: -25px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box addr-form" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-title">新增收货地址</div>
    <div class="mt30 ml35 mr35 mb75">
      <div class="form-line mb30">
        <div class="form-item">
          <input placeholder="收件姓名" v-model="formData.name" />
        </div>
        <div class="form-item">
          <input placeholder="联系电话" v-model="formData.phone" />
        </div>
      </div>
      <div class="form-line mb30">
        <div class="form-item">
          <picker mode="region" @change="addrChange">
            <input placeholder="选择 省份 / 市级 / 区" disabled v-model="addrStr" />
          </picker>
          <img src="/static/images/arrow3.png" class="arrow3" mode="widthFix" />
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <input placeholder="详细收件地址" v-model="formData.address" />
        </div>
      </div>
    </div>
    <div class="acenter ml35 mb200" @click="toggle">
      <img src="/static/images/radio.png" mode="widthFix" class="w30" v-show="formData.status === 0" />
      <img src="/static/images/radio-checked.png" mode="widthFix" class="w30" v-show="formData.status === 1" />
      <span class="f20 c-9e ml10">设为默认地址</span>
    </div>

    <div class="footer-btns">
      <div class="r">
        <button @click="handleSave">保存地址</button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import { postAction, getAction } from '@/utils/api'

export default {
  name: 'app',
  computed: {
    addrStr () {
      if (this.formData.province === '' || this.formData.city === '' || this.formData.area === '') {
        return ''
      } else {
        return `${this.formData.province} / ${this.formData.city} / ${this.formData.area}`
      }
    }
  },
  data() {
    return {
      visible: false,
      showItem: false,
      formData: {
        name: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        status: 0
      },
      isAjax: false,
      id: ''
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.showItem = true
      })
    },
    edit (id) {
      getAction('/userapi/user/address/show', {
        id
      }).then(res => {
        if (res.code === 0) {
          for (const key in this.formData) {
            this.formData[key] = res.data[key]
          }
          this.show()
        }
      })
    },
    hide () {
      this.showItem = false
      this.reset()
    },
    reset () {
      this.formData = {
        name: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        status: 0
      }
      this.id = ''
    },
    animationend () {
      this.visible = false
    },
    toggle () {
      this.formData.status = this.formData.status === 0 ? 1 : 0
    },
    addrChange (e) {
      console.log('addrChange', e)
      this.formData.province = e.mp.detail.value[0]
      this.formData.city = e.mp.detail.value[1]
      this.formData.area = e.mp.detail.value[2]
    },
    handleSave () {
      if (this.isAjax) return
      this.isAjax = true
      const params = { ...this.formData }
      let url = '/userapi/user/address/store'
      if (this.id !== '') {
        url = '/userapi/user/address/update'
        params.id = this.id
      }
      postAction(url, params).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          mpvue.showToast({
            title: res.msg
          })
          this.reset()
          this.hide()
          this.$emit('ok')
        }
      })
    }
  }
}
</script>

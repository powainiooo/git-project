<style scoped>
.addr-item { padding-top: 30px; overflow: hidden; position: relative; }
.addr-box { border-radius: 35px 35px 0 0; box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.1); margin: 0 32px; background-color: #F9F9F9; overflow: hidden; }
.addr-box .header { height: 94px; background-color: #EDECEB; padding: 0 35px; }
.addr-box .body { padding: 30px 35px 0 35px; }
.addr-item .sd { width: 100%; position: absolute; left: 0; bottom: 0; }
</style>

<template>
<div class="addr-item">
  <div class="addr-box">
    <div class="header between">
      <div class="acenter" @click.stop="setStatus">
        <img src="/static/images/radio.png" mode="widthFix" class="w30" v-if="record.status === 0" />
        <img src="/static/images/radio-checked.png" mode="widthFix" class="w30" v-else />
        <span class="f20 c-9e ml10">设为默认地址</span>
      </div>
      <div class="flex">
        <button class="btn-circle btn-style1 mr20" @click="handleEdit"><img src="/static/images/edit.png" mode="widthFix" class="w26" /></button>
        <button class="btn-circle btn-style1" @click="handleDel"><img src="/static/images/del.png" mode="widthFix" class="w24" /></button>
      </div>
    </div>
    <div class="body">
      <div class="form-line mb35">
        <div class="form-item">
          <span class="f30 ml15">{{record.name}}</span>
        </div>
        <div class="form-item">
          <span class="f36 DinL ml15">{{record.phone}}</span>
        </div>
      </div>
      <div class="form-line mb35">
        <div class="form-item">
          <span class="f24 ml15">{{record.province}} / {{record.city}} / {{record.area}}</span>
        </div>
      </div>
      <div class="form-line mb35">
        <div class="form-item">
          <span class="f24 ml15">{{record.address}}</span>
        </div>
      </div>
    </div>
  </div>
  <img src="/static/images/sd1.png" class="sd" mode="widthFix" />
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils/api'

export default {
  name: 'app',
  props: {
    record: Object
  },
  data () {
    return {}
  },
  methods: {
    handleDel () {
      mpvue.showModal({
        title: '警告？',
        content: '是否确认删除本条记录？',
        success: res => {
          if (res.confirm) {
            postAction('/userapi/user/address/destroy', {
              id: this.record.id
            }).then(res => {
              if (res.code === 0) {
                mpvue.showToast({
                  title: res.msg
                })
                this.$emit('ok')
              }
            })
          }
        }
      })
    },
    handleEdit () {
      this.$emit('edit', this.record.id)
    },
    setStatus () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/user/address/set/default', {
        id: this.record.id,
        status: this.record.status === 1 ? 0 : 1
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$emit('ok')
        }
      })
    }
  }
}
</script>

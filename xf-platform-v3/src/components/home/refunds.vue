<style scoped>
.refunds { margin: 140px 20px 50px 20px; }
</style>

<template>
<div class="refunds">
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(1)" />
      <span>退款类型</span>
    </div>
  </div>
  <div class="mt35 ml35 mb110">
    <RadioGroup class="xf-radios" v-model="formData.type">
      <Radio label="个别退款"></Radio>
      <Radio label="全部退款"></Radio>
    </RadioGroup>
  </div>
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(2)" />
      <span>退款原因</span>
    </div>
  </div>
  <div class="mt35 ml35 mb90">
    <RadioGroup class="xf-radios" v-model="formData.reason">
      <Radio label="活动改期"></Radio>
      <Radio label="艺人原因"></Radio>
      <Radio label="场地原因"></Radio>
      <Radio label="活动限流"></Radio>
      <div class="flex mt30">
        <Radio label="其他原因"></Radio>
        <Input type="textarea" placeholder="填写原因" :rows="4" style="width: 320px;" />
      </div>
    </RadioGroup>
  </div>
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(3)" />
      <span>通知凭证</span>
    </div>
  </div>
  <div class="mt35 ml35 mb140">
    <upload-img width="170" v-model="formData.image">
      <span slot="hint">因活动方原因导致退款行为，活动方已通知到位方可提交退款申请，<br/>需提供通知凭证（如推文告知用户），若未通知到位退款申请将驳回。</span>
    </upload-img>
  </div>
  <div class="mt35 ml35">
    <Button size="small" style="width: 90px;" :disabled="formData.image === ''">提交申请</Button>
  </div>
</div>
</template>

<script type='es6'>
import uploadImg from '../uploadImg'
export default {
  name: 'app',
  components: {
    uploadImg
  },
  data () {
    return {
      formData: {
        type: '',
        reason: '',
        image: ''
      }
    }
  },
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    }
  }
}
</script>

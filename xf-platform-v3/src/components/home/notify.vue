<style scoped>
.c-notify { margin: 120px 0 0 60px; }
/deep/.ivu-input-word-count { background-color: transparent }
</style>

<template>
<div class="c-notify">
  <tag-line title="活动名称" :width="300" class="mb10">{{record.name}}</tag-line>
  <Form class="form" style="width: 250px; margin-left: 0; margin-top: 0;">
    <FormItem>
      <Input v-model="formData.content"
             maxlength="20"
             show-word-limit
             placeholder="变动原因" />
    </FormItem>
    <FormItem>
      <c-date-time type="date"
                   placeholder="变更日期"
                   :clearable="false"
                   @change="dateChange" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.address"
             maxlength="20"
             show-word-limit
             placeholder="变更地址" />
    </FormItem>
    <FormItem>
      <Input type="textarea"
             :rows="4"
             maxlength="200"
             show-word-limit
             v-model="formData.remark"
             placeholder="备注" />
    </FormItem>
    <div class="f12 c-c8 mt30">如为取消活动，“变更日期”和“变更地址”填写内容为，“该活动取消不延期”，不得为空。<br />
      备注可供填写提醒，如：退款将在3个工作日内原路退回，请耐心等待。</div>
    <div class="mt100">
      <Button :disabled="btnDisabled" @click="handleSend">立即发送</Button>
    </div>
  </Form>
</div>
</template>

<script type='es6'>
import tagLine from '@/components/tagLine'
import cDateTime from '@/components/cDateTime'
import { postAction } from '@/utils'

export default {
  name: 'app',
  components: {
    tagLine,
    cDateTime
  },
  props: {
    record: Object
  },
  computed: {
    btnDisabled () {
      const fd = this.formData
      if (fd.content === '' || fd.date === '' || fd.address === '') {
        return true
      }
      return false
    }
  },
  data () {
    return {
      formData: {
        content: '',
        date: '',
        address: '',
        remark: ''
      },
      isAjax: false
    }
  },
  methods: {
    dateChange (e) {
      console.log('dateChange', e)
      this.formData.date = e
    },
    handleSend () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/editor/notice/subscribe_message_send', {
        ticket_id: this.record.id,
        ...this.formData
      }).then(res => {
        this.isAjax = false
        if (res.code === 1) {
          this.$Message.success(res.msg)
          this.$emit('toggle', 'orders')
        }
      })
    }
  }
}
</script>

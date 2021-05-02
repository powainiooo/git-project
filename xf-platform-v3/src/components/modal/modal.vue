<style>
.n-modal{ width: 100vw; height: 100vh; background-color: rgba(11, 11, 13, 0.85); position: fixed; top: 0; left: 0; z-index: 10000; display: flex; justify-content: center; align-items: center;}
.n-modal .modal-frame{ width: 420px; min-height: 280px; box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.15); background-color: #fff; border-radius: 10px; position: relative;}
.n-modal .modal-frame .n-modal-close { position: absolute; top: 20px; right: 20px; }
.n-modal .modal-frame .title{ font-size: 18px; margin: 75px 60px 20px 60px; color: #000000;}
.n-modal .modal-frame .content{ font-size: 12px; min-height: 75px; margin: 0 60px 20px 60px; color: #C8C9CA; line-height: 18px; }
.n-modal .modal-frame .txt { margin: 0 60px 20px 60px; font-size: 12px; color: #C8C9CA;}
.n-modal .modal-frame .txt p{ margin-bottom: 6px;}
.n-modal .modal-frame .txt textarea{ width: 100%; border: 1px solid #e5e5e5; border-radius: 6px; padding: 10px; box-sizing: border-box;}
.n-modal .modal-frame .btns{ display: flex; margin: 0 0 40px 60px; }
.n-modal .modal-frame .btns button { margin-right: 20px; }
</style>

<template>
<section class="n-modal" v-if="isShow">
  <div class="modal-frame">
    <a href="javascript:;"
       class="n-modal-close"
       @click="onCancel"
       v-if="!isWarn && type !== 'textarea'">
      <img src="@/assets/img/ico-close2.png" width="28" />
    </a>
    <div class="title" v-if="type === ''">{{title}}</div>
    <div class="content" v-html="content" v-if="type === ''"></div>
    <div class="mt40 ml40 mr40 mb40" v-if="type === 'textarea'">
      <Input v-model="text" :rows="8" maxlength="200" show-word-limit type="textarea" placeholder="由于微信消息通知限制，只可在用户已购票后的7日内发送消息，超过7日的用户则无法收取该消息。请填写通知（200字）" />
    </div>
    <div class="btns">
      <Button size="small" @click="onOk">{{okText}}</Button>
      <Button size="small" class="ivue-btn-cancel" @click="onCancel">{{cancelText}}</Button>
    </div>
  </div>
</section>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      isShow: false,
      isWarn: true,
      title: '',
      content: '',
      type: '',
      text: '',
      okText: '确认',
      cancelText: '取消',
      opts: {}
    }
  },
  methods: {
    warning (opts) {
      this.isShow = true
      this.isWarn = true
      this.content = opts.content
      this.title = opts.title
      this.okText = opts.okText || '确认'
      this.opts = opts
    },
    confirm (opts) {
      this.isShow = true
      this.isWarn = false
      this.content = opts.content
      this.title = opts.title
      this.type = opts.type || ''
      this.okText = opts.okText || '确认'
      this.cancelText = opts.cancelText || '取消'
      this.opts = opts
    },
    onCancel () {
      this.isShow = false
    },
    onOk () {
      this.isShow = false
      if (typeof this.opts.onOk === 'function') {
        this.opts.onOk(this.text)
      }
    }
  }
}

</script>

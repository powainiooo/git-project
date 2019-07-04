<style>
   .tsj-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 10000; background-color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;}
   .tsj-modal .tsj-modal-frame { width: 90%; background-color: #fff; border-radius: 10px;}
   .tsj-modal .tsj-modal-frame .tsj-modal-header { margin: 0 14px; height: 42px; display: flex; align-items: center; padding-left: 18px; border-bottom: 1px solid #868686;}
   .tsj-modal .tsj-modal-frame .tsj-modal-header a { width: 20px; font-size: 0;}
   .tsj-modal .tsj-modal-frame .tsj-modal-header a img { width: 100%;}
   .tsj-modal .tsj-modal-frame .tsj-modal-content{ height: 130px; display: flex; justify-content: center; align-items: center; font-size: 14px; line-height: 14px;}
   .tsj-modal .tsj-modal-frame .btns{ display: flex; justify-content: center; margin-bottom: 20px;}
   .tsj-modal .tsj-modal-frame .btns a{ width: 140px; height: 38px; display: flex; justify-content: center; align-items: center; border: 2px solid #0084FF; border-radius: 19px; font-size: 16px; color: #0084FF; line-height: 16px; text-decoration: none; margin: 0 14px;}
   .tsj-modal .tsj-modal-frame .btns a.confirm{ color: #ffffff; background-color: #0084FF;}
</style>

<template>
   <div class="tsj-modal" v-if="isShow">
      <div class="tsj-modal-frame">
         <div class="tsj-modal-header">
            <a href="javascript:;" @click="onCancel"><img src="@/assets/icon-close.png"></a>
         </div>
         <div class="tsj-modal-content">{{content}}</div>
         <div class="btns">
            <a href="javascript:;" class="confirm" @click="onOk">确定</a>
            <a href="javascript:;" v-if="!isWarn" @click="onCancel">取消</a>
         </div>
      </div>
   </div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {
         isShow: false,
         isWarn: true,
         content: '',
         opts: {}
      }
   },
   methods: {
      warn (opts) {
         this.isShow = true
         this.isWarn = true
         this.content = opts.content
         this.opts = opts
      },
      confirm (opts) {
         this.isShow = true
         this.isWarn = false
         this.content = opts.content
         this.opts = opts
      },
      onCancel () {
         this.isShow = false
      },
      onOk () {
         this.isShow = false
         if (typeof this.opts.onOk === 'function') {
            this.opts.onOk()
         }
      }
   }
}

</script>

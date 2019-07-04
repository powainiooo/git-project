<style>
    .base-info{}
    .base-info .base-info-list{ margin: 0 50px 120px 50px;}
    .base-info .base-info-hint{ border-top: 1px solid #e2e2e2; background-color: #efefef; padding: 20px 50px 115px 50px;}
    .base-info .base-info-hint .logo-frame{ display: flex; align-items: center;}
    .base-info .base-info-hint .logo-frame .img{ width: 100px; height: 100px; display: flex; justify-content: center; align-items: center; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 3px rgba(0,0,0,0.2); background-color: #ffffff;}
    .base-info .base-info-hint .logo-frame .img img{ width: 100%;}
    .base-info .base-info-hint .logo-frame .name{ font-size: 14px; color: #888888; margin-left: 20px;}
</style>

<template>
    <div class="base-info">
        <div class="base-info-list">
            <div class="info-item">
                <p class="name">合作联系</p>
                <p class="info" style="width: 300px;">18023095011</p>
            </div>
            <div class="info-item">
                <p class="name">工作邮箱</p>
                <p class="info" style="width: 300px;">2290907780@qq.com</p>
            </div>
            <div class="info-item">
                <p class="name">操作疑问</p>
                <p class="info" style="width: 300px;">18681438270</p>
            </div>
        </div>
    </div>
</template>

<script type="es6">
export default {
   name: 'App',
   computed: {
      contactData () {
         return this.$store.state.contactData
      }
   },
   data () {
      return {

      }
   }
}

</script>

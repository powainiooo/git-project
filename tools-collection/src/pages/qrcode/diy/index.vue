<style scoped>
.colors { width: 140px; height: 48px; border-radius: 24px; }
.btn2 { width: 140px; height: 48px; line-height: 48px; border-radius: 24px; background-color: #436CB3; font-size: 26px; color: #FFFFFF; margin: 0;  }
</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="form mb45">
      <div class="formLine">
        <div class="formLabel">背景颜色</div>
        <div class="formContent">
          <div class="colors" style="background-color: #F0BE57"></div>
        </div>
      </div>
      <div class="formLine">
        <div class="formLabel">背景颜色</div>
        <div class="formContent">
          <div class="colors" style="background-color: #FF0000"></div>
        </div>
      </div>
      <div class="formLine">
        <div class="formLabel">尺寸大小</div>
        <div class="formContent"><input type="digit" placeholder="请输入尺寸大小" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">边距</div>
        <div class="formContent"><input type="digit" placeholder="请输入边距" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">LOGO图片</div>
        <div class="formContent">
          <button class="btn2">添加图片</button>
        </div>
      </div>
      <div class="formLine">
        <div class="formLabel">LOGO宽度</div>
        <div class="formContent"><input type="digit" placeholder="请输入LOGO宽度" /></div>
      </div>
    </div>


    <div class="ml120 mr120">
      <button class="btn mb40">生成二维码</button>
      <button class="btn btn-light">清除设置</button>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {}
  },

  created () {}
}
</script>

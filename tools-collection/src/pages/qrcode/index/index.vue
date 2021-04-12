<style scoped>
.tabs { margin: 20px 30px; display: flex; justify-content: space-between; }
.tabs li { width: 210px; height: 150px; border: 2px solid #666666; background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; flex-direction: column; border-radius: 4px; color: #666666; }
.tabs li img { width: 62px; height: 54px; margin-bottom: 14px; }
.tabs li span { font-size: 30px; }
.tabs li .select { display: none; }
.tabs li.active .normal { display: none; }
.tabs li.active .select { display: block; }
.tabs li.active:first-child { border-color: #81B3FF; color: #81B3FF; }
.tabs li.active:nth-child(2) { border-color: #EA5373; color: #EA5373; }
.tabs li.active:nth-child(3) { border-color: #F0BE57; color: #F0BE57; }

.txt { padding: 40px; font-size: 30px; }
</style>

<template>
  <div class="container3 ovh">
    <ul class="tabs">
      <li :class="{'active': page === 'text'}" @click="page = 'text'">
        <img src="/static/images/qrcode/icon1.png" mode="aspectFit" class="normal" />
        <img src="/static/images/qrcode/icon1-active.png" mode="aspectFit" class="select" />
        <span>文本</span>
      </li>
      <li :class="{'active': page === 'link'}" @click="page = 'link'">
        <img src="/static/images/qrcode/icon2.png" mode="aspectFit" class="normal" />
        <img src="/static/images/qrcode/icon2-active.png" mode="aspectFit" class="select" />
        <span>网址</span>
      </li>
      <li :class="{'active': page === 'card'}" @click="page = 'card'">
        <img src="/static/images/qrcode/icon3.png" mode="aspectFit" class="normal" />
        <img src="/static/images/qrcode/icon3-active.png" mode="aspectFit" class="select" />
        <span>名片</span>
      </li>
    </ul>

    <template v-if="page === 'text'">
    <div class="b-fff mb140">
      <textarea class="txt" placeholder="请输入文本内容" v-model="text1"></textarea>
    </div>
    </template>

    <template v-else-if="page === 'link'">
    <div class="b-fff mb140">
      <textarea class="txt" placeholder="请输入网址" v-model="text2"></textarea>
    </div>
    </template>

    <template v-else-if="page === 'card'">
    <div class="form mb45">
      <div class="formLine">
        <div class="formLabel">姓名</div>
        <div class="formContent"><input type="text" placeholder="请输入姓名" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">邮箱地址</div>
        <div class="formContent"><input type="text" placeholder="请输入邮箱" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">联系电话</div>
        <div class="formContent"><input type="text" placeholder="请输入联系电话" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">公司名称</div>
        <div class="formContent"><input type="text" placeholder="请输入公司名称" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">公司职位</div>
        <div class="formContent"><input type="text" placeholder="请输入公司职位" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">个人主页</div>
        <div class="formContent"><input type="text" placeholder="请输入个人主页" /></div>
      </div>
      <div class="formLine">
        <div class="formLabel">备注</div>
        <div class="formContent"><input type="text" placeholder="请输入备注" /></div>
      </div>
    </div>
    </template>

    <div class="ml120 mr120">
      <button class="btn mb40">自定义制作</button>
      <button class="btn btn-light" @click="generate">模板制作</button>
    </div>

    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import { postAction } from '@/utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      page: 'text',
      text1: '',
      text2: ''
    }
  },
  methods: {
    generate () {
      const params = {}
      if (this.page === 'text') {
        params.text = this.text1
      } else if (this.page === 'link') {
        params.text = this.text2
      }
      postAction('qrcode', params).then(res => {

      })
    }
  },
  created () {}
}
</script>

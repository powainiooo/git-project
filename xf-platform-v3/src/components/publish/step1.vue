<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="center step-frame">
  <div class="flex">
    <ticket />
    <form-box :width="600" :height="280" :index="step" style="margin-left: 30px">
      <template slot="button">
      <Button size="small" v-if="step !== 1">上一步</Button>
      <Button size="small" @click="handleNext">下一步</Button>
      </template>
      <div class="form-grid">
        <div class="form-col col1">
          <Form class="form">
            <div class="form-title">活动基本信息</div>
            <FormItem>
              <Input v-model="formData.usename" placeholder="活动名称" />
            </FormItem>
            <FormItem>
              <Select v-model="formData.usename" placeholder="音乐类型">
                <Option value="1">银行1</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formData.usename" placeholder="选择城市">
                <Option value="1">银行1</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formData.usename" placeholder="活动类型">
                <Option value="1">银行1</Option>
              </Select>
            </FormItem>
            <FormItem>
              <c-date-time placeholder="活动日期" />
            </FormItem>
            <FormItem>
              <c-date-time placeholder="开始时间" type="time" />
            </FormItem>
            <FormItem>
              <Input type="textarea" :row="4" v-model="formData.usename" placeholder="活动地址" />
            </FormItem>
          </Form>
        </div>
        <div class="form-col col1">
          <Form class="form">
            <div class="form-title">上传海报</div>
            <FormItem>
              <upload-img>
                <span slot="title">宣传海报</span>
              </upload-img>
            </FormItem>
            <div class="txt2">为了达到最佳的显示效果，请尽量按照以下建议进行海报排版设计。</div>
          </Form>
          <ul class="hint-list">
            <li>
              <div class="index"><img src="@/assets/img/nums/1.png"></div>
              <div class="txt2">外部展示与详情展示将使用同一张海报</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/2.png"></div>
              <div class="txt2">海报请使用 JPG、PNG 格式进行上传，<br/>
                色彩模式为 RGB</div>
            </li>
          </ul>
        </div>
      </div>
    </form-box>
  </div>
</div>
</template>

<script type='es6'>
import ticket from '@/components/ticket'
import formBox from '@/components/formBox'
import cDateTime from '@/components/cDateTime'
import uploadImg from '../uploadImg'
export default {
  name: 'app',
  components: {
    ticket,
    formBox,
    cDateTime,
    uploadImg
  },
  data () {
    return {
      step: 1,
      formData: {
        usename: '',
        date: 'date'
      }
    }
  },
  methods: {
    handleNext () {}
  }
}
</script>

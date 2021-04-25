<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="center step-frame">
  <div class="flex">
    <ticket :record="ticketData" />
    <form-box :width="600" :height="280" :index="step" style="margin-left: 30px">
      <template slot="button">
      <Button size="small" v-if="step !== 1">上一步</Button>
      <Button size="small" :disabled="nextDisabled" @click="handleNext">下一步</Button>
      </template>
      <div class="form-grid">
        <div class="form-col col1">
          <Form class="form">
            <div class="form-title">活动基本信息</div>
            <FormItem>
              <Input v-model="formData.name" placeholder="活动名称" />
            </FormItem>
            <FormItem>
              <Select v-model="formData.music_type" placeholder="音乐类型">
                <Option v-for="item in musicType" :key="item.value" :value="item.value">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formData.city_id" placeholder="选择城市">
                <Option v-for="item in cityData" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formData.type" placeholder="活动类型" @on-change="typeChange">
                <Option :value="1">单日</Option>
                <Option :value="2">多日</Option>
                <Option :value="3">跨月多日</Option>
              </Select>
            </FormItem>
            <FormItem>
              <c-date-time ref="date"
                           :disabled="formData.type === ''"
                           :type="formData.type === 1 ? 'date' : 'daterange'"
                           placeholder="活动日期"
                           @change="dateChange" />
            </FormItem>
            <FormItem>
              <c-date-time placeholder="开始时间" type="time" v-model="formData.start_time" />
            </FormItem>
            <FormItem>
              <Input v-model="formData.telephone" placeholder="活动联系电话" />
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="4" v-model="formData.address" placeholder="活动地址" />
            </FormItem>
          </Form>
        </div>
        <div class="form-col col1">
          <Form class="form">
            <div class="form-title">上传海报</div>
            <FormItem>
              <upload-img v-model="formData.cover_image"
                          cropper
                          :fixedNumber="[750,650]"
                          title="宣传海报">
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
  props: {
    step: [Number, String]
  },
  components: {
    ticket,
    formBox,
    cDateTime,
    uploadImg
  },
  computed: {
    globalData () {
      return this.$store.state.globalData
    },
    musicType () {
      return this.$store.getters.musicType
    },
    cityData () {
      return this.$store.state.config.citydata
    },
    ticketData () {
      return {
        start_date: this.formData.start_date,
        name: this.formData.name,
        cover_image: this.formData.cover_image,
        organizer_name: this.globalData.organizer_name,
        logo: this.globalData.logo
      }
    },
    nextDisabled () {
      const d = this.formData
      for (const key in d) {
        if (d[key] === '') {
          if (key === 'end_date' && d.type === 1) {
            continue
          } else {
            return true
          }
        }
      }
      return false
    }
  },
  data () {
    return {
      formData: {
        name: '',
        music_type: '',
        city_id: '',
        type: '',
        start_date: '',
        end_date: '',
        start_time: '',
        telephone: '',
        address: '',
        cover_image: ''
      }
    }
  },
  methods: {
    handleNext () {
      this.$emit('change', 'next')
    },
    dateChange (e) {
      console.log('dateChange', e)
      if (this.formData.type === 1) {
        this.formData.start_date = e
      } else {
        this.formData.start_date = e[0]
        this.formData.end_date = e[1]
      }
    },
    typeChange () {
      this.$refs.date.reset()
    },
    getParams () {
      const params = { ...this.formData }
      if (params.type === 1) {
        delete params.end_date
      }
      return params
    }
  }
}
</script>

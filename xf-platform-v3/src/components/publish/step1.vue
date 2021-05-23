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
        <div class="form-col col1" style="position: relative; z-index: 100;">
          <Form class="form">
            <div class="form-title">活动基本信息</div>
            <FormItem>
              <Input v-model="formData.name"
                     placeholder="活动名称"
                     :readonly="isEditor && errorData.name === ''"
                     :class="{'err-inp': isEditor && errorData.name !== ''}" />
              <div class="warnTxt" v-if="isEditor && errorData.name !== ''"><span>{{errorData.name}}</span></div>
            </FormItem>
            <FormItem>
              <tag-line title="音乐类型" v-if="isEditor">{{musicTypeText}}</tag-line>
              <Select v-model="formData.music_type" placeholder="音乐类型" v-else>
                <Option v-for="item in musicType" :key="item.value" :value="item.value">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <tag-line title="选择城市" v-if="isEditor">{{cityTxt}}</tag-line>
              <Select v-model="formData.city_id" placeholder="选择城市" v-else>
                <Option v-for="item in cityData" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <tag-line title="活动类型" v-if="isEditor">{{typeTxt}}</tag-line>
              <Select v-model="formData.type" placeholder="活动类型" @on-change="typeChange" v-else>
                <Option v-for="i in typeList" :key="i.value" :value="i.value">{{i.name}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <tag-line title="活动日期" v-if="isEditor">{{dateTxt}}</tag-line>
              <template v-else>
              <c-date-time v-if="formData.type === 1 || formData.type === ''"
                           :disabled="formData.type === ''"
                           type="date"
                           placeholder="活动日期"
                           v-model="date"
                           :clearable="false"
                           @change="dateChange" />
              <c-date-time v-else
                           :disabled="formData.type === ''"
                           type="daterange"
                           placeholder="活动日期"
                           v-model="dates"
                           :clearable="false"
                           @change="dateChange" />
              </template>
            </FormItem>
            <FormItem>
              <tag-line title="开始时间" v-if="isEditor">{{formData.start_time}}</tag-line>
              <c-date-time placeholder="开始时间" type="time" format="HH:mm" v-model="formData.start_time" :clearable="false" v-else />
            </FormItem>
            <FormItem>
              <tag-line title="开始时间" v-if="isEditor">{{formData.telephone}}</tag-line>
              <Input v-model="formData.telephone" placeholder="活动联系电话" v-else @on-focus="isPhoneFocus = true" @on-blur="isPhoneFocus = false" />
              <div class="warnTxt" style="top: 4px; left: 106%" v-if="!phoneDisabled && !isPhoneFocus && formData.telephone !== ''"><span>请输入正确的电话！</span></div>
            </FormItem>
            <FormItem>
              <Input type="textarea"
                     ref="address"
                     :rows="4"
                     v-model="formData.address"
                     placeholder="活动地址"
                     :readonly="isEditor && errorData.address === ''"
                     :class="{'err-inp': isEditor && errorData.address !== ''}" />
              <a href="javascript:;" class="btn-geo" @click="openGeo">定位</a>
              <div class="warnTxt" v-if="isEditor && errorData.address !== ''"><span>{{errorData.address}}</span></div>
            </FormItem>
          </Form>
        </div>
        <div class="form-col col1">
          <Form class="form">
            <div class="form-title">上传海报</div>
            <FormItem>
              <upload-img v-model="formData.cover_image"
                          :error="isEditor && errorData.cover_image !== ''"
                          cropper
                          :fixedNumber="[750,800]"
                          title="宣传海报">
                <span slot="title">宣传海报</span>
              </upload-img>
              <div class="warnTxt" style="left: 40%;" v-if="isEditor && errorData.cover_image !== ''"><span>{{errorData.cover_image}}</span></div>
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
  <addr-picker ref="addrPicker" @confirm="getAddrData" />
</div>
</template>

<script type='es6'>
import ticket from '@/components/ticket'
import formBox from '@/components/formBox'
import cDateTime from '@/components/cDateTime'
import uploadImg from '../uploadImg'
import tagLine from '../tagLine'
import addrPicker from '@/components/addrPicker'
export default {
  name: 'app',
  props: {
    step: [Number, String],
    type: String
  },
  components: {
    ticket,
    formBox,
    cDateTime,
    uploadImg,
    tagLine,
    addrPicker
  },
  computed: {
    globalData () {
      return this.$store.state.globalData
    },
    cdnurl () {
      try {
        return this.$store.state.config.uploaddata.cdnurl
      } catch (e) {
        return ''
      }
    },
    errorData () {
      return this.$store.state.errorData
    },
    musicType () {
      return this.$store.getters.musicType
    },
    cityData () {
      return this.$store.state.config.citydata
    },
    cityTxt () {
      const city = this.cityData.find(i => i.id === this.formData.city_id)
      return city ? city.name : ''
    },
    typeTxt () {
      const item = this.typeList.find(i => i.value === this.formData.type)
      return item ? item.name : ''
    },
    dateTxt () {
      if (this.formData.type === '') {
        return ''
      } else if (this.formData.type === 1) {
        return this.date
      } else {
        return `${this.dates[0]}~${this.dates[1]}`
      }
    },
    ticketData () {
      const ci = this.formData.cover_image
      let url = new RegExp(this.cdnurl).test(ci) ? ci : `${this.cdnurl}${ci}`
      if (ci === '') {
        url = ''
      }
      return {
        start_date: this.formData.start_date,
        end_date: this.formData.end_date,
        type: this.formData.type,
        name: this.formData.name,
        cover_image: url,
        organizer_name: this.globalData.merchant.organizer_name,
        logo: this.globalData.merchant.logo
      }
    },
    phoneDisabled () {
      const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      return reg.test(this.formData.telephone)
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
      if (!this.phoneDisabled) return true
      return false
    },
    isEditor () {
      return this.type === 'modify'
    }
  },
  data () {
    return {
      typeList: [
        { value: 1, name: '单日' },
        { value: 2, name: '多日' },
        { value: 3, name: '跨月多日' }
      ],
      date: '',
      dates: [],
      musicTypeText: '',
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
        cover_image: '',
        longitude: '',
        latitude: ''
      },
      isPhoneFocus: false
    }
  },
  methods: {
    handleNext () {
      this.$emit('change', 'next')
    },
    dateChange (e) {
      if (this.formData.type === 1) {
        this.formData.start_date = e
      } else {
        this.formData.start_date = e[0]
        this.formData.end_date = e[1]
      }
    },
    typeChange () {
      this.date = ''
      this.formData.start_date = ''
      this.formData.end_date = ''
      this.dates = []
    },
    getParams () {
      const params = { ...this.formData }
      if (params.type === 1) {
        delete params.end_date
      }
      return params
    },
    setData (record) {
      for (const key in this.formData) {
        this.formData[key] = record[key]
      }
      this.formData.cover_image = record.cover_image.replace(this.cdnurl, '')
      this.$nextTick(() => {
        this.date = record.start_date
        this.dates = [record.start_date, record.end_date]
        this.musicTypeText = record.music_type_text
      })
    },
    openGeo () {
      this.$refs.addrPicker.show()
    },
    getAddrData (data) {
      console.log('getAddrData', data)
      this.formData.address = data.address
      this.formData.latitude = data.location.lat
      this.formData.longitude = data.location.lng
      console.log(this.formData)
      this.$refs.address.focus()
    }
  }
}
</script>

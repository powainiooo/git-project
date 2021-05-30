<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.borderR
  position relative
  &:after
    content ''
    width 1px
    height 100%
    abTL(0, auto)
    right -26px
    background-color #EEEEEF
    z-index 0
.acti-item
  .index
    height 25px;
  .btn-close
    abTL(20px, 35px)
  .txt
    margin-right 10px
    margin-left 15px
    size(210px, 90px)
    textarea.ivu-input
      height 100%
</style>

<template>
<div class="center step-frame">
  <form-box :width="900" :height="280" :index="step">
    <template slot="button">
    <Button size="small" v-if="step !== 1" @click="handlePrev">上一步</Button>
    <Button size="small" @click="handleNext">完成并提交审核</Button>
    </template>
    <div class="form-grid">
      <div class="form-col">
        <Form class="form borderR">
          <div class="form-title" style="margin-bottom: 0;">上传艺人图片（选填）</div>
          <div class="form-cell pr"
               v-for="(item, index) in artistList"
               :key="index">
            <div>
              <a href="javascript:;"
                 class="btn-close"
                 v-if="index > 0"
                 @click="delArtist(index)">
                <img src="@/assets/img/ico-del.png" width="20" />
              </a>
            </div>
            <div style="margin-bottom: 10px;">
              <Input placeholder="艺人姓名"
                     v-model="item.content"
                     :readonly="isEditor && errorData.artist_content && errorData.artist_content[index] && errorData.artist_content[index] === ''"
                     :class="{'err-inp': isEditor && errorData.artist_content && errorData.artist_content[index] && errorData.artist_content[index] !== ''}" />
            </div>
            <upload-img width="115"
                        cropper
                        :fixedNumber="[300,235]"
                        v-model="item.image"
                        :error="isEditor && errorData.artist_image && errorData.artist_image[index] && errorData.artist_image[index] !== ''">
              <span slot="title">艺人照片</span>
              <span slot="hint">尺寸为<br/>300*236 的 JPG</span>
            </upload-img>
            <div class="warnTxt" style="left: 50%; top: 68px;" v-if="isEditor && errorData.artist_image && errorData.artist_image[index] && errorData.artist_image[index] !== ''"><span>{{errorData.artist_image[index]}}</span></div>
          </div>
          <a href="javascript:;" class="btn-add" @click="addArtist" v-if="!isEditor"><img src="@/assets/img/ico-add.png" /></a>
        </Form>
      </div>
      <div class="form-col col2">
        <Form class="form">
          <div class="form-title" style="margin-bottom: 0;">活动详情（选填）</div>
          <div class="form-cell center acti-item pr"
               v-for="(item, index) in activityList"
               :key="index">
            <img :src="getIndexSrc(index)" class="index" />
            <a href="javascript:;"
               class="btn-close"
               v-if="index > 0"
               @click="delActi(index)">
              <img src="@/assets/img/ico-del.png" width="20" />
            </a>
            <Input type="textarea"
                   class="txt"
                   placeholder="填写详情（200字内）"
                   v-model="item.content"
                   :readonly="isEditor && errorData.intro_content && errorData.intro_content[index] && errorData.intro_content[index] === ''"
                   :class="{'err-inp': isEditor && errorData.intro_content && errorData.intro_content[index] && errorData.intro_content[index] !== ''}"/>
            <upload-img width="170"
                        cropper
                        :fixedNumber="[634,334]"
                        v-model="item.image"
                        :error="isEditor && errorData.intro_image && errorData.intro_image[index] && errorData.intro_image[index] !== ''">
              <span slot="title">活动宣传图片</span>
              <span slot="hint">尺寸为<br/>634*334px 的 JPG</span>
            </upload-img>
            <div class="warnTxt"
                 style="left: 46%; top: 18px;"
                 v-if="isEditor && errorData.intro_content && errorData.intro_content[index] && errorData.intro_content[index] !== ''">
              <span>{{errorData.intro_content[index]}}</span>
            </div>
             <div class="warnTxt"
                  style="left: 78%; top: 18px;"
                  v-if="isEditor && errorData.intro_image && errorData.intro_image[index] && errorData.intro_image[index] !== ''">
               <span>{{errorData.intro_image[index]}}</span>
             </div>
          </div>
          <a href="javascript:;" class="btn-add" @click="addActivity" v-if="!isEditor"><img src="@/assets/img/ico-add.png" /></a>
        </Form>
      </div>
    </div>
  </form-box>
</div>
</template>

<script type='es6'>
import formBox from '@/components/formBox'
import uploadImg from '../uploadImg'
export default {
  name: 'app',
  props: {
    step: [Number, String],
    type: String
  },
  components: {
    formBox,
    uploadImg
  },
  data () {
    return {
      artistList: [
        {
          content: '',
          image: ''
        }
      ],
      activityList: [
        {
          content: '',
          image: ''
        }
      ]
    }
  },
  computed: {
    errorData () {
      return this.$store.state.errorData
    },
    cdnurl () {
      return this.$store.state.config.uploaddata.cdnurl
    },
    isEditor () {
      return this.type === 'modify'
    }
  },
  methods: {
    handlePrev () {
      this.$emit('change', 'back')
    },
    handleNext () {
      this.$emit('change', 'submit')
    },
    addArtist () {
      this.artistList.push({
        content: '',
        image: ''
      })
    },
    addActivity () {
      this.activityList.push({
        content: '',
        image: ''
      })
    },
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + (index + 1) + '.png')
    },
    getParams () {
      const art = []
      for (const item of this.artistList) {
        art.push({
          content: item.content,
          image: item.image.replace(this.cdnurl, '')
        })
      }
      const ac = []
      for (const item of this.activityList) {
        ac.push({
          content: item.content,
          image: item.image.replace(this.cdnurl, '')
        })
      }
      return {
        artists: JSON.stringify(art),
        intros: JSON.stringify(ac)
      }
    },
    setData (record) {
      this.artistList = record.artist_list
      this.activityList = record.intro_list
    },
    delArtist (index) {
      this.artistList.splice(index, 1)
    },
    delActi (index) {
      this.activityList.splice(index, 1)
    }
  }
}
</script>

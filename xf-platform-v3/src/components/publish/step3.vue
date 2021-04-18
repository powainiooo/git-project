<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.acti-item
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
        <Form class="form">
          <div class="form-title" style="margin-bottom: 0;">上传艺人图片（选填）</div>
          <div class="form-cell"
               v-for="(item, index) in artistList"
               :key="index">
            <div style="margin-bottom: 10px;">
              <Input v-model="item.content" placeholder="艺人姓名" />
            </div>
            <upload-img width="115" v-model="item.image">
              <span slot="title">艺人照片</span>
              <span slot="hint">尺寸为<br/>450*353px 的 JPG</span>
            </upload-img>
          </div>
          <a href="javascript:;" class="btn-add" @click="addArtist"><img src="@/assets/img/ico-add.png" /></a>
        </Form>
      </div>
      <div class="form-col col2">
        <Form class="form">
          <div class="form-title" style="margin-bottom: 0;">活动详情（选填）</div>
          <div class="form-cell center acti-item"
               v-for="(item, index) in activityList"
               :key="index">
            <img :src="getIndexSrc(index)" />
            <Input type="textarea" class="txt" placeholder="填写详情（200字内）" v-model="item.content"/>
            <upload-img width="170" v-model="item.image">
              <span slot="title">活动宣传图片</span>
              <span slot="hint">尺寸为<br/>950*500px 的 JPG</span>
            </upload-img>
          </div>
          <a href="javascript:;" class="btn-add" @click="addActivity"><img src="@/assets/img/ico-add.png" /></a>
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
    step: [Number, String]
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
      return {
        artists: JSON.stringify(this.artistList),
        intros: JSON.stringify(this.activityList)
      }
    }
  }
}
</script>

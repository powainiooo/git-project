<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"
.goods-box
  .btn1
    width 90px; background-color #E8D1B9; border-color #E8D1B9; color #ffffff;
    &:hover
      background-color #E8D1B9;
  .specs-scroll
    margin 0 60px; overflow-x auto; padding-bottom 20px;
  .specs-box
    size(730px, auto); background-color #F4F3F3; border-radius 20px; display flex;
    &-col1
      width 295px; border-right 1px solid #E6E6E6;
    &-col2
      size(140px, 64px); border-bottom 1px solid #E6E6E6; center();
    .specs-name
      padding 15px; border-bottom 1px solid #E6E6E6; between(); justify-content flex-end;
      .min-txt
        width 235px; margin-left 15px;
      .btn-close
        size(16px, 16px)
    .specs-list
      margin 15px; border-bottom 1px solid #E6E6E6;
      li
        between(); justify-content flex-end; margin-bottom 15px; position relative;
        .unit
          font-size 12px; color #c8c9ca; abTR(8px, 10px);
        .min-txt
          width 160px;
        .btn-close
          size(16px, 16px)

  .c-form
    .warn-hint
      abTR(6px, -30px)
</style>

<template>
<float-box v-model="visible" :title="title" :height="75" :left="380" :right="90">
  <div class="acenter" slot="btns">
    <Button :disabled="btnDisabled" @click="handleSave" :loading="isAjax">确认保存</Button>
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="goods-box">
    <Form ref="form" :model="formData">
      <Row>
        <Col span="6" style="border-right: 1px solid #F2F2F2;">
          <div class="c-form mt30">
            <div class="c-c8 mb20 ml10">产品基本信息</div>
            <FormItem>
              <Select placeholder="产品分类" v-model="formData.cid" :disabled="isModify && !errData.cid">
                <Option v-for="item in cateList" :key="item.cid" :value="item.cid">{{item.cname}}</Option>
              </Select>
              <div class="warn-hint" v-if="isModify && errData.cid">
                <Poptip trigger="hover" placement="right" :content="errData.cid" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <FormItem>
              <Input placeholder="产品名称" v-model="formData.title" :disabled="isModify && !errData.title">
                <span slot="prepend" v-if="isEdit">产品名称</span>
              </Input>
              <div class="warn-hint" v-if="isModify && errData.title">
                <Poptip trigger="hover" placement="right" :content="errData.title" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="4" placeholder="产品介绍" v-model="formData.content" :disabled="isModify && !errData.content" />
              <div class="warn-hint" v-if="isModify && errData.content">
                <Poptip trigger="hover" placement="right" :content="errData.content" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <FormItem>
              <div class="acenter">
                <label class="c-c8 mr20"><input type="radio" class="cb mr5" :value="0" v-model="formData.date_type" />长期售卖</label>
                <label class="c-c8"><input type="radio" class="cb mr5" :value="1" v-model="formData.date_type" />按时段售卖</label>
              </div>
            </FormItem>
            <FormItem v-if="formData.date_type === 1">
              <c-date-time type="daterange"
                           placeholder="售卖时间段"
                           v-model="dates"
                           @change="dateChange"
                           :disabled="isModify && !errData.date_start" />
              <div class="warn-hint" v-if="isModify && errData.date_start">
                <Poptip trigger="hover" placement="right" :content="errData.date_start" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <FormItem>
              <Input placeholder="价格" v-model="formData.price" :disabled="isModify && !errData.price">
                <span slot="prepend" v-if="isEdit">价格</span>
                <span slot="append">元</span>
              </Input>
              <div class="warn-hint" v-if="isModify && errData.price">
                <Poptip trigger="hover" placement="right" :content="errData.price" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <FormItem>
              <Input placeholder="库存" v-model="formData.store_nums" :disabled="isModify && !errData.store_nums">
                <span slot="prepend" v-if="isEdit">库存</span>
                <span slot="append">份</span>
              </Input>
              <div class="warn-hint" v-if="isModify && errData.store_nums">
                <Poptip trigger="hover" placement="right" :content="errData.store_nums" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <FormItem>
              <Input placeholder="制作时间" v-model="formData.make_time" :disabled="isModify && !errData.make_time">
                <span slot="prepend" v-if="isEdit">制作时间</span>
                <span slot="append">分钟</span>
              </Input>
              <div class="warn-hint" v-if="isModify && errData.make_time">
                <Poptip trigger="hover" placement="right" :content="errData.make_time" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </FormItem>
            <div class="pr">
              <FormItem v-for="(item, index) in images" :key="index">
                <upload-img v-model="images[index]"
                            cropper
                            :fixedNumber="[1050, 500]">
                  <button class="btn-close btn-close-min mb10" slot="btn" @click="delImage(index)" v-if="images.length > 1"><img src="@/assets/img/close.png" /></button>
                  <span slot="title">产品图</span>
                  <span slot="hint">尺寸1050px*500px</span>
                </upload-img>
              </FormItem>
              <div class="warn-hint" v-if="isModify && errData.images">
                <Poptip trigger="hover" placement="right" :content="errData.images" class="warn-pop">
                  <button class="btn-warn">!</button>
                </Poptip>
              </div>
            </div>
            <FormItem v-if="!isModify">
              <Button size="small" class="btn1" @click="newImgs" v-if="images.length < 6">添加详情图</Button>
            </FormItem>
          </div>
        </Col>
        <Col span="18">
          <div class="c-c8 mb20 mt30 ml75">设置规格</div>
          <div class="specs-scroll">
            <div class="specs-box" :style="{width: boxWidth}">
              <div class="specs-box-col1" v-for="(specs, i) in specsList" :key="i">
                <div class="specs-name">
                  <a href="javascript:;" class="btn-close" @click="delSpecs(i)" v-if="i > 0"><img src="@/assets/img/close.png" /></a>
                  <Input placeholder="填写规格分类名称" maxlength="8" show-word-limit class="min-txt" v-model="specs.attr_name" :disabled="isModify" />
                </div>
                <ul class="specs-list">
                  <li v-for="(child, j) in specs.children" :key="j">
                    <a href="javascript:;" class="btn-close" @click="delSpecsItem(i, j)" v-if="j > 0 && !isModify"><img src="@/assets/img/close.png" /></a>
                    <Input placeholder="填写规格选项" maxlength="8" show-word-limit class="min-txt mr15 ml15" v-model="child.attr_name" :disabled="isModify" />
                    <Input placeholder="0" class="min-txt" style="width: 60px;" v-model="child.price" :disabled="isModify" />
                    <span class="unit">元</span>
                  </li>
                </ul>
                <div class="tc mb15"><Button size="small" class="btn1" @click="newSpecsItem(i)" :disabled="isModify">添加规格选项</Button></div>
              </div>
              <div class="specs-box-col2">
                <Button size="small" class="btn1" @click="newSpecs" :disabled="isModify">添加规格分类</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from '@/components/common/floatBox'
import cDateTime from '@/components/common/cDateTime'
import uploadImg from '@/components/common/uploadImg'
import { getAction, postAction } from '@/utils'

export default {
  name: 'app',
  components: {
    floatBox,
    cDateTime,
    uploadImg
  },
  computed: {
    btnDisabled () {
      for (const key in this.formData) {
        if (key !== 'cover' && key !== 'date_start' && key !== 'date_end' && this.formData[key] === '') {
          return true
        }
      }
      if (this.formData.date_type === 1 && this.formData.date_start === '' && this.formData.date_end === '') {
        return true
      }

      for (const i of this.images) {
        if (i === '') {
          return true
        }
      }
      for (const i of this.specsList) {
        if (i.attr_name === '') {
          return true
        }
        for (const j of i.children) {
          if (j.attr_name === '' || j.price === '') {
            return true
          }
        }
      }
      return false
    },
    boxWidth () {
      return (this.specsList.length * 295 + 140) + 'px'
    },
    title () {
      return this.isEdit ? '修改产品' : '添加产品'
    }
  },
  data () {
    return {
      isEdit: false,
      visible: false,
      cateList: [],
      dates: [],
      images: [''],
      formData: {
        cid: '',
        title: '',
        cover: '',
        price: '',
        store_nums: '',
        content: '',
        make_time: '',
        date_type: 0,
        date_start: '',
        date_end: ''
      },
      specsList: [{
        attr_name: '',
        children: [
          { attr_name: '', price: 0 }
        ]
      }],
      errData: {},
      isModify: false,
      id: '',
      isAjax: false
    }
  },
  methods: {
    getCateData () {
      getAction('/shopapi/goods/cate/index/data').then(res => {
        if (res.code === 0) {
          this.cateList = res.data
        }
      })
    },
    show () {
      this.visible = true
      this.isEdit = false
      this.isModify = false
      this.reset()
      this.getCateData()
    },
    edit (id) {
      this.isModify = false
      this.id = id
      this.getCateData()
      getAction('/shopapi/goods/show', {
        id
      }).then(res => {
        if (res.code === 0) {
          this.visible = true
          this.isEdit = true
          const data = res.data
          for (const key in this.formData) {
            this.formData[key] = data.goods[key]
          }
          this.dates = [data.goods.date_start, data.goods.date_end]
          this.images = data.goods.images
          this.specsList = data.attrs
          const err = {}
          for (const item of data.refuse) {
            err[item.field] = item.content
          }
          this.errData = err
        }
      })
    },
    modify (id) {
      this.edit(id)
      this.isModify = true
    },
    handleCancel () {
      this.visible = false
    },
    newSpecs () {
      this.specsList.push({
        attr_name: '',
        children: [
          { attr_name: '', price: 0 }
        ]
      })
    },
    delSpecs (i) {
      this.specsList.splice(i, 1)
    },
    newSpecsItem (i) {
      this.specsList[i].children.push({
        attr_name: '',
        price: 0
      })
    },
    delSpecsItem (i, j) {
      this.specsList[i].children.splice(j, 1)
    },
    newImgs () {
      this.images.push('')
    },
    dateChange (e) {
      this.formData.date_start = e[0]
      this.formData.date_end = e[1]
    },
    handleSave () {
      if (this.isAjax) return
      const params = { ...this.formData }
      params.images = this.images
      params.attrs = [...this.specsList]
      params.cover = this.images[0]
      console.log(params)
      this.isAjax = true
      let url = '/shopapi/goods/store'
      if (this.isEdit) {
        url = '/shopapi/goods/update'
        params.id = this.id
      }
      postAction(url, params).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.$emit('ok')
          this.visible = false
          this.reset()
        }
      })
    },
    reset () {
      this.formData = {
        cid: '',
        title: '',
        cover: '',
        price: '',
        store_nums: '',
        content: '',
        make_time: '',
        date_type: 0,
        date_start: '',
        date_end: ''
      }
      this.dates = []
      this.images = ['']
      this.specsList = [{
        name: '',
        children: [
          { name: '', price: 0 }
        ]
      }]
      this.errData = {}
    },
    delImage (index) {
      this.images.splice(index, 1)
    }
  }
}
</script>

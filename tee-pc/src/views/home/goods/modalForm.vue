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
    width 730px; background-color #F4F3F3; border-radius 20px; display flex; align-items flex-start;
    &-col1
      width 295px; border-right 1px solid #E6E6E6;
    &-col2
      size(140px, 64px); border-bottom 1px solid #E6E6E6; center();
    .specs-name
      padding 15px; border-bottom 1px solid #E6E6E6; between();
      .min-txt
        width 235px;
      .btn-close
        size(16px, 16px)
    .specs-list
      margin 15px; border-bottom 1px solid #E6E6E6;
      li
        between(); margin-bottom 15px; position relative;
        .unit
          font-size 12px; color #c8c9ca; abTR(8px, 10px);
        .min-txt
          width 160px;
        .btn-close
          size(16px, 16px)

</style>

<template>
<float-box v-model="visible" :title="title" :height="75" :left="380" :right="90">
  <div class="acenter" slot="btns">
    <Button :disabled="btnDisabled" @click="handleSave" :loading="isAjax">确认保存</Button>
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="goods-box">
    <Form ref="form" :model="formData" :rules="ruleValidate">
      <Row>
        <Col span="6" style="border-right: 1px solid #F2F2F2;">
          <div class="c-form mt30">
            <div class="c-c8 mb20 ml10">产品基本信息</div>
            <FormItem>
              <Select placeholder="产品分类" v-model="formData.cid">
                <Option v-for="item in cateList" :key="item.cid" :value="item.cid">{{item.cname}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input placeholder="产品名称" v-model="formData.title" />
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="4" placeholder="产品介绍" v-model="formData.content" />
            </FormItem>
            <FormItem>
              <c-date-time type="daterange" placeholder="售卖时间段" v-model="dates" @change="dateChange" />
            </FormItem>
            <FormItem>
              <Input placeholder="价格" v-model="formData.price"><span slot="append">元</span></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="库存" v-model="formData.store_nums" />
            </FormItem>
            <FormItem>
              <Input placeholder="制作时间" v-model="formData.make_time"><span slot="append">分钟</span></Input>
            </FormItem>
            <FormItem v-for="(item, index) in images" :key="index">
              <upload-img v-model="images[index]">
                <span slot="title">产品图</span>
                <span slot="hint">尺寸1050px*500px</span>
              </upload-img>
            </FormItem>
            <FormItem>
              <Button size="small" class="btn1" @click="newImgs">添加详情图</Button>
            </FormItem>
          </div>
        </Col>
        <Col span="18">
          <div class="c-c8 mb20 mt30 ml75">设置规格</div>
          <div class="specs-scroll">
            <div class="specs-box" :style="{width: boxWidth}">
              <div class="specs-box-col1" v-for="(specs, i) in specsList" :key="i">
                <div class="specs-name">
                  <a href="javascript:;" class="btn-close" @click="delSpecs(i)"><img src="@/assets/img/close.png" /></a>
                  <Input maxlength="8" show-word-limit class="min-txt" v-model="specs.name" />
                </div>
                <ul class="specs-list">
                  <li v-for="(child, j) in specs.children" :key="j">
                    <a href="javascript:;" class="btn-close" @click="delSpecsItem(i, j)"><img src="@/assets/img/close.png" /></a>
                    <Input maxlength="8" show-word-limit class="min-txt" v-model="child.name" />
                    <Input placeholder="0" class="min-txt" style="width: 60px;" v-model="child.price" />
                    <span class="unit">元</span>
                  </li>
                </ul>
                <div class="tc mb15"><Button size="small" class="btn1" @click="newSpecsItem(i)">添加规格选项</Button></div>
              </div>
              <div class="specs-box-col2">
                <Button size="small" class="btn1" @click="newSpecs">添加规格分类</Button>
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
      return false
    },
    boxWidth () {
      return (this.specsList.length * 295 + 140) + 'px'
    }
  },
  data () {
    return {
      title: '添加产品',
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
        date_start: '',
        date_end: ''
      },
      ruleValidate: {
        xxx8: [
          { required: true, trigger: 'blur', validator: this.idsValidator }
        ],
        xxx9: [
          { required: true, trigger: 'blur', validator: this.phoneValidator }
        ]
      },
      specsList: [{
        name: '',
        children: [
          { name: '', price: '' }
        ]
      }],
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
      this.getCateData()
    },
    handleCancel () {
      this.visible = false
    },
    newSpecs () {
      this.specsList.push({
        name: '',
        children: [
          { name: '', price: '' }
        ]
      })
    },
    delSpecs (i) {
      this.specsList.splice(i, 1)
    },
    newSpecsItem (i) {
      this.specsList[i].children.push({
        name: '',
        price: ''
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
      // for (let i = 0; i < this.images.length; i++) {
      //   params[`images[${i}]`] = this.images[i]
      // }
      params.images = this.images
      const sp = this.specsList
      // for (let i = 0; i < sp.length; i++) {
      //   params[`attrs[${i}][attr_name]`] = sp[i].name
      //   for (let j = 0; j < sp[i].children.length; j++) {
      //     params[`attrs[${i}][children][${j}][attr_name]`] = sp[i].children[j].name
      //     params[`attrs[${i}][children][${j}][price]`] = sp[i].children[j].price
      //   }
      // }
      params.attrs = []
      for (const i of this.specsList) {
        const list = []
        for (const j of i.children) {
          list.push({
            attr_name: j.name,
            price: j.price
          })
        }
        params.attrs.push({
          attr_name: i.name,
          children: list
        })
      }
      params.cover = this.images[0]
      console.log(params)
      this.isAjax = true
      postAction('/shopapi/goods/store', params).then(res => {
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
        date_start: '',
        date_end: ''
      }
      this.dates = []
      this.images = []
      this.specsList = [{
        name: '',
        children: [
          { name: '', price: '' }
        ]
      }]
    }
  }
}
</script>

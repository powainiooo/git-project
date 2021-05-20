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
    <Button :disabled="btnDisabled" @click="handleSave">确认保存</Button>
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="goods-box">
    <Form ref="form" :model="formData" :rules="ruleValidate">
      <Row>
        <Col span="6" style="border-right: 1px solid #F2F2F2;">
          <div class="c-form mt30">
            <div class="c-c8 mb20 ml15">产品基本信息</div>
            <FormItem>
              <p class="c-c8 f12 ml15 mb5" style="line-height: 1;">产品名称</p>
              <Input placeholder="产品名称" v-model="formData.xxx1" disabled />
            </FormItem>
            <FormItem>
              <upload-img v-model="formData.xxx5">
                <span slot="title">产品图</span>
              </upload-img>
            </FormItem>
          </div>
        </Col>
        <Col span="18">
          <div class="c-c8 mb20 mt30 ml75">设置规格</div>
          <div class="specs-scroll">
            <div class="specs-box" :style="{width: boxWidth}">
              <div class="specs-box-col1" v-for="(specs, index) in specsList" :key="index">
                <div class="specs-name">
                  <a href="javascript:;" class="btn-close"><img src="@/assets/img/close.png" /></a>
                  <Input maxlength="8" show-word-limit class="min-txt" />
                </div>
                <ul class="specs-list">
                  <li>
                    <a href="javascript:;" class="btn-close"><img src="@/assets/img/close.png" /></a>
                    <Input maxlength="8" show-word-limit class="min-txt" />
                    <Input placeholder="0" class="min-txt" style="width: 60px;" />
                    <span class="unit">元</span>
                  </li>
                </ul>
                <div class="tc mb15"><Button size="min" class="btn1">添加规格选项</Button></div>
              </div>
              <div class="specs-box-col2">
                <Button size="min" class="btn1">添加规格分类</Button>
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
      formData: {
        xxx1: '',
        xxx2: [],
        xxx3: '',
        xxx4: '',
        xxx5: '',
        xxx6: '',
        xxx7: '',
        xxx8: '',
        xxx9: '',
        xxx10: '',
        xxx11: '',
        xxx12: '',
        xxx13: ''
      },
      ruleValidate: {
        xxx8: [
          { required: true, trigger: 'blur', validator: this.idsValidator }
        ],
        xxx9: [
          { required: true, trigger: 'blur', validator: this.phoneValidator }
        ]
      },
      specsList: [{}]
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleSave () {}
  }
}
</script>

<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"
.goods-box
  .btn1
    width 90px; background-color #E8D1B9; border-color #E8D1B9; color #ffffff;
    &:hover
      background-color #E8D1B9;
  .specs-scroll
    margin 0 60px; overflow-x auto; padding-bottom 20px;
  .specs2-box
    width 730px; background-color #ffffff; border-radius 20px; display flex; align-items flex-start;
  .specs2-item
    width 275px; border-right 1px solid #F2F2F2;
    &:last-child
      border-right none;
    &-col
      padding 14px 0; border-bottom 1px solid #F2F2F2; margin-bottom 14px;
      .cb
        margin-left 15px; margin-right 10px;
      .min-txt
        width 160px;
    &-col2
      margin-bottom 15px; acenter(); position relative;
      .cb
        margin-left 15px; margin-right 10px;
      .min-txt
        width 140px; margin-right 15px;
      .unit
        font-size 12px; color #C8C9CA; abTR(8px, 25px)
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
          <div class="c-c8 mb20 mt30 ml75">选择规格</div>
          <div class="specs-scroll">
            <div class="specs2-box" :style="{width: boxWidth}">
              <div class="specs2-item" v-for="(specs, index) in specsList" :key="index">

                <div class="specs2-item-col">
                  <p class="f12 c-c8 ml60 mb5">规格选项</p>
                  <div class="acenter">
                    <input type="checkbox" class="cb" />
                    <Input class="min-txt" disabled />
                  </div>
                </div>
                <div class="flex mb5">
                  <p class="f12 c-c8 ml60">规格选项</p>
                  <p class="f12 c-c8 ml110">库存</p>
                </div>
                <div class="specs2-item-col2">
                  <input type="checkbox" class="cb" />
                  <Input class="min-txt" disabled />
                  <Input class="min-txt" style="width: 60px;" />
                  <span class="unit">元</span>
                </div>
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
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'app',
  components: {
    floatBox,
    uploadImg
  },
  computed: {
    btnDisabled () {
      return false
    },
    boxWidth () {
      return (this.specsList.length * 275) + 'px'
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

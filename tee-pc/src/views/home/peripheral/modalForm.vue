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
    <Button :disabled="btnDisabled" :loading="isAjax" @click="handleSave">确认保存</Button>
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="goods-box">
    <Form ref="form" :model="formData">
      <Row>
        <Col span="6" style="border-right: 1px solid #F2F2F2;">
          <div class="c-form mt30">
            <div class="c-c8 mb20 ml15">产品基本信息</div>
            <FormItem>
              <p class="c-c8 f12 ml15 mb5" style="line-height: 1;">产品名称</p>
              <Input placeholder="产品名称" v-model="formData.title" disabled />
            </FormItem>
            <FormItem>
              <upload-img v-model="formData.cover">
                <span slot="title">产品图</span>
              </upload-img>
            </FormItem>
          </div>
        </Col>
        <Col span="18">
          <div class="c-c8 mb20 mt30 ml75">选择规格</div>
          <div class="specs-scroll">
            <div class="specs2-box" :style="{width: boxWidth}">
              <div class="specs2-item">

<!--                <div class="specs2-item-col">-->
<!--                  <p class="f12 c-c8 ml60 mb5">规格选项</p>-->
<!--                  <div class="acenter">-->
<!--                    <input type="checkbox" class="cb" />-->
<!--                    <Input class="min-txt" disabled />-->
<!--                  </div>-->
<!--                </div>-->
                <div class="flex mb5 mt10">
                  <p class="f12 c-c8 ml60">规格选项</p>
                  <p class="f12 c-c8 ml110">库存</p>
                </div>
                <div class="specs2-item-col2" v-for="item in specsList" :key="item.attr_ids">
                  <input type="checkbox" class="cb" v-model="item.checked" />
                  <Input class="min-txt" disabled v-model="item.attr_name" />
                  <Input class="min-txt" style="width: 60px;" v-model="item.store_nums" v-if="item.checked" />
                  <span class="unit" v-if="item.checked">个</span>
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
import { getAction, postAction } from '@/utils'
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
      return (1 * 275) + 'px'
    }
  },
  data () {
    return {
      title: '添加产品',
      visible: false,
      formData: {},
      specsList: [],
      id: '',
      isAjax: false
    }
  },
  methods: {
    getDetailData (id) {
      this.id = id
      getAction('/shopapi/shop/nearby/show', {
        nearby_id: id
      }).then(res => {
        if (res.code === 0) {
          this.formData = res.data.nearby
          const attrs = res.data.attrs
          const list = []
          for (const i in res.data.attrs) {
            list.push({
              attr_ids: i,
              attr_name: attrs[i].attr_name,
              checked: attrs[i].checked === 1,
              store_nums: attrs[i].store_nums
            })
          }
          this.specsList = list
        }
      })
    },
    show (id) {
      this.visible = true
      this.getDetailData(id)
    },
    handleCancel () {
      this.visible = false
    },
    handleSave () {
      if (this.isAjax) return
      const params = {
        nearby_id: this.id,
        attrs: {}
      }
      for (const i of this.specsList) {
        params.attrs[i.attr_ids] = {
          checked: i.checked ? 1 : 0,
          store_nums: i.store_nums
        }
      }
      this.isAjax = true
      postAction('/shopapi/shop/nearby/save', params).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.$emit('ok')
          this.visible = false
        }
      })
    }
  }
}
</script>

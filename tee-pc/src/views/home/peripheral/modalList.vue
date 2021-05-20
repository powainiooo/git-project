<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"

</style>

<template>
<float-box v-model="visible" :title="title" :height="75" :left="380" :right="90">
  <div class="acenter" slot="btns">
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="operates-line ml25 mr25 mt30">
    <Select class="c-select mr20" placeholder="产品分类" style="width: 130px; margin-left: -20px;">
      <Option>123</Option>
    </Select>
  </div>
  <div class="tee-tables mt30 ml25 mr25">
    <table>
      <colgroup>
        <col width="115" />
        <col width="160" />
        <col width="110" />
        <col />
        <col width="90" />
      </colgroup>
      <thead>
      <tr>
        <th>产品分类</th>
        <th>产品名称</th>
        <th>产品图</th>
        <th>规格</th>
        <th style="text-align: center;"><div class="pr20">操作</div></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><div>新品推荐</div></td>
        <td><div>乌龙茶</div></td>
        <td>
          <div style="margin-top: -8px;">
            <div class="img-box"><img src="@/assets/img/img2.png" /></div>
          </div>
        </td>
        <td>
          <div>
            <p>黄色-数字7黄色-数字7</p>
          </div>
        </td>
        <td>
          <div class="">
            <Button size="min" class="ml10 bg-main" @click="openDetail">添加</Button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from '@/components/common/floatBox'
export default {
  name: 'app',
  components: {
    floatBox
  },
  data () {
    return {
      title: '添加产品',
      visible: false,
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
    openDetail () {
      this.$emit('detail')
    }
  }
}
</script>

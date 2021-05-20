<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"
.goods-cate-box
  .tee-tables
    border-bottom 1px solid #E2E2E2; padding-bottom 40px; margin-bottom 40px;
  .new-line
    margin 0 50px; height 50px; background-color #F4F3F3; border-radius 12px; between();
    .rank
      width 90px; padding-left 30px;
    .min-txt
      width 200px;
</style>

<template>
<float-box v-model="visible" :title="title" :height="75" :left="380" :right="90">
  <div class="acenter" slot="btns">
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="goods-cate-box">
    <div class="tee-tables tee-tables-min mt30 ml50 mr50">
      <table>
        <colgroup>
          <col width="90" />
          <col />
          <col width="200" />
        </colgroup>
        <thead>
        <tr>
          <th>序号</th>
          <th>产品分类</th>
          <th style="text-align: center;"><div class="pr20">操作</div></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><div>1</div></td>
          <td><div>乌龙茶</div></td>
          <td>
            <div class="flex">
              <a href="javascript:;" class="btn-circle"><img src="@/assets/img/up.png" width="9" /></a>
              <a href="javascript:;" class="btn-circle ml10"><img src="@/assets/img/down.png" width="9" /></a>
              <Button size="min" class="ml10">编辑</Button>
              <Button size="min" class="ml10">删除</Button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="new-line">
      <div class="acenter">
        <div class="rank">1</div>
        <Input placeholder="填写分类名称" class="min-txt" />
      </div>
      <div class="pr30">
        <Button size="min" class="bg-main">确认添加</Button>
      </div>
    </div>
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
  computed: {},
  data () {
    return {
      title: '添加产品',
      visible: false
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

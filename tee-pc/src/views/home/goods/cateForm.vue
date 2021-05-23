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
        <tr v-for="(item, index) in cateList" :key="item.cid">
          <td><div>1</div></td>
          <td><div>{{item.cname}}</div></td>
          <td>
            <div class="end">
              <a href="javascript:;" class="btn-circle" v-if="index !== 0" @click="handleRank(item.cid, 'up')"><img src="@/assets/img/up.png" width="9" /></a>
              <a href="javascript:;" class="btn-circle ml10" v-if="index !== cateList.length - 1" @click="handleRank(item.cid, 'down')"><img src="@/assets/img/down.png" width="9" /></a>
              <Button size="small" class="ml10" @click="handleEdit(item)">编辑</Button>
              <Poptip title="确认删除？" confirm @on-ok="handleDel(item.cid)">
                <Button size="small" class="ml10 bg-gray">删除</Button>
              </Poptip>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="new-line">
      <div class="acenter">
        <div class="rank">1</div>
        <Input placeholder="填写分类名称" class="min-txt" v-model="keyword" />
      </div>
      <div class="pr30">
        <Button size="small" class="bg-main" @click="handleSubmit">确认{{isEdit ? '修改' : '添加'}}</Button>
      </div>
    </div>
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from '@/components/common/floatBox'
import { getAction, postAction } from '@/utils'
export default {
  name: 'app',
  components: {
    floatBox
  },
  data () {
    return {
      title: '添加产品',
      visible: false,
      cateList: [],
      isEdit: false,
      keyword: '',
      eidtId: '',
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
      this.$emit('close')
    },
    handleSubmit () {
      if (this.isAjax) return
      const params = {
        cname: this.keyword
      }
      let url = '/shopapi/goods/cate/store'
      if (this.isEdit) {
        params.cid = this.eidtId
        url = '/shopapi/goods/cate/update'
      }
      this.isAjax = true
      postAction(url, params).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getCateData()
          this.keyword = ''
          this.isEdit = false
          this.eidtId = ''
        }
      })
    },
    handleRank (cid, direction) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/goods/cate/rank', {
        cid,
        direction
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getCateData()
        }
      })
    },
    handleEdit (record) {
      this.keyword = record.cname
      this.eidtId = record.cid
      this.isEdit = true
    },
    handleDel (cid) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/goods/cate/destory', {
        cid
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getCateData()
        }
      })
    }
  }
}
</script>

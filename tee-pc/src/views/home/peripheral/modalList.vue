<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"

</style>

<template>
<float-box v-model="visible" :title="title" :height="75" :left="380" :right="90">
  <div class="acenter" slot="btns">
    <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="operates-line ml25 mr25 mt30">
    <Select class="c-select mr20" placeholder="产品分类" style="width: 130px;" v-model="cate" @on-change="paramsChange">
      <Option value="">全部</Option>
      <Option v-for="item in cateList" :key="item.cid" :value="item.cid">{{item.cname}}</Option>
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
      <tr v-for="item in list" :key="item.id">
        <td><div>{{item.cname}}</div></td>
        <td><div>{{item.title}}</div></td>
        <td>
          <div>
            <van-image width="60" height="60" radius="12" fit="cover" :src="imgSrc + item.cover" />
          </div>
        </td>
        <td>
          <div>
            {{item.skus.map(i => i.attr_names).join('、')}}
          </div>
        </td>
        <td>
          <div class="">
            <Button size="small" class="ml10 bg-main" @click="openDetail(item.id)">添加</Button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml50 mt10" v-if="list.length > 0">
    <Page :current="page" :total="total" simple class-name="tee-page" />
  </div>
  <div class="ml50 mt100" v-if="list.length === 0">
    <img src="@/assets/img/none.png" width="265" />
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from '@/components/common/floatBox'
import { getAction } from '@/utils'
export default {
  name: 'app',
  components: {
    floatBox
  },
  computed: {
    imgSrc () {
      return this.$store.state.imgSrc
    }
  },
  data () {
    return {
      title: '添加产品',
      visible: false,
      cate: '',
      total: 0,
      page: 1,
      limit: 10,
      cateList: [],
      list: []
    }
  },
  methods: {
    getCateData () {
      getAction('/shopapi/nearby/cates').then(res => {
        if (res.code === 0) {
          this.cateList = res.data
        }
      })
    },
    paramsChange () {
      this.page = 1
      this.getListData()
    },
    getListData () {
      getAction('/shopapi/nearby/index/data', {
        cid: this.cate,
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 0) {
          this.list = res.data
          this.total = res.count
        }
      })
    },
    show () {
      this.visible = true
      this.getCateData()
      this.getListData()
    },
    handleCancel () {
      this.visible = false
    },
    openDetail (id) {
      this.$emit('detail', id)
    }
  }
}
</script>

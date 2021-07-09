<style lang="stylus" type="text/stylus">
.peripheral-scroll-page
  height calc(100vh - 242px); overflow-y auto;
</style>

<template>
<div class="pt60">
  <div class="between operates-line">
    <div class="flex">
      <Select class="c-select mr20" placeholder="产品分类" style="width: 130px;" v-model="cate" @on-change="paramsChange">
        <Option value="">全部</Option>
        <Option v-for="item in cateList" :key="item.cid" :value="item.cid">{{item.cname}}</Option>
      </Select>
      <Select class="c-select mr20" placeholder="状态" style="width: 130px;" v-model="status" @on-change="paramsChange">
        <Option v-for="item in statusList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
      <div class="c-input">
        <img src="@/assets/img/search.png" class="c-input-search" width="23" />
        <input type="text" placeholder="输入搜索内容" v-model="word" @keyup.enter="paramsChange" />
      </div>
    </div>
    <div class="flex">
      <Button style="width: 140px;" icon="md-add" @click="openModalList">添加产品</Button>
    </div>
  </div>

  <div class="scrollBar peripheral-scroll-page">
    <div class="tee-tables mt30 ml50 mr50">
      <table>
        <colgroup>
          <col width="115" />
          <col width="160" />
          <col width="110" />
          <col width="140" />
          <col width="90" />
          <col />
          <col width="180" />
        </colgroup>
        <thead>
        <tr>
          <th>产品分类</th>
          <th>产品名称</th>
          <th>产品图</th>
          <th>规格</th>
          <th>库存</th>
          <th>状态</th>
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
              <p v-for="(item, index) in item.skus" :key="index">{{item.attr_names}}</p>
            </div>
          </td>
          <td>
            <div>
              <p v-for="(item, index) in item.skus" :key="index">{{item.store_nums}}</p>
            </div>
          </td>
          <td>
            <div v-if="item.status === 2">
              <p v-for="(item, index) in item.skus" :key="index">{{item.store_nums > 0 ? '在售' : '售罄'}}</p>
            </div>
            <div v-if="item.status === 1"><p>下架</p></div>
          </td>
          <td class="opera">
            <div class="center">
              <Poptip title="确认下架？" confirm @on-ok="changeStatus(item.id, 1)">
                <Button size="small" v-if="item.status === 2">下架</Button>
              </Poptip>
              <Poptip title="确认上架？" confirm @on-ok="changeStatus(item.id, 2)">
                <Button size="small" v-if="item.status === 1">上架</Button>
              </Poptip>
              <Button size="small" class="ml10" @click="handleEdit(item.nearby_id)">编辑</Button>
              <Poptip title="确认删除？" confirm @on-ok="handleDel(item.id)">
                <Button size="small" class="ml10 bg-gray">删除</Button>
              </Poptip>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ml50 mt10 mb30" v-if="list.length > 0">
      <Page :current="page" :total="total" simple class-name="tee-page" @on-change="pageChange" />
    </div>
    <div class="ml50 mt100" v-if="list.length === 0 && !isAjax">
      <img src="@/assets/img/none.png" width="265" />
    </div>
  </div>
  <modal-list ref="modalList" @detail="openModal" />
  <modal-form ref="modalForm" @ok="getListData" />
</div>
</template>

<script type='es6'>
import modalForm from './peripheral/modalForm'
import modalList from './peripheral/modalList'
import { getAction, postAction } from '@/utils'
export default {
  name: 'app',
  components: {
    modalForm,
    modalList
  },
  computed: {
    imgSrc () {
      return this.$store.state.imgSrc
    }
  },
  data () {
    return {
      cateList: [],
      statusList: [
        { id: '0', name: '全部' },
        { id: 2, name: '在售' },
        { id: 1, name: '下架' },
        { id: -1, name: '售罄' }
      ],
      cate: '',
      status: '',
      word: '',
      total: 0,
      page: 1,
      limit: 10,
      list: [],
      isAjax: false
    }
  },
  mounted () {
    this.getCateData()
    this.getListData()
  },
  methods: {
    pageChange (e) {
      this.page = e
      this.getListData()
    },
    paramsChange () {
      this.page = 1
      this.getListData()
    },
    openModalList () {
      this.$refs.modalList.show()
    },
    openModal (id) {
      this.$refs.modalForm.show(id)
    },
    getCateData () {
      getAction('/shopapi/nearby/cates').then(res => {
        if (res.code === 0) {
          this.cateList = res.data
        }
      })
    },
    getListData () {
      this.isAjax = true
      this.$refs.modalList.handleCancel()
      getAction('/shopapi/shop/nearby/index/data', {
        word: this.word,
        cid: this.cate,
        status: this.status === '' ? '0' : this.status,
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.list = res.data
          this.total = res.count
        }
      })
    },
    handleDel (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/shop/nearby/destroy', {
        nearby_id: id
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    changeStatus (id, status) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/shop/nearby/status', {
        id,
        status
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    handleEdit (id) {
      this.$refs.modalForm.show(id)
    }
  }
}
</script>

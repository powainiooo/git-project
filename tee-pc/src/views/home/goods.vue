<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pa60">
  <div class="between operates-line">
    <div class="flex">
      <Select class="c-select mr20" placeholder="产品分类" style="width: 130px;" v-model="cate">
        <Option v-for="item in cateList" :key="item.cid" :value="item.cid">{{item.cname}}</Option>
      </Select>
      <Select class="c-select mr20" placeholder="状态" style="width: 130px;" v-model="status">
        <Option v-for="item in statusList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
      <div class="c-input">
        <img src="@/assets/img/search.png" class="c-input-search" width="23" />
        <input type="text" placeholder="输入搜索内容" v-model="word" />
      </div>
    </div>
    <div class="flex">
      <Button style="width: 140px;" icon="md-add" class="mr20" @click="openCate">添加产品分类</Button>
      <Button style="width: 140px;" icon="md-add" @click="openModal">添加产品</Button>
    </div>
  </div>

  <div class="tee-tables mt30 ml50 mr50">
    <table>
      <colgroup>
        <col width="115" />
        <col width="95" />
        <col width="110" />
        <col width="240" />
        <col width="138" />
        <col width="70" />
        <col width="70" />
        <col width="96" />
        <col />
        <col width="180" />
      </colgroup>
      <thead>
      <tr>
        <th>产品分类</th>
        <th>产品名称</th>
        <th>产品图</th>
        <th>产品介绍</th>
        <th>售卖时间段</th>
        <th>价格</th>
        <th>库存</th>
        <th>制作时间</th>
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
            <div class="img-box img-box-height"><img :src="imgSrc + item.cover" /></div>
          </div>
        </td>
        <td>
          <div>
            <Tooltip :content="item.content" :max-width="300" placement="right">
              <div class="content">{{item.content}}</div>
            </Tooltip>
          </div>
        </td>
        <td><div>{{item.date_start || '--'}} - {{item.date_end || '--'}}</div></td>
        <td><div>{{item.price}}</div></td>
        <td><div>{{item.store_nums}}</div></td>
        <td><div>{{item.make_time}}分钟</div></td>
        <td><div>{{item.status_name}}</div></td>
        <td>
          <div class="">
            <div v-if="item.check_status === 1">
              <Poptip title="确认下架？" confirm @on-ok="changeStatus(item.id, 1)">
                <Button size="small" v-if="item.status === 2">下架</Button>
              </Poptip>
              <Poptip title="确认上架？" confirm @on-ok="changeStatus(item.id, 2)">
                <Button size="small" v-if="item.status === 1">上架</Button>
              </Poptip>
              <Button size="small" class="ml10" @click="handleEdit(item.id)">编辑</Button>
              <Poptip title="确认删除？" confirm @on-ok="handleDel(item.id)">
                <Button size="small" class="ml10 bg-gray">删除</Button>
              </Poptip>
            </div>
            <p class="tc" v-else-if="item.check_status === 0">审核中</p>
            <Button size="small" class="ml10 bg-error" v-else-if="item.check_status === -1" @click="handleModify(item.id)">审核不过,重新修改后提交</Button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml50 mt10" v-if="list.length > 0">
    <Page :current="page" :total="total" simple class-name="tee-page" />
  </div>
  <modal-form ref="modalForm" @ok="refresh" />
  <cate-form ref="cateForm" @close="getCateData" />
</div>
</template>

<script type='es6'>
import modalForm from './goods/modalForm'
import cateForm from './goods/cateForm'
import { getAction, postAction } from '@/utils'

export default {
  name: 'app',
  components: {
    modalForm,
    cateForm
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
    openModal () {
      this.$refs.modalForm.show()
    },
    openCate () {
      this.$refs.cateForm.show()
    },
    getCateData () {
      getAction('/shopapi/goods/cate/index/data').then(res => {
        if (res.code === 0) {
          this.cateList = res.data
        }
      })
    },
    getListData () {
      getAction('/shopapi/goods/index/data', {
        word: this.word,
        cid: this.cate,
        status: this.status === '' ? '0' : this.status,
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 0) {
          this.list = res.data
          this.total = res.count
        }
      })
    },
    refresh () {
      this.cate = ''
      this.status = ''
      this.word = ''
      this.page = 1
      this.getListData()
    },
    handleDel (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/goods/destroy', {
        id
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
      postAction('/shopapi/goods/status', {
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
      this.$refs.modalForm.edit(id)
    },
    handleModify (id) {
      this.$refs.modalForm.modify(id)
    }
  }
}
</script>

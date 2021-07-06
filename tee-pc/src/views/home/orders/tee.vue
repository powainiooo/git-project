<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pa60">
  <div class="between operates-line">
    <div class="flex">
      <c-date-time type="date" placeholder="下单日期" class="tee-date mr20" v-model="date" @change="paramsChange" />
      <Select class="c-select mr20" placeholder="状态" style="width: 130px;" v-model="status" @on-change="paramsChange">
        <Option v-for="item in statusList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
      <div class="c-input">
        <img src="@/assets/img/search.png" class="c-input-search" width="23" />
        <input type="text" placeholder="输入搜索内容" v-model="word" @keyup.enter="paramsChange" />
      </div>
    </div>
  </div>

  <div class="tee-tables mt30 ml50 mr50">
    <table>
      <colgroup>
        <col width="130" />
        <col width="70" />
        <col width="125" />
        <col width="150" />
        <col width="130" />
        <col width="80" />
        <col width="80" />
        <col width="80" />
        <col width="150" />
        <col width="120" />
        <col />
        <col width="170" />
      </colgroup>
      <thead>
      <tr>
        <th>下单时间</th>
        <th>取茶号</th>
        <th>订单号</th>
        <th>产品名称</th>
        <th>规格</th>
        <th>下单杯数</th>
        <th>单价</th>
        <th>总价</th>
        <th>备注</th>
        <th>联系电话</th>
        <th>状态</th>
        <th style="text-align: center;"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <td><div>{{item.created_at}}</div></td>
        <td><div>{{item.fetch_code}}</div></td>
        <td><div>{{item.order_no}}</div></td>
        <td>
          <div>
            <p v-for="(item, index) in item.goods" :key="index">{{item.goods_name}}</p>
          </div>
        </td>
        <td>
          <div>
            <p v-for="(item, index) in item.goods" :key="index">{{item.goods_attr.join('、')}}</p>
          </div>
        </td>
        <td>
          <div>
            <p v-for="(item, index) in item.goods" :key="index">{{item.buy_nums}}件</p>
          </div>
        </td>
        <td>
          <div>
            <p v-for="(item, index) in item.goods" :key="index">{{item.goods_price}}元</p>
          </div>
        </td>
        <td>
          <div>{{item.pay_amount}}元</div>
        </td>
        <td>
          <div>{{item.user_remark || '--'}}</div>
        </td>
        <td>
          <div>{{item.phone || '--'}}</div>
        </td>
        <td>
          <div>{{item.status_name}}</div>
        </td>
        <td class="opera">
          <div class="center">
            <Poptip title="确认补打标签？" confirm @on-ok="handleTag(item.id)" v-if="item.status === 4">
              <Button size="small" class="mb10">补打标签</Button>
            </Poptip>
            <Poptip title="确认完成？" confirm @on-ok="orderDone(item.id)" v-if="item.status === 4">
              <Button size="small" class="bg-main ml10 mb10">完成订单</Button>
            </Poptip>
            <Poptip title="确认退款？" confirm @on-ok="handleRefund(item.id)" v-if="canRefund(item.status)">
              <Button size="small">退款</Button>
            </Poptip>
            <Poptip title="确认制作？" confirm @on-ok="startMake(item.id)" v-if="item.status === 2">
              <Button size="small" class="bg-main ml10">开始制作</Button>
            </Poptip>
            <counter v-if="item.status === 3" :timer="item.remain_make_time" @done="getListData" />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml50 mt10" v-if="list.length > 0">
    <Page :current="page" :total="total" simple class-name="tee-page" @on-change="pageChange" />
  </div>
  <div class="ml50 mt100" v-if="list.length === 0 && !isAjax">
    <img src="@/assets/img/none.png" width="265" />
  </div>
</div>
</template>

<script type='es6'>
import { getAction, postAction } from '@/utils'
import counter from '@/components/common/counter'
import cDateTime from '@/components/common/cDateTime'
export default {
  name: 'app',
  components: {
    counter,
    cDateTime
  },
  data () {
    return {
      statusList: [
        { id: '0', name: '全部' },
        { id: '2', name: '已下单' },
        { id: '3', name: '制作中' },
        { id: '4', name: '待取餐' },
        { id: '7', name: '已完成' },
        { id: '-9', name: '已退款' }
      ],
      date: '',
      status: '',
      word: '',
      total: 0,
      page: 1,
      limit: 10,
      list: [],
      isAjax: false
    }
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
    getListData () {
      this.isAjax = true
      getAction('/shopapi/order/index/data', {
        type: 1,
        word: this.word,
        date: this.date,
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
    startMake (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/order/start/make', {
        id
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    orderDone (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/order/done', {
        id
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    handleRefund (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/order/refund', {
        id
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    handleGet (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/order/refund', {
        id
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    handleTag (id) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/order/refund', {
        id
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Message.success(res.msg)
          this.getListData()
        }
      })
    },
    canRefund (status) {
      if (status === 2 || status === 3 || status === 4 || status === 7) {
        return true
      }
      return false
    }
  }
}
</script>

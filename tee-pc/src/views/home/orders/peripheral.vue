<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pt60">
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
  <div class="table-scroll scrollBar">
    <div class="tee-tables mt30 ml50 mr50">
      <table>
        <colgroup>
          <col width="130" />
          <col width="70" />
          <col width="125" />
          <col width="125" />
          <col width="130" />
          <col width="80" />
          <col width="80" />
          <col width="80" />
          <col width="150" />
          <col width="120" />
          <col />
          <col width="150" />
        </colgroup>
        <thead>
        <tr>
          <th>下单时间</th>
          <th>取货号</th>
          <th>订单号</th>
          <th>产品名称</th>
          <th>规格</th>
          <th>下单件数</th>
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
              <Poptip title="确认退款？" confirm @on-ok="handleRefund(item.id)" v-if="item.status !== 1 && item.status !== -9">
                <Button size="small">退款</Button>
              </Poptip>
              <Poptip title="确认提货？" confirm @on-ok="orderDone(item.id)">
                <Button size="small" class="bg-main ml10">确认提货</Button>
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
</div>
</template>

<script type='es6'>
import { getAction, postAction } from '@/utils'
import cDateTime from '@/components/common/cDateTime'
export default {
  name: 'app',
  components: {
    cDateTime
  },
  data () {
    return {
      statusList: [
        { id: '0', name: '全部' },
        { id: '2', name: '已付款' },
        { id: '4', name: '待提货' },
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
        type: 2,
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
    }
  }
}
</script>

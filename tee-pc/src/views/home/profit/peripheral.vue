<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pa60">
  <div class="between operates-line">
    <div class="flex">
      <Select class="c-select mr20" placeholder="状态" style="width: 130px;" v-model="status">
        <Option v-for="item in statusList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
    </div>
  </div>

  <div class="tee-tables mt30 ml50 mr50">
    <table>
      <colgroup>
        <col width="130" />
        <col width="70" />
        <col width="125" />
        <col width="120" />
        <col />
        <col width="90" />
      </colgroup>
      <thead>
      <tr>
        <th>下单时间</th>
        <th>取茶号</th>
        <th>状态</th>
        <th>提交时间</th>
        <th>完成时间</th>
        <th style="text-align: center; padding-right: 20px;">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <td><div>{{item.date}}</div></td>
        <td><div>{{item.fetch_code}}</div></td>
        <td><div>{{item.status_name || '--'}}</div></td>
        <td><div>{{item.updated_at || '--'}}</div></td>
        <td><div>{{item.apply_at || '--'}}</div></td>
        <td>
          <div class="">
            <Poptip title="确认提现？" confirm @on-ok="handleWithdraw(item.id)">
              <Button size="small">提现申请</Button>
            </Poptip>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml50 mt10" v-if="list.length > 0">
    <Page :current="page" :total="total" simple class-name="tee-page" />
  </div>
</div>
</template>

<script type='es6'>
import { getAction, postAction } from '@/utils'
export default {
  name: 'app',
  data () {
    return {
      statusList: [
        { id: '0', name: '全部' },
        { id: '1', name: '待提现' },
        { id: '2', name: '提现中' },
        { id: '3', name: '已提现' }
      ],
      status: '',
      total: 0,
      page: 1,
      limit: 10,
      list: [],
      isAjax: false
    }
  },
  methods: {
    getListData () {
      getAction('/shopapi/withdraw/index/data', {
        type: 2,
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
    handleWithdraw (id) {
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

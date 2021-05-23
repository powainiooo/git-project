<style lang="stylus" type="text/stylus">
.orders-container
  min-height 640px; overflow hidden;
</style>

<template>
<div class="box2 orders-container">
  <div class="pr">
    <Tabs type="card" class="tee-tabs" style="margin-top: 13px;" @on-click="tabChange">
      <TabPane name="1" label="今日收益">
        <div class="tee-tables mt30 ml50 mr50">
          <table>
            <col width="130" />
            <col width="70" />
            <col width="124" />
            <col width="86" />
            <col width="128" />
            <col width="86" />
            <col width="74" />
            <col width="60" />
            <col width="150" />
            <col width="110" />
            <col />
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
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list" :key="item.id">
              <td><div>2021/03/04<br/>13:01:12</div></td>
              <td><div>4010</div></td>
              <td><div>0016659884321</div></td>
              <td><div>柠檬茶</div></td>
              <td><div>冰、去冰、正常糖</div></td>
              <td><div>2杯</div></td>
              <td><div>20元</div></td>
              <td><div>40元</div></td>
              <td><div>自带杯子，冰块分装</div></td>
              <td><div>13729391920</div></td>
              <td><div>已下单</div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </TabPane>
      <TabPane name="2" label="今日杯数">标签二的内容</TabPane>
    </Tabs>
  </div>
</div>
</template>

<script type='es6'>
import { getAction } from '@/utils'
export default {
  name: 'app',
  data () {
    return {
      type: '1',
      list1: [],
      list2: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    tabChange (e) {
      console.log('tabChange', e)
      this.type = e
      this.getData()
    },
    getData () {
      getAction('/shopapi/order/index/data', {
        date: '',
        type: this.type,
        word: '',
        status: 0,
        page: 1,
        limit: 10
      }).then(res => {
        if (res.code === 0) {
          this[`list${this.type}`] = res.data
        }
      })
    }
  }
}
</script>

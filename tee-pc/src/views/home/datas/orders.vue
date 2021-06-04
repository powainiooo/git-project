<style lang="stylus" type="text/stylus">
.orders-container
  min-height 640px; overflow hidden;
</style>

<template>
<div class="box2 orders-container">
  <div class="pr">
    <Tabs type="card" class="tee-tabs" style="margin-top: 13px;" @on-click="tabChange">
      <TabPane name="1" label="今日茶饮订单">
        <div class="tee-tables mt30 ml50 mr50" v-if="list1.length > 0">
          <table>
            <col width="130" />
            <col width="70" />
            <col width="124" />
            <col width="86" />
            <col width="128" />
            <col width="86" />
            <col width="90" />
            <col width="90" />
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
            <tr v-for="item in list1" :key="item.id">
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
                  <p v-for="(item, index) in item.goods" :key="index">{{item.buy_nums}}杯</p>
                </div>
              </td>
              <td>
                <div>
                  <p v-for="(item, index) in item.goods" :key="index">{{item.goods_price}}元</p>
                </div>
              </td>
              <td><div>{{item.pay_amount}}元</div></td>
              <td><div>{{item.user_remark || '--'}}</div></td>
              <td><div>{{item.phone || '--'}}</div></td>
              <td><div>{{item.status_name}}</div></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="empty" v-else style="margin-top: 200px;">
          <img src="@/assets/img/empty.png" width="68" />
          <p>Payment failure</p>
          <div>暂无数据</div>
        </div>
      </TabPane>
      <TabPane name="2" label="今日周边订单">
        <div class="tee-tables mt30 ml50 mr50" v-if="list2.length > 0">
          <table>
            <col width="130" />
            <col width="70" />
            <col width="124" />
            <col width="86" />
            <col width="128" />
            <col width="86" />
            <col width="90" />
            <col width="90" />
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
            <tr v-for="item in list2" :key="item.id">
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
              <td><div>{{item.pay_amount}}元</div></td>
              <td><div>{{item.user_remark || '--'}}</div></td>
              <td><div>{{item.phone || '--'}}</div></td>
              <td><div>{{item.status_name}}</div></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="empty" v-else style="margin-top: 200px;">
          <img src="@/assets/img/empty.png" width="68" />
          <p>Payment failure</p>
          <div>暂无数据</div>
        </div>
      </TabPane>
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
          console.log('this.type', this.type, this[`list${this.type}`])
          this[`list${this.type}`] = res.data
        }
      })
    }
  }
}
</script>

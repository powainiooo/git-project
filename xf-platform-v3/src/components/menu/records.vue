<style scoped>
.c-tables-records th:last-child { padding-left: 18px; }
.c-tables-records td:last-child div { padding-left: 18px; }
</style>

<template>
<div class="c-records">
  <div class="clearfix mt85 mb20">
    <div class="fr flex mr40">
      <c-select :list="stateList" class="mr10" @change="state = $event.id"/>
      <div class="c-search">
        <input placeholder="输入活动名称" v-model="keyword" />
        <Button size="small" @click="getData">查询</Button>
      </div>
    </div>
  </div>

  <div class="c-tables c-tables-records">
    <table>
      <thead>
      <tr>
        <th v-for="(item, index) in columns"
            :key="index"
            :style="{
              width: item.width + 'px' || 'auto'
            }">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <td><div>{{item.name}}</div></td>
        <td><div class="helveB">{{item.end_date}}</div></td>
        <td><div class="style3">{{item.total_sold_num}}</div></td>
        <td>
          <div>
            <p v-for="t in item.stocks" :key="t.id">{{t.name}}</p>
          </div>
        </td>
        <td>
          <div class="helveB">
            <p v-for="t in item.stocks" :key="t.id">{{t.sold_num}}</p>
          </div>
        </td>
        <td>
          <div class="helveB">
            <p v-for="t in item.stocks" :key="t.id">{{t.price}}</p>
          </div>
        </td>
        <td><div class="style3">{{item.total_amt}}</div></td>
        <td><div class="style1">{{item.avaliable_withdraw_amt}}</div></td>
        <td>
          <div class="style2" v-if="item.state === 4">已提现</div>
          <div v-else>
            <Button size="small" v-if="item.state === 2" @click="toForm(item)">申请提现</Button>
            <Button size="small" type="error" v-else-if="item.state === 5">重新申请</Button>
            <span v-else>{{getState(item.state)}}</span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml20 mt15">
    <Page :total="total" class-name="xf-page" />
  </div>
</div>
</template>

<script type='es6'>
import cSelect from '../cSelect'
import { postAction } from '../../utils'
export default {
  name: 'app',
  components: {
    cSelect
  },
  data () {
    return {
      columns: [ // 1260
        { name: '活动名称', width: 310 },
        { name: '活动结束时间', width: 140 },
        { name: '总销售票数（张）', width: 180 },
        { name: '票种', width: 90 },
        { name: '张数', width: 90 },
        { name: '单价', width: 90 },
        { name: '总额（元）', width: 130 },
        { name: '可提金额', width: 130 },
        { name: '操作', width: 100 }
      ],
      stateList: [
        { id: 1, name: '不可提现' },
        { id: 2, name: '可申请提现' },
        { id: 3, name: '审核中' },
        { id: 4, name: '已提现' },
        { id: 5, name: '提现被拒绝' }
      ],
      list: [],
      keyword: '',
      state: '',
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      postAction('/editor/finance/lists', {
        keyword: this.keyword,
        state: this.state,
        page: this.pageNo,
        limit: this.pageSize
      }).then(res => {
        if (res.code === 1) {
          this.list = res.data.list
          this.total = res.data.total
        }
      })
    },
    toForm (record) {
      this.$emit('toggle', {
        page: 'cashOut',
        data: record
      })
    },
    getState (id) {
      const i = this.stateList.find(i => i.id === id)
      return i.name
    }
  }
}
</script>

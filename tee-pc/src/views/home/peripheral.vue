<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pa60">
  <div class="between operates-line">
    <div class="flex">
      <Select class="c-select mr20" placeholder="产品分类" style="width: 130px;">
        <Option>123</Option>
      </Select>
      <Select class="c-select mr20" placeholder="状态" style="width: 130px;">
        <Option>123</Option>
      </Select>
      <div class="c-input">
        <img src="@/assets/img/search.png" class="c-input-search" width="23" />
        <input type="text" placeholder="输入搜索内容" />
      </div>
    </div>
    <div class="flex">
      <Button style="width: 140px;" icon="md-add" @click="openModalList">添加产品</Button>
    </div>
  </div>

  <div class="tee-tables mt30 ml50 mr50">
    <table>
      <colgroup>
        <col width="115" />
        <col width="160" />
        <col width="110" />
        <col width="110" />
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
        <th>价格</th>
        <th style="text-align: center;"><div class="pr20">操作</div></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><div>新品推荐</div></td>
        <td><div>乌龙茶</div></td>
        <td>
          <div style="margin-top: -8px;">
            <div class="img-box"><img src="@/assets/img/img2.png" /></div>
          </div>
        </td>
        <td>
          <div>
            <p>黄色-数字7</p>
            <p>黄色-数字7</p>
          </div>
        </td>
        <td>
          <div>
            <p>100</p>
            <p>100</p>
          </div>
        </td>
        <td>
          <div>
            <p>在售</p>
            <p>在售</p>
          </div>
        </td>
        <td>
          <div class="">
            <Button size="min">下架</Button>
            <Button size="min" class="ml10">编辑</Button>
            <Button size="min" class="ml10 bg-gray">删除</Button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <modal-list ref="modalList" @detail="openModal" />
  <modal-form ref="modalForm" />
</div>
</template>

<script type='es6'>
import modalForm from './peripheral/modalForm'
import modalList from './peripheral/modalList'
export default {
  name: 'app',
  components: {
    modalForm,
    modalList
  },
  data () {
    return {
      list: [{}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
    openModalList () {
      this.$refs.modalList.show()
    },
    openModal () {
      this.$refs.modalForm.show()
    }
  }
}
</script>

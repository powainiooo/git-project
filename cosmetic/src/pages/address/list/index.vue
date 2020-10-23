<style>
page { background-color: rgb(248, 248, 248)}
.addr-item { margin-top: 24px; background-color: #ffffff; padding: 30px 30px 0 30px;}
.addr-item .line1 { font-size: 32px; color: #333333; line-height: 1; margin-bottom: 30px;}
.addr-item .line1 span { color: #5E5E5E; margin-left: 40px;}
.addr-item .line2 { font-size: 28px; color: #666666; padding-bottom: 30px; position: relative;}
.addr-item .line2:after { content: ''; width: 100%; height: 1px; background-color: #E6E6E6; position: absolute; bottom: 0; left: 0; transform: scaleY(.5);}
.addr-item .line3 { height: 90px; display: flex; justify-content: space-between; align-items: center;}
.addr-item .line3 ul { width: 170px; display: flex; justify-content: space-between; position: relative;}
.addr-item .line3 ul li { font-size: 28px; color: #999999; line-height: 1;}
.addr-item .line3 ul:before { content: ''; width: 2px; height: 100%; position: absolute; top: 0; left: 50%; background-color: #999999;}
.addr-item .line3 .label { font-size: 28px; color: #666666;}

.btns { width: 650px; margin: 70px auto;}
.btns .btn-round { height: 80px; font-size: 36px;}
</style>

<template>
<div>
   <van-radio-group :value="check" @change="onChange">
      <div class="addr-item" v-for="i in listData" :key="id">
         <div @click="selectAddr(i)">
            <div class="line1">{{i.name}}<span>{{i.mobile}}</span></div>
            <div class="line2">{{i.address}}{{i.house_num}}</div>
         </div>

         <div class="line3">
            <van-radio :name="i.id" icon-size="32rpx" checked-color="#333333"><span class="label">默认地址</span></van-radio>
            <ul>
               <li @click="doDel(i.id)">删除</li>
               <li @click="doEdit(i)">编辑</li>
            </ul>
         </div>
      </div>
   </van-radio-group>

   <div class="btns"><a href="/pages/address/edit/main" class="btn-round">添加新地址</a> </div>
</div>
</template>

<script>
import { postAction } from '@/utils/api'
import store from '../../../store'

export default {
   data () {
      return {
         check: '',
         listData: []
      }
   },

   methods: {
      onChange (e) {
         this.check = e.mp.detail
         const data = this.listData.find(i => i.id === e.mp.detail)
         data.default = '1'
         postAction('edit_address', data).then(res => {
            if (res.ret === 0) {
               mpvue.showToast({ title: '修改默认地址成功！' })
            }
         })
      },
      getData () {
         postAction('get_address_list').then(res => {
            this.listData = res.data.address_info
            this.listData.forEach(i => {
               if (i.default === '1') {
                  this.check = i.id
               }
            })
            if (this.listData.length === 0) {
               store.commit('SET_ADDRESS', null)
            }
         })
      },
      doEdit (item) {
         // const {id, name, province, city, area, address, mobile, yzbm, house_num, card_name, card_num} = item
         // const data = {id, name, province, city, area, address, mobile, yzbm, house_num, card_name, card_num}
         const data = {...item}
         // data.default = item.default
         store.commit('SET_ADDRESS', data)
         mpvue.navigateTo({
            url: `/pages/address/edit/main?page=edit`
         })
      },
      selectAddr (item) {
         store.commit('SET_ADDRESS', item)
         mpvue.navigateBack({
            delta: 1
         })
      },
      doDel (id) {
         mpvue.showModal({
            title: '提示',
            content: '是否确定删除该地址',
            success: (res) => {
               if (res.confirm) {
                  postAction('del_address', {
                     id
                  }).then(res => {
                     if (res.ret === 0) {
                        mpvue.showToast({title: '删除成功'})
                        this.getData()
                     }
                  })
               }
            }
         })
      }
   },

   onShow (options) {
      this.getData()
   },
   onLoad () {
      Object.assign(this.$data, this.$options.data())
   }
}
</script>

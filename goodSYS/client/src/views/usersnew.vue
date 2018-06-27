<style>
.mt15{ margin-top: 15px;}
</style>

<template>
    <div class="frame">
        <Menu mode="horizontal" active-name="0" @on-select="changeMenu">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                产品管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="person"></Icon>
                客户管理
            </MenuItem>
        </Menu>
        <Form :model="formItem" :label-width="80" class="mt15" style="width: 600px;">
            <FormItem label="用户名称">
                <Input v-model="formItem.name" placeholder="请输入用户名称"></Input>
            </FormItem>
            <FormItem label="电话号码">
                <Input v-model="formItem.phone" placeholder="请输入电话号码"></Input>
            </FormItem>
            <FormItem label="充值">
                <InputNumber :min="0" v-model="formItem.recharge"></InputNumber>
            </FormItem>
            <FormItem label="欠款">
                <InputNumber :min="0" v-model="formItem.arrears"></InputNumber>
            </FormItem>
            <FormItem>
                <Button type="primary">新增</Button>
                <router-link to="/users"><Button type="ghost" style="margin-left: 8px">取消</Button></router-link>
            </FormItem>
        </Form>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                formItem:{
                    name:'',
                    phone:'',
                    recharge:0,
                    arrears:0
                }
            }
        },
        methods:{
            changeMenu(name){
                if(name == 1){
                    this.$router.push('/goods')
                }else if(name == 2){
                    this.$router.push('/users')
                }
            }
        }
    }

</script>


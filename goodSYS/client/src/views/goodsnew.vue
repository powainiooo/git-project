<style>

</style>

<template>
    <div class="frame" style="margin-top: 30px;">
        <Form :model="formItem" :label-width="80">
            <FormItem label="产品名称">
                <Input v-model="formItem.name" placeholder="请输入产品名称"></Input>
            </FormItem>
            <FormItem label="产品分类">
                <Select v-model="formItem.type">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="入库数量">
                <InputNumber :min="1" v-model="formItem.nums"></InputNumber>
            </FormItem>
            <FormItem label="产品描述">
                <Input v-model="formItem.descript" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品描述"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">新增</Button>
                <router-link to="/goods"><Button type="ghost" style="margin-left: 8px">取消</Button></router-link>
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
                    type:'',
                    nums:'',
                    descript:''
                }
            }
        },
        methods:{

        }
    }

</script>


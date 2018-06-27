<style>
    .frame{ margin:0 15px 15px 15px;}
    .cond-line{ margin:15px 0; text-align: right; }
</style>

<template>
    <div class="frame">
        <Menu mode="horizontal" active-name="2" @on-select="changeMenu">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                产品管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="person"></Icon>
                客户管理
            </MenuItem>
        </Menu>
        <div class="cond-line">
            <router-link to="/users/new"><Button type="primary">新增</Button></router-link>
        </div>
        <Table border :columns="columns" :data="listData"></Table>

        <!-- 新增消费记录 -->
        <Modal
            v-model="consume.isShow"
            title="新增消费记录"
            width="600"
            ok-text="新增"
            @on-ok="doAddConsume">
            <Form :model="consume.formData" :label-width="100">
                <FormItem label="客户：">
                    <Input v-model="consume.formData.name" readonly disabled style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="产品：">
                    <CheckboxGroup v-model="consume.formData.goods">
                        <Checkbox label="香蕉"></Checkbox>
                        <Checkbox label="苹果"></Checkbox>
                        <Checkbox label="西瓜"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="时间：">
                    <DatePicker type="datetime" placeholder="选择时间" style="width: 200px;" v-model="consume.formData.date"></DatePicker>
                </FormItem>
                <FormItem label="描述：">
                    <Input v-model="consume.formData.descript" :rows="5" type="textarea" placeholder="消费记录详情描述……"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                columns: [
                    {
                        title: '用户名称',
                        key: 'name'
                    },
                    {
                        title: '电话号码',
                        key: 'phone'
                    },
                    {
                        title: '购买产品',
                        key: 'goods',
                        render: (h,params) => {
                            let str = '',arr = params.row.goods;
                            for(let [index,item] of arr.entries()){
                                str += item ;
                                if(index != arr.length - 1){
                                    str += '，' ;
                                }
                            }
                            if(arr.length == 0) str = '无';
                            return h('a',{
                                props:{
                                    href:'javascript:;'
                                },
                                on:{
                                    click: () => {

                                    }
                                }
                            },str)
                        }
                    },
                    {
                        title: '总充值',
                        key: 'money'
                    },
                    {
                        title: '余额',
                        key: 'remainder'
                    },
                    {
                        title: '欠款',
                        key: 'arrears'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '新增消费记录'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [
                    {
                        name: '用户1',
                        phone: '13823729522',
                        goods: ['产品1','产品2'],
                        money:100,
                        remainder:100,
                        arrears:100
                    }
                ],
                consume:{
                    isShow:true,
                    formData:{
                        name:'dd',
                        goods:[],
                        date:'',
                        descript:''
                    }
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
            },
            doAddConsume(){

            }
        }
    }

</script>


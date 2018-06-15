<style>
    .frame{ margin:0 15px 15px 15px;}
    .cond-line{ margin:15px 0; text-align: right; }
    .mt15{ margin-top: 15px;}
</style>

<template>
    <div class="frame">
        <Menu mode="horizontal" active-name="1" @on-select="changeMenu">
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
            <router-link to="/goodsnew"><Button type="primary">新增</Button></router-link>
        </div>
        <Table border :columns="columns" :data="listData"></Table>
        <Page :total="100" show-elevator show-total class="mt15"></Page>

        <Modal
            v-model="showInModal"
            title="入库"
            @on-ok="doPostIn">
            <Form :model="formItem" :label-width="80">
                <FormItem label="数量：">
                    <InputNumber :min="1" v-model="formDataIn.nums"></InputNumber>
                </FormItem>
                <FormItem label="日期：">
                    <DatePicker type="date" placeholder="选择日期" v-model="formDataIn.date"></DatePicker>
                </FormItem>
                <FormItem label="描述：">
                    <Input v-model="formDataIn.descript" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述细节……"></Input>
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
                        title: '产品名称',
                        key: 'name'
                    },
                    {
                        title: '库存',
                        key: 'age'
                    },
                    {
                        title: '出库',
                        key: 'address'
                    },
                    {
                        title: '入库',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                                }, '出库'),
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
                                }, '入库'),
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
                        name: 'John Brown',
                        age: 18,
                        address: '100'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: '100'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: '100'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: '100'
                    }
                ],
                showInModal:true,
                formDataIn:{
                    nums:0,
                    date:'',
                    descript:''
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
            doPostIn(){

            }
        }
    }

</script>


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
            <Button type="primary">新增</Button>
        </div>
        <Table border :columns="columns" :data="data6"></Table>
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
                        key: 'goods'
                    },
                    {
                        title: '充值',
                        key: 'money'
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
                data6: [
                    {
                        name: '用户1',
                        phone: '13823729522',
                        goods: '产品1',
                        money:100,
                        arrears:100
                    }
                ]
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


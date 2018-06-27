<style>
    .frame{ margin:0 15px 15px 15px;}
    .cond-line{ margin:15px 0; display: flex; justify-content: space-between; }
    .mt15{ margin-top: 15px;}

    .share-frame{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1000; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;}
    .share-frame .share-content{ width: 720px; height: 330px; background-color: #fff; border-radius: 5px; text-align: center;}
    .share-frame .share-content ul{ display: flex; justify-content: center; margin-top: 70px; list-style: none;}
    .share-frame .share-content ul li{ margin: 0 10px; position: relative;}
    .share-frame .share-content ul li div{ position: absolute; top: 60px; left: -25px; display: none;}
    .share-frame .share-content ul li:hover div{ display: block;}
    .share-frame .share-content ul li a{ width: 54px; height: 54px; display: inline-block; background: url('../assets/icon-logo.png') no-repeat;}
    .share-frame .share-content ul li .icon-qq{ background-position: 0 0;}
    .share-frame .share-content ul li .icon-wechat{ background-position: -54px 0;}
    .share-frame .share-content ul li .icon-sina{ background-position: -108px 0;}
    .share-frame .share-content ul li .icon-douban{ background-position: -162px 0;}
    .share-frame .share-content ul li .icon-qzone{ background-position: -216px 0;}
    .share-frame .share-content ul li .icon-renren{ background-position: -270px 0;}
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
            <div>
                <Input v-model="condition.name" placeholder="输入查询产品名称" style="width: 200px"></Input>
                <Button type="primary">查询</Button>
            </div>

            <router-link to="/goods/new"><Button type="primary">新增</Button></router-link>
        </div>
        <Table border :columns="columns" :data="listData"></Table>
        <Page :total="pages.total" show-elevator show-total class="mt15"></Page>

        <!--新增入库-->
        <Modal
            v-model="dataIn.showModal"
            title="入库"
            @on-ok="doPostIn">
            <Form :model="dataIn.formData" :label-width="80">
                <FormItem label="数量：">
                    <InputNumber :min="1" v-model="dataIn.formData.nums"></InputNumber>
                </FormItem>
                <FormItem label="日期：">
                    <DatePicker type="date" placeholder="选择日期" v-model="dataIn.formData.date"></DatePicker>
                </FormItem>
                <FormItem label="描述：">
                    <Input v-model="dataIn.formData.descript" type="textarea" :rows="5" placeholder="描述细节……"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!--新增出库-->
        <Modal
            v-model="dataOut.showModal"
            title="出库"
            @on-ok="doPostOut">
            <Form :model="dataOut.formData" :label-width="80">
                <FormItem label="数量：">
                    <InputNumber :min="1" v-model="dataOut.formData.nums"></InputNumber>
                </FormItem>
                <FormItem label="选择客户：">
                    <Select v-model="dataOut.formData.client">
                        <Option v-for="item in dataOut.clientList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="日期：">
                    <DatePicker type="date" placeholder="选择日期" v-model="dataOut.formData.date"></DatePicker>
                </FormItem>
                <FormItem label="描述：">
                    <Input v-model="dataOut.formData.descript" type="textarea" :rows="5" placeholder="描述细节……"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!--入库记录-->
        <Modal
            v-model="dataIn.showList"
            title="入库记录">
            <Table border :columns="dataIn.columns" :data="dataIn.listData"></Table>
        </Modal>
        <!--出库记录-->
        <Modal
            v-model="dataOut.showList"
            width="700"
            title="出库记录">
            <Table border :columns="dataOut.columns" :data="dataOut.listData"></Table>
        </Modal>

        <div class="share-frame" v-if="isShowShare" @click="hideShare">
            <div class="share-content" @click.stop="isShowShare = true">
                <div style="margin-top: 50px;"><img src="@/assets/title-share.jpg"> </div>
                <ul>
                    <li><a href="javascript:;" class="icon-qq" @click="doShareQQ"></a> </li>
                    <li>
                        <a href="javascript:;" class="icon-wechat"></a>
                        <div><img src="@/assets/link-wechat.png" width="100"> </div>
                    </li>
                    <li><a href="javascript:;" class="icon-sina" @click="doShareSina"></a> </li>
                    <li><a href="javascript:;" class="icon-douban" @click="doShareDouban"></a> </li>
                    <li><a href="javascript:;" class="icon-qzone" @click="doShareQzone"></a> </li>
                    <li><a href="javascript:;" class="icon-renren" @click="doShareRenren"></a> </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            let self = this;
            return{
                columns: [
                    {
                        title: '产品名称',
                        key: 'name'
                    },
                    {
                        title: '库存',
                        key: 'stock'
                    },
                    {
                        title: '出库',
                        key: 'outnums',
                        render: (h,params) => {
                            return h('a',{
                                props:{
                                    href:'javascript:;'
                                },
                                on: {
                                    click: () => {
                                        self.getOutList(params.row.id);
                                    }
                                }
                            },params.row.outnums)
                        }
                    },
                    {
                        title: '入库',
                        key: 'innums',
                        render: (h,params) => {
                            return h('a',{
                                props:{
                                    href:'javascript:;'
                                },
                                on: {
                                    click: () => {
                                        self.getInList(params.row.id);
                                    }
                                }
                            },params.row.innums)
                        }
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
                                            this.dataOut.operaId = params.row.id;
                                            this.dataOut.showModal = true;
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
                                            this.dataIn.operaId = params.row.id;
                                            this.dataIn.showModal = true;
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
                                            this.doDel(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [
                    {
                        id:0,
                        name: 'John Brown',
                        stock: 18,
                        outnums: 100,
                        innums: 100
                    }
                ],
                dataIn:{
                    showModal:false,
                    showList:false,
                    operaId:0,
                    formData:{
                        nums:0,
                        date:'',
                        descript:''
                    },
                    columns:[
                        {
                            title: '日期',
                            key: 'date',
                            width:100
                        },
                        {
                            title: '数量',
                            key: 'nums',
                            width:70
                        },
                        {
                            title: '描述',
                            key: 'descript'
                        }
                    ],
                    listData:[
                        {
                            date:'2018-06-19',
                            nums:90,
                            descript:'miaoshumiaoshu'
                        }
                    ]
                },
                dataOut:{
                    showModal:false,
                    showList:false,
                    operaId:0,
                    formData:{
                        nums:0,
                        date:'',
                        client:'',
                        descript:''
                    },
                    clientList:[
                        {
                            value: 'New York',
                            label: 'New York'
                        },
                        {
                            value: 'London',
                            label: 'London'
                        },
                        {
                            value: 'Sydney',
                            label: 'Sydney'
                        }
                    ],
                    columns:[
                        {
                            title: '客户',
                            key: 'user',
                            width:110
                        },
                        {
                            title: '日期',
                            key: 'date',
                            width:100
                        },
                        {
                            title: '数量',
                            key: 'nums',
                            width:70
                        },
                        {
                            title: '描述',
                            key: 'descript'
                        }
                    ],
                    listData:[
                        {
                            user:'客户客户客户',
                            date:'2018-06-19',
                            nums:90,
                            descript:'miaoshumiaoshu'
                        }
                    ]
                },
                condition:{
                    name:''
                },
                pages:{
                    number:1,
                    total:10
                },
                isShowShare:false
            }
        },
        methods:{
            doShareQQ(){
                window.open('http://connect.qq.com/widget/shareqq/index.html?title="厦门盘古人品牌管理有限公司 大鲲"&url=http://www.dakunchina.com/index.php')
            },
            doShareSina(){
                window.open('http://service.weibo.com/share/share.php?title="厦门盘古人品牌管理有限公司 大鲲"&url=http://www.dakunchina.com/index.php')
            },
            doShareDouban(){
                window.open('http://www.douban.com/recommend/?title="厦门盘古人品牌管理有限公司 大鲲"&url=http://www.dakunchina.com/index.php')
            },
            doShareQzone(){
                window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey??title="厦门盘古人品牌管理有限公司 大鲲"&url=http://www.dakunchina.com/index.php')
            },
            doShareRenren(){
                window.open('http://share.renren.com/share/buttonshare.do?title="厦门盘古人品牌管理有限公司 大鲲"&link=http://www.dakunchina.com/index.php')
            },
            hideShare(){
                this.isShowShare = false;
            },
            changeMenu(name){
                if(name == 1){
                    this.$router.push('/goods')
                }else if(name == 2){
                    this.$router.push('/users')
                }
            },
            doPostIn(){

            },
            doPostOut(){

            },
            doDel(id){

            },
            getOutList(id){
                this.dataOut.showList = true;
            },
            getInList(id){
                this.dataIn.showList = true;
            }
        }
    }

</script>


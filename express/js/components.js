/*
* 顶部导航
* */
Vue.component('top-nav',{
    template:`
    <header class="top-nav">
        <div class="frame1200">
            <a href="#" class="logo"><img src="images/index/logo-top.png"> </a>
            <nav>
                <div class="slide-bar" :style="{left:left}"></div>
                <a href="javascript:;" v-if="!showMenu" @click="showMenu = !showMenu"><img src="images/index/icon-menu.png"> </a>
                <a href="javascript:;" v-if="showMenu" @click="showMenu = !showMenu"><img src="images/index/icon-close.png"> </a>
                <transition enter-active-class="animated aniDu05 fadeInRight"
                            leave-active-class="animated aniDu05 fadeOutRight">
                <ul class='nav-list' v-if="showMenu">
                    <li v-for="(item,index) in navData" :class="navIndex == index ? 'active':''">
                        <a :href="item.link">{{item.name}}</a>
                        <ul class="second-list" v-if="item.list.length != 0">
                            <li v-for="childitem in item.list"><a :href="childitem.link">{{childitem.name}}</a> </li>
                        </ul>
                    </li>
                </ul>
                </transition>
            </nav>
        </div>
    </header>`,
    name: 'TopNav',
    props:['navIndex'],
    data(){
        return{
            showMenu:window.innerWidth>1200,
            navData:[
                {
                    name:'首页',
                    link:'index.html',
                    list:[]
                },
                {
                    name:'跨境出口物流服务',
                    link:'express-out.html',
                    list:[
                        {
                            name:'国际海运',
                            link:'express-out.html#title1'
                        },
                        {
                            name:'国际空运',
                            link:'express-out.html#title2'
                        },
                        {
                            name:'国际快递',
                            link:'express-out.html#title3'
                        },
                        {
                            name:'国际直邮专线',
                            link:'express-out.html#title4'
                        },
                        {
                            name:'FBA头程',
                            link:'express-out.html#title5'
                        },
                        {
                            name:'海外仓',
                            link:'express-out.html#title6'
                        }
                    ]
                },
                {
                    name:'跨境进口物流服务',
                    link:'express-in.html',
                    list:[
                        {
                            name:'境外取件',
                            link:'express-in.html#title1'
                        },
                        {
                            name:'香港取件',
                            link:'express-in.html#title2'
                        }
                    ]
                },
                {
                    name:'资讯公告',
                    link:'news.html',
                    list:[]
                },
                {
                    name:'学习中心',
                    link:'learn.html',
                    list:[
                        {
                            name:'系统说明',
                            link:'learn.html#title1'
                        },
                        {
                            name:'系统优势',
                            link:'learn.html#title2'
                        },
                        {
                            name:'发货流程',
                            link:'learn.html#title3'
                        },
                        {
                            name:'沟通交流',
                            link:'learn.html#title4'
                        },
                        {
                            name:'帮助支持',
                            link:'learn.html#title5'
                        },
                        {
                            name:'业务流程',
                            link:'learn.html#title6'
                        }
                    ]
                },
                {
                    name:'关于我们',
                    link:'about.html',
                    list:[
                        {
                            name:'公司简介',
                            link:'about.html#title1'
                        },
                        {
                            name:'企业文化',
                            link:'about.html#title2'
                        },
                        {
                            name:'合作伙伴',
                            link:'about.html#title3'
                        },
                        {
                            name:'联系我们',
                            link:'about.html#title4'
                        }
                    ]
                }
            ]
        }
    },
    mounted(){
        console.log(this.navIndex);
        let self = this;
        window.onresize = function(){
            self.resize();
        };
        self.resize();
    },
    computed:{
        left(){
            let pos;
            switch (this.navIndex){
                case "0":
                    pos = "-50px";
                    break;
                case "1":
                    pos = "80px";
                    break;
                case "2":
                    pos = "260px";
                    break;
                case "3":
                    pos = "410px";
                    break;
                case "4":
                    pos = "530px";
                    break;
                case "5":
                    pos = "650px";
                    break;
            }
            return pos
        }
    },
    methods:{
        resize(){
            if(window.innerWidth<1200){
                this.showMenu = false
            }else{
                this.showMenu = true;
            }
        }
    }
});

/*
 * 底部导航
 * */
Vue.component('footer-nav',{
    template:`
    <footer class="footer">
        <div class="frame1200">
            <div class="line1">
                <div><img src="images/index/logo-footer.png"> </div>
                <p>Logistic was founded to make a mark in London’s Clearing and Forwarding industry. Logistic started its operations in all the <br>major cities in Europe with the aim to offer the bestin logistics services.</p>
            </div>
            <div class="line2">Copyright © 2012-2015 Logistics Theme by Stylemix Themes. All rights reserved.</div>
        </div>
    </footer>`,
    name:'FooterNav',
    data(){
        return{}
    }
});

/*
 * 底部导航
 * */
Vue.component('banner',{
    template:`
    <div class="banner">
        <slot name="img"></slot>
        <div class="content">
            <slot name="title"></slot>
            <slot name="subTitle"></slot>
        </div>
    </div>`,
    name:'Banner',
    data(){
        return{}
    }
});
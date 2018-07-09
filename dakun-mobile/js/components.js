/*
 底部菜单
 */
Vue.component('footer-nav',{
    template:`
    <div class="footer-nav">
        <div class="share-frame">
            <a href="#" class="btn-share"><img src="${conf.base_url}images/share-bottom.png"> </a>
            <ul>
                <li><a href="javascript:;" class="icon-qq" @click="doShareQQ"></a> </li>
                <li>
                    <a href="javascript:;" class="icon-wechat"></a>
                    <div><img src="${conf.base_url}images/link-wechat.png" width="100"> </div>
                </li>
                <li><a href="javascript:;" class="icon-sina" @click="doShareSina"></a> </li>
                <li><a href="javascript:;" class="icon-douban" @click="doShareDouban"></a> </li>
                <li><a href="javascript:;" class="icon-qzone" @click="doShareQzone"></a> </li>
                <li><a href="javascript:;" class="icon-renren" @click="doShareRenren"></a> </li>
            </ul>
        </div>
        <div class="customer-frame">
            <span>0592-5172062</span>
            <a href="#" class="btn-customer"></a>
        </div>

    </div>`,
    name: 'FootNav',
    props:['index'],
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
        }
    }
});

/*
 顶部导航
 */
Vue.component('top-nav',{
    template:`
    <div class="top-nav" :class="isMenu?'top-nav-slide':''">
        <div class="clearfix">
            <a href="#" class="logo"><img src="${conf.base_url}images/logo1.png"></a>
            <a href="javascript:;"class="btn-menu" @click="showMenu"><img src="${conf.base_url}images/menu.png"> </a>
            <nav class="nav">
                <ul>
                    <li :class="slideindex == 1 ? 'active':''"><a href="javascript:;" @click="slideTo(0)">首页</a> </li>
                    <li :class="slideindex == 2 ? 'active':''"><a href="javascript:;" @click="slideTo(1)">最新动态</a> </li>
                    <li :class="slideindex == 3 ? 'active':''"><a href="javascript:;" @click="slideTo(2)">新品发布</a> </li>
                    <li :class="slideindex == 4 ? 'active':''"><a href="javascript:;" @click="slideTo(3)">会员通道</a> </li>
                    <li :class="slideindex == 4 ? 'active':''"><a href="javascript:;" @click="slideTo(4)">关于大鲲</a> </li>
                    <li :class="slideindex == 6 ? 'active':''"><a href="javascript:;" @click="slideTo(5)">携手共赢</a> </li>
                    <li :class="slideindex == 7 ? 'active':''"><a href="javascript:;" @click="slideTo(6)">联系我们</a> </li>
                </ul>
            </nav>
        </div>
    </div>`,
    name:'TopNav',
    data:function(){
        return {
            isMenu:false
        }
    },
    props:['slideindex'],
    methods:{
        showMenu:function(){
            this.isMenu = false;
        },
        slideTo:function(index){
            app.hideNews();
            app.showRectList = true;
            app.mySwiper.swipeTo(index, 300, false);
            app.slideIndex = index + 1;
        }
    }
});

Date.prototype.format = function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
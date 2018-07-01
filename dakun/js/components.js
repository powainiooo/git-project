/*
    底部菜单
 */
Vue.component('footer-nav',{
    template:`
    <div class="footer-nav">
        <a href="#" class="btn-share"><img src="images/share-bottom.png"> </a>
        <div class="lines">
            <ul>
                <li v-for="item in 7"></li>
            </ul>
            <div class="bar" :style="{left:((index-1)*40+index)+'px'}"></div>
        </div>
        <a href="#" class="btn-customer"><img src="images/customer-bottom.png"> </a>
    </div>`,
    name: 'FootNav',
    props:['index']
});

/*
 顶部导航
 */
Vue.component('top-nav',{
    template:`
    <div class="top-nav">
        <a href="#" class="logo"><img src="images/logo-top.png"></a>
        <nav class="nav">
            <ul>
                <li><a href="#">官方首页</a> </li>
                <li><a href="#">活动咨询</a> </li>
                <li><a href="#">会员中心</a> </li>
                <li><a href="#">商务合作</a> </li>
            </ul>
        </nav>
        <a href="#" class="btn-mall">官方商城</a>
        <nav class="nav nav2">
            <ul>
                <li><a href="#">About</a> </li>
                <li><a href="#">Contact</a> </li>
            </ul>
        </nav>
    </div>`,
    name:'TopNav'
});
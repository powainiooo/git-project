
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? './static'
  : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: 'https://web.uat.leesticket.com'
    // proxy: 'https://editor.leesticket.com'
  }
}
/*
* a2ropq
* https://leesticket.waiting8.com/NVcfRhyJlY.php  http://editor.leesticket.waiting8.com/#/login  https://editor.uat.leesticket.com/#/login
帐号：leesticket
密码：nihao123
*
* https://web.uat.leesticket.com/NVcfRhyJlY.php
leesticket
nihao123
*
ip：58.220.46.36
端口：21
账号：editor_uat_leesticket
密码：kHA4sfwPNai8iEk8
* 13723797362 hohodiaozhale 123456 18023095011 hohodiaozhale 13727864554 123456  13044271912  123456 13819273918 123456
*
* 测试 web.uat.leesticket.com
* 生产 web.leesticket.com
* */

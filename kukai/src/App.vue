<style>
.wrapper div { margin: 10px; border-bottom: 1px solid #cacaca;}
.wrapper h3 { font-size: 18px; font-weight: bold;}
.wrapper p { text-indent: 2em; margin: 10px 0;}
.wrapper button { border: 1px solid #cacaca; background-color: transparent; padding: 6px 15px; border-radius: 6px;}
.wrapper input { width: 100%; box-sizing: border-box; margin-bottom: 10px; border: 1px solid #cacaca; background-color: transparent; padding: 6px 15px; border-radius: 6px;}
.wrapper img { width: 50%;}
</style>
<template>
<div class="wrapper">
   <div>
      <h3>设置target：</h3>
      <p>已连接设备业务模块clientId，通过业务方获取，
         不指定时默认为ss-clientID-runtime-h5-channel</p>
      <input v-model="targetID" placeholder="请输入模块clientId" />
   </div>
   <div>
      <h3>sendMsg</h3>
      <p>测试发送文字消息：{{msg}}</p>
      <p><button @click="send1">发送</button></p>
   </div>
   <div>
      <h3>发送图片base64</h3>
      <p>使用sendMsg方法发送，图片如下</p>
      <p><img src="@/assets/img/wheel.png" /></p>
      <p><button @click="send2">发送</button></p>
   </div>
   <div>
      <h3>发送网络图片</h3>
      <p>使用sendImageMsg方法发送，图片如下</p>
      <p><img :src="imgSrc" /></p>
      <p><button @click="send3">发送</button></p>
   </div>
</div>
</template>

<script>
import vConsole from 'vconsole'
import ccApp from "@swaiot/jssdk";
const channel = ccApp.requireModule("channel");
const vconsole = new vConsole()
import imgData from '@/utils/imgData'
console.log(imgData)

export default {
	name: "App",
	data() {
		return {
			targetID: '',
			msg: '这是一条文字消息，睿云测试。',
			imgbase64: imgData.data,
			imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F88%2F98%2F82%2F58%2F126b5e6d3e94f5740fbaba4fe9f590a9.jpg%21w700wb&refer=http%3A%2F%2Fimages.669pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614082455&t=973257289aa38bcaacc7ba71afea5588'
		}
	},
	mounted() {
		if (typeof ccApp.getSystemInfo === 'function') {
			ccApp.getSystemInfo({
				success (res) {
					console.log('---------getSystemInfo------------')
					console.log(res)
				}
			})
		}
	},
	methods: {
		send1 () {
			const params = {
				content: this.msg
			}
			console.log('sendMsg params', params)
         console.log('typeof channel.sendMsg', typeof channel.sendMsg)
			channel.sendMsg({
				target: this.targetID === '' ? 'ss-clientID-runtime-h5-channel' : this.targetID,
				content: JSON.stringify(params),
				success (res) {
					console.log('sendMsg success', res)
				},
				fail (err) {
					console.log('sendMsg fail', err)
				}
			})
		},
		send2 () {
			const params = {
				content: this.imgbase64
			}
			console.log('sendMsg base64 params', params)
			console.log('typeof channel.sendMsg', typeof channel.sendMsg)
			channel.sendMsg({
				target: this.targetID === '' ? 'ss-clientID-runtime-h5-channel' : this.targetID,
				content: JSON.stringify(params),
				success (res) {
					console.log('sendMsg success', res)
				},
				fail (err) {
					console.log('sendMsg fail', err)
				}
			})
      },
		send3 () {
			console.log('sendMsg url', '网络图片测试', this.imgSrc)
			console.log('typeof channel.sendImageMsg', typeof channel.sendImageMsg)
			channel.sendImageMsg({
				title: '网络图片测试',
				url: this.imgSrc,
				success (res) {
					console.log('sendMsg success', res)
				},
				fail (err) {
					console.log('sendMsg fail', err)
				}
			})
      }
	},
};
</script>

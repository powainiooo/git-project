import Watcher from "../Watcher"
// 定义响应式数据
// 收集依赖
function defineReactive(data, key, val) {
	let dep = new Dep() // 依赖储存
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get() {
			console.log('get')
			// 假设依赖是一个函数 存在window.target上
			dep.depend()
			return val
		},
		set(newVal) {
			console.log('set')
			if (val === newVal) return
			val = newVal
			dep.notify()
		}
	})
}
const obj = {
	a: {
		b: 1
	}
}
const watch = new Watcher(obj, 'a.b', (newVal, oldVal) => {
	console.log('value watch', newVal, oldVal)
})
obj.a.b = 2
console.log(obj)

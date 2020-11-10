export default class Dep {
	constructor() {
		this.subs = []
	}
	addSub (sub) {
		this.subs.psuh(sub)
	}
	removeSub (sub) {
		remove(this.subs, sub)
	}
	depend () {
		if (window.target) {
			this.addSub(window.target)
		}
	}
	notify () {
		const subs = this.subs.slice()
		for (let sub of subs) {
			sub.update()
		}
	}
}

function remove(arr, item) {
	if (Array.isArray(arr)) {
		const i = arr.indexOf(item)
		if (i > -1) {
			return arr.splice(i, 1)
		}
	}
}

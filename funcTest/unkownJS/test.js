// function setName(obj) {
// 	obj.name = 'nic'
// 	obj = new Object()
// 	obj.name = 'greg'
// }
// let person = new Object()
// setName(person)
// console.log(person.name)

// let rxg = new RegExp()
// console.log(typeof rxg)
//
// let obj = {
// 	name: 'name',
// 	age: 18,
// 	qs: '22'
// }
// function aa() {
// 	let qs = 'aa'
// 	with (obj) {
// 		var url = name + qs
// 	}
// 	return url
// }
// console.log(aa())

// console.log(sum(10, 10))
// function sum(a, b) {
// 	return a + b
// }
// var sum = function (a, b) {
// 	return a + b + 2
// }
// console.log(sum(10, 10))

// function factor (num) {
// 	if (num <= 1) {
// 		return 1
// 	} else {
// 		let a = arguments.callee(num - 1)
// 		console.log(a)
// 		return num * a
// 	}
// }
//
// console.log(factor(5))

// var color = 'red'
// var obj = {
// 	color: 'blue'
// }
// function say() {
// 	console.log(this.color)
// 	console.log(arguments)
// }
// function say2() {
// 	say()
// }
// console.log(say.valueOf())
// console.log(say.toString())

// var num = new Number(10)
// console.log(num)
//
// eval('console.log("this is eval")')

// function Person(name) {
// 	this.name = name
// 	this.say = function () {
// 		console.log(this.name)
// 	}
// }
// function person(name) {
// 	this.name = name
// 	this.say = function () {
// 		console.log(this.name)
// 	}
// }
// const p1 = new Person('tom')
// const p2 = new person('tom')
// console.log(typeof p1)
// console.log(typeof p2)
// console.dir(document)

var a = 3;
var b = 4;
// console.log('a:', a, ',b:', b)
[a, b]=[b, a]
console.log('a:', a, ',b:', b)






















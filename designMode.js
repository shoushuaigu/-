// 工厂模式
// function createObj(name,arr) {
//     var o = new Object()
//     o.name = name
//     o.arr = arr
//     o.getArr = function () {
//         return this.arr
//     }
//     return o
// }
// var o1 = createObj('gss',[1,2])
// var o2 = createObj('vic',[1,2,3])
// console.log(o1,o2)
// o1.arr.push(4)
// console.log(o1,o2)
// console.log(o1 instanceof Object)
// console.log(o1.constructor === Object)

// 构造函数模式
// var Person = function (name,age,sex) {
//     this.name = name
//     this.age = age
//     this.sex = sex
//     this.arr = [1,2]
//     this.sayName = function () {
//         console.log(this.name)
//     }
//     this.getAge = new Function('return this.age')
// }
// var p1 = new Person('gss',18,'man')
// var p2 = new Person('vic',20,'man')
// // console.log(p1,p2)
// p1.arr.push(3)
// console.log(p1.arr) //[1,2,3]
// console.log(p2.arr) //[1,2]
// console.log(p1.getAge())    //18
// console.log(p1 instanceof Person)   //true
// console.log(p2 instanceof Person)   //true
// console.log(p1 instanceof Object)   //true
// console.log(p1.sayName === p2.sayName)   //false

// 原型模式
// function Person(){}
// Person.prototype.name = 'gss'
// Person.prototype.arr = [1,2]
// Person.prototype.getName = function () {return this.name}
// var p1 = new Person()
// var p2 = new Person()
// console.log(Person.prototype.constructor === Person)    //true
// console.log(p1.__proto__ === Person.prototype)  //true
// console.log(Object.getPrototypeOf(p1) === Person.prototype) //true
// console.log(Person.prototype.isPrototypeOf(p1)) //true
// console.log(p1.getName === p2.getName)   //true
// console.log(p1.hasOwnProperty('name'))  //false
// p1.name = 'vic'
// console.log(p1.hasOwnProperty('name'))  //true
// console.log(p2.hasOwnProperty('name'))  //false
// console.log('name' in p2)   //true
// console.log(Object.getOwnPropertyNames(p1)) //['name']
// console.log(Object.getOwnPropertyNames(p2)) //[]
// console.log(Object.getOwnPropertyNames(Person.prototype))   //[ 'constructor', 'name', 'arr', 'getName' ]
// p1.arr.push(3)
// console.log(p1.arr,p2.arr)  //[1,2,3],[1,2,3]
// console.log(Object.getOwnPropertyNames(Array.prototype))
// console.log(Person.prototype.__proto__ === Object.prototype)
// console.log(Object.prototype.constructor === Object)
// console.log(new Object().__proto__=== Object.prototype)

// 组合构造函数和原型模式
// function Person(name,age){
//     this.name = name
//     this.age = age
//     this.arr = [1]
// }
// Person.prototype = {
//     constructor:Person,
//     sayName:function () {
//         console.log(this.name)
//     }
// }
// var p1 = new Person('gss',18)
// var p2 = new Person('vic',20)
// console.log(p1.sayName === p2.sayName)  //true
// p1.arr.push(2)
// console.log(p1.arr,p2.arr)  //[1,2],[1]

// 动态原型模式
// function Person (name){
//     this.name = name
//     console.log(typeof this.sayName)    //p1时:undefined;p2时:function
//     if(typeof this.sayName != 'function'){  //只判断一个属性即可
//         Person.prototype.sayName = function () {
//             return this.name
//         }
//         Person.prototype.concat = function () {
//             return this.name+'concat'
//         }
//     }
// }
// var p1 = new Person('gss')
// var p2 = new Person('vic')

// 寄生构造函数
// function SpliceArr(){
//     var newarr = new Array()
//     newarr.push(...arguments)
//     newarr.spliceJoin = function () {
//         return this.join('|')
//     }
//     return newarr
// }
// var a = new SpliceArr(1,2,3)
// console.log(a.spliceJoin()) //1|2|3

// 稳妥构造函数模式
// function Person(name) {
//     var o = new Object()
//     var age = 18    //自定义的私有变量
//     o.sayName = function () {   //非共享的方法
//         return name     //直接用传入的参数,没有用this接受
//     }
//     o.getAge = function () {
//         return age
//     }
//     return o
// }
// var p = Person('gss')
// console.log(p.sayName())
// console.log(p.getAge())

// 继承

// 原型继承
// function Super() {
//     this.SuperFlag = false
//     this.SuperArr = [1]
// }
// Super.prototype.SuperGetFlag = function () {
//     return this.SuperFlag
// }
// function Sub(){
//     this.SubFlag = true
// }
// Sub.prototype = new Super()
// Sub.prototype.SubGetFlag = function () {
//     return this.SubFlag
// }
// var sub = new Sub()
// var sub2 = new Sub()
// console.log(sub.SubGetFlag())
// console.log(sub.SuperGetFlag())
// sub.SuperArr.push(1)
// console.log(sub.SuperArr,sub2.SuperArr)
// console.log(Sub.prototype.__proto__ === Super.prototype)
// console.log(Sub.prototype.__proto__.constructor === Super)
// console.log(Object.getOwnPropertyNames(sub))
// console.log(Object.getOwnPropertyNames(Sub.prototype))
// console.log(Object.getOwnPropertyNames(Sub.prototype.__proto__))

//构造函数继承
// function Super(name){
//     this.name = name
//     this.arr = [1]
// }
// Super.prototype.getName = function () {
//     return this.name
// }
// Super.prototype.sex = 'man'
// var sup = new Super('gss')
// function Sub(age,name){
//     Super.call(this,name)
//     this.age = age
// }
// Sub.prototype.getAge = function () {
//     return this.age
// }
// Sub.prototype.add = function () {
//     this.arr.push(1)
// }
// var sub = new Sub(18,'vic')
// var sub2 = new Sub(20,'vic')
// console.log(sub.getAge())   //18
// console.log(sub2.getAge())   //20
// sub.add()
// console.log(sub.arr,sub2.arr)   //[1,1],[1]
// console.log(sub.sex)    //undefined
// // console.log(sub.getName())   //undefined     子类不会继承父类的原型属性
// console.log(Object.getOwnPropertyNames(Sub.prototype))  //[ 'constructor', 'getAge', 'add' ]
// console.log(Sub.prototype.constructor === Sub)  //true
// console.log(Sub.prototype === sub.__proto__)  //true
// console.log(Object.getOwnPropertyNames(Sub))    //[ 'length', 'name', 'arguments', 'caller', 'prototype' ]
// console.log(Object.getOwnPropertyNames(sub))    //[ 'name', 'arr', 'age' ]

// 组合继承
// function Super(name){
//     this.name = name
// }
// Super.prototype.getName = function () {
//     return this.name
// }
// function Sub(age,name) {
//     Super.call(this,name)
//     this.age = age
// }
// Sub.prototype = new Super('vic')    //子类原型继承父类实例,问题:会把父类的实例属性挂在子类原型上,和上边call()继承实例属性重复
// Sub.prototype.constructor = Sub     //constructor重新指向Sub
// Sub.prototype.getAge = function () {
//     return this.age
// }
// var sub = new Sub(18,'gss')
// console.log(sub)
// console.log(sub.getAge(),sub.getName())
// console.log(Object.getOwnPropertyNames(Sub.prototype))  //[ 'name', 'constructor', 'getAge' ]
// console.log(Object.getOwnPropertyNames(Super.prototype))    //[ 'constructor', 'getName' ]
// console.log(Object.getOwnPropertyNames(sub))    //[ 'name', 'age' ]
// console.log(sub.name)   //gss   子类实例上的name
// delete sub.name     //删除实例name
// console.log(sub.name)    //vic  子类原型上的name(父类实例的name)

// function Sub2(age,name){
//     Super.call(this,name)
//     this.age = age
// }
// Sub2.prototype = Super.prototype    //直接用父类原型,避免父类实例属性挂在子类原型上
// Sub2.prototype.constructor = Sub2
// Sub2.prototype.getAge = function () {
//     return this.age
// }
// var sub2 = new Sub2(19,'ggg')
// console.log(sub2)
// console.log(sub2.getAge(),sub2.getName())
// console.log(Object.getOwnPropertyNames(Sub2.prototype))     //[ 'constructor', 'getName', 'getAge' ]
// console.log(Object.getOwnPropertyNames(sub2))   //[ 'name', 'age' ]
// console.log(sub2.name)  //gss
// delete sub2.name
// console.log(sub2.name)  //undefined

// 原型式继承
function object(o){     //es6中用Object.create()规范了此写法
    function F(){}      //内部定义一个构造函数
    F.prototype = o     //构造函数的原型接受(继承)传入的对象o
    return new F()      //返回否早函数的实例
}

var obj = {
    name:'qq',
    arr:[1]
}
var fo = object(obj)
console.log(fo,fo.name,fo.arr)  //fo是{},因为没有实例属性,obj的属性在[[prototype]]上
console.log('--------------')

var o = Object.create(obj)  //可以理解为继承一个对象, 添加的属性是在原型下
console.log(o)  //{}
console.log(o.__proto__)    //{ name: 'qq', arr: [ 1 ] }
console.log(o.name,o.arr)   //qq [ 1 ]
var o2 = Object.create(obj,{name:{value:'kk'}}) //属性吗描述符不写默认为false
console.log(o2) //{}
console.log(o2.name,o2.arr) //kk [ 1 ]
o.name = 'oo'
o.arr.push(2)
o2.name = 'll'  //不可写,不可枚举,不可配置
console.log(o.name,o.arr,o2.name,o2.arr)    //oo [ 1, 2 ] kk [ 1, 2 ]
console.log(Object.getOwnPropertyNames(o2)) //['name']  说明添加的属性是实例属性,只是没有设置可枚举

// Object.create()实现继承
function Super(name) {
    this.name = name
}
Super.prototype.getName = function () {
    return this.name
}
function Sub(name){
    Super.call(this,name)
}
Sub.prototype = Object.create(Super.prototype,{age:{value:19}}) //如果是构造函数的话(子类),需要用原型接收,因为Obejct.create()创建的是目标对象的[[prototype]],也就是子类实例的__proto__即子类原型对象
Sub.prototype.constructor = Sub
var s = new Sub('gss')
console.log(s.name,s.getName(),s.age)     //gss,gss,19
console.log(Object.getOwnPropertyNames(s.__proto__))    //[ 'age', 'constructor' ],age是在[[prototype]]上的,因为直接用子类构造函数的原型接收了
console.log(s instanceof Sub)       //true
console.log(s instanceof Super)     //true  原型链上出现过的构造函数都会返回true



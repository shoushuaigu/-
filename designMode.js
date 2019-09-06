// var dl = (function (param) {
//     var obj 
//     return function (param) {
//         return obj || (obj = {name:param})
//     }
// })()

// var u1 = new dl('gss')
// var u2 = new dl('vic')
// console.log(u1)
// console.log(u2)

// class Only {
//     constructor(name){
//         this.name = name
//         this.instance = null
//     }
//     static getInstance(name){
//         return this.instance || (this.instance = new Only(name))
//     }
// }


// var n = Only.getInstance('gss')
// var v = Only.getInstance('vic')
// console.log(n)
// console.log(v)
var fns = []
for(let i=0;i<5;i++){
    // return (function () {
    //     console.log(i)
    // })()
    fns[i] = function () { console.log(i) }
    // (function (i) {
    //     let a = i
    //     fns.push(function () {console.log(a)})
    // })(i)
}
console.log(fns)
console.log(fns[0](),'--')
console.log(fns[4](),'--')

function Name(name) { 
    this.name = name
}
Name.prototype.getName = function () { 
    return this.name
}

var n = new Name('gss')
console.log(n)
console.log(n.prototype)
console.log(n.__proto__ === Name.prototype)
console.log(Name.prototype.constructor === Name)
console.log(Name.__proto__ === Object.prototype)
console.log(Name.prototype.__proto__)
console.log(Name.__proto__)
console.log('--------------')

function createObj(name,age) {
    var o = new Object()
    o.name = name
    o.age = age
    return o
}

var gss = createObj('gss',18)
console.log(gss)
console.log(gss instanceof Object)
console.log(gss instanceof createObj)
console.log(typeof gss)
console.log(typeof createObj)

function Person(name) {
    this.name = name
    this.getname = function () {
        return this.name
    }
}
var p = new Person('vic')
console.log(p,p.getname())
console.log(p.constructor === Person)
console.log(p.__proto__.constructor === Person)
var o = new Object()
Person.call(o,'gss')
console.log(o)
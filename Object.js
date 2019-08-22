/*
* Object方法
* https://www.cnblogs.com/mopagunda/p/8328084.html
* */
/*
* 深浅拷贝: 对象A,对象B
*   浅拷贝:改变任意一个,两个都改变(栈内存的value是指向堆内存的地址)
*   深拷贝:改变相互不影响,深层嵌套的对象也不会影响
*       深拷贝方法:1.递归 2.JSON.stringify,JSON.parse
* https://www.cnblogs.com/echolun/p/7889848.html
* */

//####  Object.assign(target,source)
//对象合并(目标对象,源对象),相同属性名会覆盖,浅拷贝(简单的一层对象是深拷贝效果,多层时就暴露出是浅拷贝,同slice,concat)
//不能拷贝到继承和原型上的属性、方法
var target = {name:'gss',age:18};
var assign_target = Object.assign(target);
console.log(assign_target);
var source = {sex:'man',obj:{flag:true}};
Object.assign(target,source);   //合并到target
var copy_target = target;
console.log(target,source);
// { name: 'gss', age: 18, sex: 'man', obj: { flag: true } }
// { sex: 'man', obj: { flag: true } }

target.sex = 'woman';
target.obj.flag = false;
// source.sex = 'woman';
console.log(target,source,copy_target);
// { name: 'gss', age: 18, sex: 'woman', obj: { flag: false } }
// { sex: 'man', obj: { flag: false } }
// { name: 'gss', age: 18, sex: 'woman', obj: { flag: false } }

copy_target.sex = 'other';
copy_target.obj.flag = '';
console.log(target,source,copy_target);
// { name: 'gss', age: 18, sex: 'other', obj: { flag: '' } }
// { sex: 'man', obj: { flag: '' } }
// { name: 'gss', age: 18, sex: 'other', obj: { flag: '' } }

//#### target = Object.create(proto,[properiesObject])
//参数:proto:target的原型对象,
//     properiesObject:target上的自身属性对象,
//          包含的属性:configurable(是否可配置即修改删除,false),enumerable(是否可枚举,false),writable(是否可写即添加新属性,false)
//                      get,set函数 undefined;
var newObject = new Object({name:'vic'});
var createObject = Object.create({name:'vic'},{age:{value:19,enumerable:true}});//enumerable为true时才会显示
console.log(newObject);     //{ name: 'vic' }
console.log(newObject.__proto__);     //{}
console.log(createObject);  //{age: 19 }
console.log(createObject.__proto__,createObject.prototype,createObject.__proto__.constructor);  //{ name: 'vic' } undefined [Function: Object]
console.log(createObject.name);  //'vic'
//实现继承
function Father() {
    this.name = 'name';
    this.age = 'age';
}
Father.prototype.create = function (name,age) {
    this.name = name;
    this.age = age;
    console.log(this.name,this.age)
}

function Son() {
    Father.call(this)
}
// Son.prototype = Object.create(Father.prototype)
var ex = new Son()
ex.create('gss',18)

/*
*   Person.prototype = p1.__proto__
*   Person.prototype.constructor = Person
* */
const prv = Symbol('prv');
const prv2 = Symbol('prv');
// console.log(prv == prv2);    //false
class Sup {
    // _hob = "movie";
    constructor(name,age){
        this.name = name;
        this.age = age;
        this.constData = '固定实例属性';
        console.log(new.target,'target')
    }
    get value(){
        return this.constData
    }
    set value(v){
        this.constData = v;
        console.log(this.value)
    }
    getName(){
        console.log(this.name);
    }
    changeName(name){
        this.name = `改变姓名${name}`;
        console.log(this.name);
    }
    // getStatic(){
    //     this.showSm()   //报错,this指向实例,静态方法需要类调用
    // }
    static  getStatic(){
        this.showSm()   //静态方法中this指向类,能调用,相当于Sup.showSm()
    }
    static showSm(){
        console.log('静态方法不能被实例继承,可被子类继承,直接通过类来调用')
    }
    getPrv(){
        this[prv]()
    }
    [prv](){
        console.log('私有方法');
    }
}


class Sub extends Sup {
    constructor(name,age){
        super(name,age);
    }
    getAge(){
        console.log(this.age);
    }
}

const sup_case = new Sup('gss',18);
const sub_case = new Sub(...['vic',20]);
console.log(sup_case.value)
sup_case.value = 123;
console.log(sup_case.value)
// sup_case.getPrv();
// sup_case[prv]();
// sub_case.getPrv();
// sub_case[prv]();
// console.log(Sup.name);
// Sup.showSm();
// Sup.getStatic();
// Sub.getStatic();
// console.log(Sup.constData);
// console.log(sup_case.constData);
// console.log(sub_case.constData);
// console.log(Sup._hob);
// sup_case.getName();
// sub_case.getAge();
// sub_case.getName();
// sup_case.changeName('test');
// sub_case.changeName('vvv');


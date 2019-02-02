var a = [1,2,2,3,4,2,1,1,4,3,2]
var b = [...new Set(a)]
// console.log(...new Set(a));
// console.log(a);
var c =[]
a.filter((v,i,arr)=>{
    if(i===arr.indexOf(v)) c.push(v)
})
// console.log(c);
var obj ={}
a.filter((v,i,arr)=>{
    if(i!=arr.indexOf(v)) {
        obj[v]=obj[v]?obj[v]+1:1+1;
    }
})
// console.log(obj);
// console.log(...Object.values(obj));
// console.log(Math.max(...Object.values(obj)));
function f1() { 
    var n=1;
    add = function () { 
        n+=1
     }
    function f2() { 
        n+=1
        // console.log(n);
     }
     return f2
 }
var t1 = f1()
// add()
t1()
// add()
t1()
t1()
t1()
t1()
var fs = require('fs')
fs.readFile('./node.md',(err,data)=>{
    // console.log(new Buffer(data,'base64').toString());
    // fs.writeFile('test.js',data,(err)=>{})
})
// fs.mkdir('test',(err)=>{
//     console.log(err);
// })
// fs.rmdir('test',(err)=>{console.log(err);})
// fs.appendFile('test.js',"(function(){console.log('攻击')})();\n",err=>{console.log('err'+err);});


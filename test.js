
var arr = ['aa','bbb','ccc','ddd'];
var str = 'abcdef'
for(var v of arr){
    console.log(v);
}
for(var v of str){
    console.log(v);
}

return
var i = 0;
while(i<10){
    console.log(i);
    i++
}
do{
    console.log(i);
    i++
}while(i<10)
return
var arr = [1,2,3,4,5];
var he = arr.reduceRight(function(a,b,i,arr){
    return a+b
})
console.log(he);
var str = ['aa','bbb','ccc','ddd']
var lengthMax = str.reduce(function(a,b){
    return a.length>b.length?a:b
})
console.log(lengthMax);

return

var arr = [1,2,3]
var bool = arr.some(function(el,index,arr){
    return el>1
})
var bool2 = arr.every(function(el,index,arr){
    return el>1
})
console.log(bool);
console.log(bool2);

return
var arr = [1,2,3,4];
var obj = {max:3}
var arrFilter = arr.filter(function(el,index,arr){
    return el%2==0
})
console.log(arrFilter);
var arrFilter2 = arr.filter(function(el,index,arr){
    return el<=this.max
},obj)
console.log(arrFilter2);

return
var obj = {name:'gss',age:18};
for(var item in obj){
    if(obj.hasOwnProperty(item)){
        console.log(item);
        console.log(obj[item]);
    }
}
return
var num = [1,2,3];
var str = ['一','二','三']
var arr = num.map(function(el){
    return el+1
})
console.log(arr);
console.log(num);
var arr2 = num.map(function(el){
    return this[el]
},str)
console.log(arr2);
return 
var arr = [
    {"id":21,"uniqueKey":"m:sys:role:test","parentKey":"m:sys:role","permissionName":"权限管理","permissionType":0,"leafNode":1,"description":"系统权限管理","child":null},
    {"id":20,"uniqueKey":"m:sys:role","parentKey":"m:sys","permissionName":"角色管理","permissionType":0,"leafNode":1,"description":"系统角色管理","child":null},
    {"id":19,"uniqueKey":"m:sys:user","parentKey":"m:sys","permissionName":"用户管理","permissionType":0,"leafNode":1,"description":"系统用户管理","child":null},
    {"id":11,"uniqueKey":"m:sys","parentKey":"0","permissionName":"系统","permissionType":0,"leafNode":1,"description":"系统权限","child":null},
    {"id":0,"uniqueKey":"*","parentKey":"0","permissionName":"所有权限","permissionType":0,"leafNode":0,"description":"系统所有的权限","child":null}]
function filterParentArr(arr){
    const filteredArr = arr.filter(item=>{
        return item.parentKey==0
    });
    return filteredArr;
}
function filterSonArr(arr,parr){
    const filteredArr = arr.filter(item=>{
        if(item.parentKey!=0){
            return true
        }
        return false
    });
    return filteredArr
}
function filterGSonArr(arr,parr){
    const filteredArr = arr.filter(item=>{
        if(item.parentKey!=0){
            if(item.uniqueKey.split(':').length==4){
                return true;
            }
            return false
        }
        return false
    });
    return filteredArr
}
function concatArr (p,s,g){
    s.forEach(item=>{
        item.children=item.children&&item.children.length?item.children:[];
        p.forEach(el=>{
            el.children=el.children&&el.children.length?el.children:[];
            if(el.uniqueKey===item.parentKey){
                // console.log(item);
                g.forEach(gl=>{
                    if(item.uniqueKey===gl.parentKey){
                        item.children.push(gl)
                    }
                })
                el.children.push(item);
            }
        })
    })
    return p
}
// console.log(filterParentArr(arr));
// console.log(filterSonArr(arr));
// console.log(filterGSonArr(arr));
let p = filterParentArr(arr);
let s = filterSonArr(arr);
let g = filterGSonArr(arr);
console.log(concatArr(p,s,g));

// var parentArr =[]
// var sonArr =[]
// var treeArr =[]
// arr.forEach(item=>{
//     if(item.parentKey==0){
//         parentArr.push(item)
//     }else{
//         sonArr.push(item)
//     }
// })
// parentArr.forEach(parent=>{
//     parent.children=[];
//     sonArr.forEach(son=>{
//         if(son.parentKey==parent.uniqueKey){
//             parent.children.push(son);
//         }
//     })
// })
// console.log(parentArr);

function getTreeArr(arr){
    var parentArr =[]
    var sonArr =[]
    var gsonArr =[]
    arr.forEach(item=>{
        if(item.parentKey==0){
            parentArr.push(item)
        }else{
            if(item.uniqueKey.split(':').length==3){
                sonArr.push(item)
            }else if(item.uniqueKey.split(':').length==4){
                gsonArr.push(item)
            }
        }
    })
    parentArr.forEach(parent=>{
        parent.children=parent.children&&parent.children.length?parent.children:[];
        sonArr.forEach(son=>{
            son.children=son.children&&son.children.length?son.children:[];
            if(son.parentKey==parent.uniqueKey){
                gsonArr.forEach(gson=>{
                    gson.children=gson.children&&gson.children.length?gson.children:[];
                    if(gson.parentKey==son.uniqueKey){
                        
                        son.children.push(gson);
                    }
                })
                parent.children.push(son);
            }
        })
    })
    return parentArr
}


return;
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


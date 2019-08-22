function sleep(time) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve('str')},time)
    })
}
async function fn() {
    for (let i=0;i<5;i++){
        console.log(i);
        let str = await sleep(1000);
        console.log(str);
    }
}
fn();
const ABC = 'abc';
var obj = {
    abc:'123'
};
console.log(obj[ABC]);
// 会忽略 undefined
// 会忽略 symbol
// 不能序列化函数
// 不能解决循环引用的对象
let newObj = JSON.parse(JSON.stringify(obj));

function deepCopy (obj) {
    if (typeof obj == 'object') {
        var result = obj.constructor == Array ? [] : {};
        for (let i in obj) {
            result[i] = typeof obj[i] == 'object' ? deepCopy(obj[i]) : obj[i];
        }
    } else {
        var result = obj;
    }
    return result;
}
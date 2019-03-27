let arr = [1,[1,2], [1, 3, [4, 5], 6], 7, 8];

//es6
let result = arr.flat();

//利用toString方法，有缺陷
let result1 = arr.toString().split(',').map(x => +x);

//正则，有缺陷，
function flatten (arr) {
    let str = JSON.stringify(arr).replace(/\[|\]/g, '');
    return JSON.parse(Array.of(`[${str}]`)[0]);
}

//递归
function recursion (arr) {
    let newArr = [];
    arr.forEach(item => {
        if (!Array.isArray(item)) {
            newArr.push(item);
        } else {
            newArr = newArr.concat(recursion(item));
        }
    });
    return newArr;
}

//循环结合扩展运算符
function loop (arr) {
    while(arr.some(x => Array.isArray(x))) {
        arr = [].concat(...arr);
    }
    return arr;
}


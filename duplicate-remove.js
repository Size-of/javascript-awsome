let arr = [2, 1, 1, 1, 2, 2, 3, 4, 2, 1, 5, 4, 3, 2, 1];

//es6
let result = [...new Set(arr)];

//通过对象的属性
function removeByObj (array) {
    let obj = {};
    return array.filter(item => {
        if (obj[item]) return false;
        obj[item] = true;
        return true;
    });
}

//返回一个新的数组，通过indexOf去重
function removeByLoop (arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}



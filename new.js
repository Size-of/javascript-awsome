function New (fn) {
    let obj = {};
    if (fn.prototype !== null) {
        obj.__proto__ = fn.prototype;
    }

    res = fn.apply(obj, Array.prototype.slice.call(arguments, 1));
    if ((typeof res === 'object' || typeof res === 'function') && res != null) {
        return res;
    }
    return obj;
}

Function.prototype.call2 = function (context = window) {
    context.fn = this;
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.apply2 = function (context = window) {
    context.fn = this;
    let result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
    delete context.fn;
    return result;
}

Function.prototype.bind2 = function (context) {
    if (typeof this != 'function') {
        return new Error('not a function!');
    }
    
    let fn = this;
    let args = [...arguments].slice(1);

    let resFn = function () {
        return fn.apply(this instanceof fn ? this : context, args.concat(...arguments));
    }

    function tmp () {}
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();
    return resFn;
}
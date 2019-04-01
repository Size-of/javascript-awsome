class Promise {
    constructor(executor) {
        this.value = null;
        this.reason = null;
        this.state = 'pending';
        this.onResolveCbs = [];
        this.onRejectCbs = [];

        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolveCbs.forEach(fn => fn());
            }
        }

        let reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectCbs.forEach(fn => fn());
            }
        }
    
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then (onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
            }
            if (this.state === 'rejected') {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            }
            if (this.state === 'pending') {
                this.onResolveCbs.push(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
                this.onRejectCbs.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        });
        return promise2;
    }

    catch (onRejected) {
        return this.then(null, onRejected);
    }
}

Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}

Promise.all = function (promises) {
    let arr = [];
    let i = 0;
    function processData (index, data) {
        arr[index] = data;
        i++;
        if (i === promises.length) {
            resolve(arr);
        }
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(val => {
                processData(i, val);
            }, reject);
        }
    });
}

function resolvePromise (promise, x, resolve, reject) {
    if (promise === x) reject(new Error('chain circle'));
    let called = false;

    if (x != null && x instanceof Promise) {
        let then = x.then;
        try {
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise, y, resolve, reject);
                }, e => {
                    if (called) return;
                    called = true;
                    reject(e);
                })
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
function createCurry (fn, params) {
    let args = params || [];

    return function _c () {
        let _args = [].slice.call(arguments);
        [].push.apply(_args, args);
        return _args.length < fn.length ? createCurry.call(this, fn, _args) : fn.apply(this, _args);
    };
}

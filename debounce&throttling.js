function debounce (fn, wait=500, immediate) {
    let timer = null;
    return function () {
        if (immediate) {
            fn.apply(this, arguments);
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    }
}

function throttling (fn, wait) {
    let prev = new Date();

    return function () {
        const args = arguments;
        const now = new Date();
        if (now - prev > wait) {
            fn.apply(this, args);
            prev = new Date();
        }
    }
}
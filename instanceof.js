function myInstanceof (obj, target) {
    let objProto = obj.__proto__;
    let targetProto = target.prototype;
    while(true) {
        if (!objProto || !targetProto) return false;
        if (objProto === targetProto) return true;
        objProto = objProto.__proto__;
    }
}
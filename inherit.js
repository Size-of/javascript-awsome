function Parent (name) {
    this.name = name;
}

Parent.prototype.sayName = function () {
    return this.name;
}

function Child (name) {
    Parent.call(this, name);
}


function create (proto) {   
    function F() {};
    F.prototype = proto;
    return new F();
}

Child.prototype = create(Parent.prototype); //create方法返回一个原型为父类构造函数原型的实例，之所以不直接将父类构造函数的原型赋给子类原型，是为了防止子类在写同名函数的时候，不直接修改父类原型上的函数，而是覆盖
Child.prototype.constructor = Child;


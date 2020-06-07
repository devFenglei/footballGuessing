class Parent{
    constructor() {
        this.age = 9;
        // return { a: 1 }
    }
    static b() {
        console.log('parent static b');
    }
    eat() {
        console.log('eating');
    }
}

class Child extends Parent{
    constructor() {
        super();
        this.name = 'child name';
    }
    static a() {
        console.log('child static a');
    }
    smoke() {
        console.log('smoking');
    }
}
let child = new Child();
console.log(child)
// child.eat(); // eating
// console.log(child.age); // 9
// Child.b(); // parent static b

/*
    1.class只能通过new来生成实例
    2.继承可以继承类的私有、公有、静态方法
    3.父类的构造函数中返回了一个引用类型，会把这个引用类型作为子类的this
*/
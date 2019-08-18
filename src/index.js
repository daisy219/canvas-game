class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        // alert(`${this.name} eat something`);
    }
    speak() {
        // alert(`My name is ${this.name}, age ${this.age}`);
    }
}
class Student extends People {
    constructor(name, age, number) {
        super(name, age);
        this.number = number;
    }
    study() {
        // alert(`xuexi ${this.number}`);
    }
}
// let xiaoming = new Student('xiaoming', 10, 'A1');
// xiaoming.study();
// let zhang = new Person('zhang', 20);
// zhang.eat();
// zhang.speak();
// let p = new Person('yang')
// alert(p.getName());
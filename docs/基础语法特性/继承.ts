/**
 * ES5 和 ES6 的继承区别：
 * 1. ES5 是先创造子类的实例对象 this，然后将父类的方法添加到 this 上
 * 2. ES6 是先创建父类的实例对象 this，然后再用子类的构造函数修改 this
 */

// 知识点：class 不允许多重继承
// class ColorPoint5 extends ColorPoint1,ColorPoint2 {}

interface Point1 {
  method1?: (args: any[]) => void
}
interface Point2 {
  method2(): void
}
// 知识点：class 允许同时继承和实现接口声明
// 知识点：class 允许多重实现
class ColorPoint6 extends Point implements Point1, Point2 {
  method1() {}
  method2() {}
  // 知识点：实现类【必须实现接口定义】，【且不能覆盖】
}

// 知识点：父类的静态方法会被继承
class A {
  static hello() {
    console.log('A.hello')
  }
}
class B extends A {}
console.log(B.hello())

// 知识点：通过 Object.getPrototypeOf() 可以获取父类
const a = new A()
const b = new B()
console.log(
  Object.getPrototypeOf(B), // [class A]
  Object.getPrototypeOf(B) === A // true
  // only browser
  // b.__proto__.constructor.__proto__ === A
)

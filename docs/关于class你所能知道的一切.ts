// 静态方法
// 静态属性
// 私有方法和私有属性

// 知识点：静态块 - 静态属性之间存在依赖关系时的初始化
let getSiyou: (instance: InstanceType<typeof StaticBlockExample>) => number

class StaticBlockExample {
  // 知识点：私有属性
  #siyou = 1
  static x = -123.456
  static y: number
  static z: string

  static {
    // 知识点：可以将私有属性与外部代码分享
    getSiyou = (obj: InstanceType<typeof StaticBlockExample>) => obj.#siyou

    try {
      this.y = Math.abs(this.x)
      this.z = Math.abs(this.x).toFixed(0)
    } catch {
      // failure
    }
  }
}
console.log(StaticBlockExample.x, StaticBlockExample.y, StaticBlockExample.z)
// TODO
// console.log(getSiyou(new StaticBlockExample()))

// 知识点：new.target，在构造函数中用于判断此类如何实例化时的
function Person1(name: string) {
  if (new.target !== undefined) {
    // @ts-ignore
    this.name = name
  } else {
    throw new Error(`必须使用 new 命令生成实例`)
  }
}
function Person2(this: any, name: string) {
  if (new.target === Person2) {
    this.name = name
  } else {
    throw new Error(`必须使用 new 命令生成实例`)
  }
}
class Rectangle {
  constructor() {
    console.log(new.target === Rectangle) // true
  }
}
new Rectangle()
// 知识点：父类中 new.target 指向子类
class Parent {
  constructor() {
    console.log(56, new.target.name, new.target === Parent) // "Child" false
  }
}
class Child extends Parent {
  constructor() {
    super()
  }
}
new Child()
// 知识点：可以利用上述特性写出不能实例而只能继承的类
class NotInstanceClass {
  constructor() {
    if (new.target === NotInstanceClass) {
      throw new Error('本类不能实例化')
    }
  }
}
class NotInstanceClassChild extends NotInstanceClass {}
// new NotInstanceClass() // ❌ Error: 本类不能实例化
new NotInstanceClassChild()

class Point {}

class ColorPoint1 extends Point {
  // 知识点：子类没有显式添加构造函数，但会被默认添加
}
class ColorPoint2 extends Point {
  // 知识点：派生类显式添加 constructor 时，必须调用 super，即父类的构造函数
  // ❌ 派生类的构造函数必须包含 "super" 调用。ts(2377)
  // constructor() {}
}
class ColorPoint3 extends Point {
  constructor() {
    // 知识点：super() 返回的是子类的实例
    super()
  }
}
class ColorPoint4 extends Point {
  color: string

  constructor(color: string) {
    // 知识点：构造函数中 this 只能出现在 super() 调用之后
    // 知识点：子类的this 对象必须通过父类的构造函数完成，得到父类同样的属性和方法，然后进一步加工
    // ❌ 访问派生类的构造函数中的 "this" 前，必须调用 "super"。
    // this.color = color
    super()
    this.color = color
  }

  toString() {
    // 知识点：super 还可以当做对象使用，这里指向父类的原型对象，即相当于 Point.prototype
    // 知识点：父类 Point 上并没有 toString 方法，这里的 super.toString() 相当于 Object.prototype.toString.call(new Point())
    const c = this.color + ' ' + super.toString()
    console.log(`${ColorPoint4.name}.toString: `, c)
    return c
  }
}
const cp4 = new ColorPoint4('red')
cp4.toString()

// 知识点：子类实例同时是子类、父类和祖先类的实例
console.log(cp4 instanceof ColorPoint4) // true
console.log(cp4 instanceof Point) // true
class ColorPoint4Child extends ColorPoint4 {}
const cpc4 = new ColorPoint4Child('green')
console.log(cpc4 instanceof Point) // true

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

// 知识点：深入 super
class X {
  constructor() {
    // 知识点：new.target.name 指向实际实例化类的名
    // new X() 时输出： X， new Y()时输出： Y
    console.log(new.target.name)
  }
}
class Y extends X {
  constructor() {
    super()
  }
}
new X()
new Y()

// 知识点：instanceof 的本质

// 先有 Object 还是先有 Function

// 如何正确的分析 this 指向

// 实例的 __proto__ 属性
class M {
  print() {
    console.log('new M().print()')
  }
}
class N extends M {
  print() {
    console.log('new N().print()')
  }
}
const m = new M()
const n = new N()
// 知识点：子类实例的原型的原型指向父类实例的原型，only browser run
// console.log(n.__proto__.__proto__ === m.__proto__) // true
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(n)) === Object.getPrototypeOf(m)
)
// 知识点：可以通过子类实例的 __proto__ 修改父类实例行为，only browser run
// n.__proto__.__proto__.print = function () { console.log('修改了父类的实例方法行为') }
// TODO Object.setPrototypeOf()

// 知识点：某个类的所有实例共享一个原型对象

// Object.create() 详解

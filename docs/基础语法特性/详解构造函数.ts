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

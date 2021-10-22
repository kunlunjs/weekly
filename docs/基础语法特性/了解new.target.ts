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

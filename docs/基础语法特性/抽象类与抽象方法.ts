/**
 * 抽象类基本特征
 * 1. 类及其中的属性、方法可以是抽象的
 * 2. 抽象方法和属性没有实际实现，必须存在于抽象类中
 * 3. 抽象类不能实例化
 * 4. 派生类必须实现抽象类的抽象方法
 */
abstract class Base {
  abstract getName(): string

  printName() {
    console.log('Hello,', this.getName())
  }
}
// ❌ 无法创建抽象类的实例。ts(2511)
// new Base()

class Derived extends Base {
  getName() {
    return 'World'
  }
}
const d = new Derived()
d.printName()

function greet1(ctor: typeof Base) {
  // ❌ 无法创建抽象类的实例。ts(2511)
  // const instance = new ctor()
}
function greet2(ctor: new () => Base) {
  const instance = new ctor()
  instance.printName()
}
greet2(Derived)
// ❌ 类型“typeof Base”的参数不能赋给类型“new () => Base”的参数。无法将抽象构造函数类型分配给非抽象构造函数类型。ts(2345)
// greet2(Base)

/**
 * 使用抽象类的典型场景
 *
 */
// TODO

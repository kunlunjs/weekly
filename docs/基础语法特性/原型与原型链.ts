// 实例的 **proto** 属性
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
// console.log(n.**proto**.**proto** === m.**proto**) // true
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(n)) === Object.getPrototypeOf(m)
)
// 知识点：可以通过子类实例的 **proto** 修改父类实例行为，only browser run
// n.**proto**.**proto**.print = function () { console.log('修改了父类的实例方法行为') }
// TODO Object.setPrototypeOf()

// 知识点：某个类的所有实例共享一个原型对象

// Object.create() 详解

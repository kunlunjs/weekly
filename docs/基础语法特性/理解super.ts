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

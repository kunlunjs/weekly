// 知识点：静态块 - 静态属性之间存在依赖关系时的初始化
let getSiyou: (instance: InstanceType<typeof StaticBlockExample>) => number

class StaticBlockExample {
  // 知识点：私有属性
  #siyou = 1
  // 默认 public
  static public_static_attr = -123.456
  private static privated_static_attr: number
  protected static protected_static_attr: string

  static {
    // 知识点：静态块，可以将私有属性与外部代码分享
    getSiyou = (obj: InstanceType<typeof StaticBlockExample>) => obj.#siyou

    try {
      this.privated_static_attr = Math.abs(this.public_static_attr)
      this.protected_static_attr = Math.abs(this.public_static_attr).toFixed(0)
    } catch {
      // failure
    }
  }
}
// 默认只能直接访问 public 的静态属性
console.log(
  StaticBlockExample.public_static_attr
  // StaticBlockExample.privated_static_attr,
  // StaticBlockExample.protected_static_attr
)
// TODO
// console.log(getSiyou(new StaticBlockExample()))

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

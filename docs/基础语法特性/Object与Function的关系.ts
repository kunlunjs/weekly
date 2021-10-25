/**
 * 结论
 * 1. __proto__ 表示原型链
 * 2. prototype 用于存储构造器（函数）需要共享的属性和方法
 * 3. Object 和 Function 都属于函数
 * 4. 普通对象只有 __proto__ 属性，没有 prototype 属性，即 __proto__ 指向构造器的原型对象
 * 5. 构造器（即函数）即有 prototype 属性、也有 __proto__ 属性
 * 6. 普通对象.__proto__ === 构造器.prototype
 */
const obj = {}
// console.log(obj.__proto__ === Object.prototype) // true
console.log(Object.getPrototypeOf(obj) === Object.prototype) // true
// ❌ 类型“{}”上不存在属性“prototype”。ts(2339)
// console.log(obj.prototype)

// Reflect.ownKeys 可以遍历出非枚举属性（enumerable: false）
console.log(Reflect.ownKeys(Object.prototype))
/**
[
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'valueOf',
  '__proto__',
  'toLocaleString'
]
 */
// Object.keys 不能遍历出非枚举属性（enumerable: false）
console.log(Object.keys(Object.prototype)) // []
// 怎么知道一个属性是非枚举的（enumerable: false），表达式中 hasOwnProperty 换成上面 Reflect.ownKeys 枚举出的任何一个值都成立
console.log(
  Reflect.getOwnPropertyDescriptor(Object.prototype, 'hasOwnProperty')
)
/**
{
  value: [Function: hasOwnProperty],
  writable: true,
  enumerable: false,
  configurable: true
}
 */

console.log(typeof Object, typeof Function) // 'function' 'function'

// 原型链的尽头是 Object.prototype.__proto === null
console.log(Reflect.getPrototypeOf(Object.prototype) === null) // true

// 知识点：Function.prototype 继承自 Object.prototype (原型链终点)
// console.log(Object.prototype === Function.prototype.__proto__) // true
console.log(Reflect.getPrototypeOf(Function.prototype) === Object.prototype) // true
// 知识点：Object 的原型链指向 Object.prototype，即 Object 是 Function 的实例
// console.log(Object.__proto__ === Function.prototype) // true
console.log(Reflect.getPrototypeOf(Object) === Function.prototype) // true
// 知识点：Object 是 Function 的实例，反之也成立
console.log(Object instanceof Function, Function instanceof Object) // true true
// 所有内置构造函数均继承与 Function，将下面的 Function 换成 Object 也成立
console.log(
  Number instanceof Function,
  String instanceof Function,
  Date instanceof Function,
  RegExp instanceof Function
) // true true true true
// 知识点：Math 属于对象
console.log(Math instanceof Function, Math instanceof Object) // false true

/**
 * instanceof 用来检查表达式左边对象或函数的原型链是否在右侧的原型对象上
 * 基础变量无法直接使用 instanceof
 */
console.log(Date instanceof Function) // true
console.log(Object.getPrototypeOf(Date) === Function.prototype) // true
// ❌ "instanceof" 表达式左侧必须是 "any" 类型、对象类型或类型参数。ts(2358)
// console.log(123 instanceof Number)
// console.log('string' instanceof String)
// console.log(true instanceof Boolean)
console.log(new Number(123) instanceof Number) // true
console.log(new String('abcd') instanceof String) // true
console.log(new Boolean(true) instanceof Boolean) // true

/**
 * polyfill
 */
// function instanceof_polyfill(left: any, right: any) {
//   let proto = Object.getPrototypeOf(left)
//   while (proto) {
//     if (proto === right.prototype) {
//       return true
//     }
//     proto = Object.getPrototypeOf(proto)
//   }
//   return false
// }

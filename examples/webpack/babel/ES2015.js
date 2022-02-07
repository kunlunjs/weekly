/**
 * 声明
 */

/**
 * 解构赋值
 */
console.log('remove console.log')
console.warn('preserve console.warn')
// 字符串结构
const [a, b, c, d, e] = 'hello'
// 数值结构
const { toString: string } = 123
// 布尔解构
const { toString: boolean } = true
// 对象解构
const { x1, y1 } = { x1: 1, y1: 2 }
const { x2, y2 = 2 } = { x2: 1 }
const { x3, y3: z3 } = { x3: 1, y3: 2 }
// 数组解构
const [x4, y4] = [1, 2]
const [x5, y5 = 2] = [1]
// 函数参数解构
function Func1([x = 0, y = 1]) {}
function Func2([x = 0, y = 1]) {}

/**
 * 字符串扩展
 */

/**
 * 数值扩展
 */

/**
 * 对象扩展
 */

/**
 * 数组扩展
 */

/**
 * 函数扩展
 */

/**
 * 正则扩展
 */

/**
 * Symbol
 */

/**
 * Set
 */

/**
 * Map
 */

/**
 * Proxy
 */

/**
 * Reflect
 */

/**
 * Class
 */

/**
 * Module
 */

/**
 * Iterator
 */

/**
 * Promise
 */

/**
 * Generator
 */

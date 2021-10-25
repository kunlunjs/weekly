```plantuml
@startuml
skinparam titleFontSize 16
title
  原型与原型链
  |= |= 金科玉律 |
  | 1 | <#80FF80> <b>~_~_proto__</b> 表示原型链 |
  | 2 | <#80FF80> <b>__prototype__</b> 表示函数共享的属性和方法 |
  | 3 | <#80FF80> <b>__Object__</b> 和 <#80FF80> <b>__Function__</b> 都属于函数 |
  | 4 | <#80FF80> 普通对象只有 <b>~_~_proto__</b> 属性，没有 <b>__prototype__</b> 属性，即 <b>~_~_proto__</b> 指向构造器的原型对象 |
  | 5 | <#80FF80> 函数和类即有 <b>__prototype__</b> 属性、也有 <b>~_~_proto__</b> 属性 |
  | 6 | <#80FF80> 普通对象.__proto__ === 构造器.prototype |
  | 7 | <#80FF80> <b>~_~_proto__</b> 是某些浏览器的私有实现，属于历史遗留，实际中应以 <b>__Object.getPrototypeOf()__</b> 替代 |
end title

class Object {
  -prototype
  -__proto__
}

class Object.prototype {
  -__proto__
}

class Function {
  -prototype
  -__proto__
}

class Function.prototype {
  -prototype
  -__proto__
}

' package "内置构造函数"
class Number/String/Date/RegExp
' end package
note top
  内置构造函数
end note

entity Math
note left
  内置全局对象
end note

Object.prototype -u-> null : ~_~_proto__
Object *-u- Object.prototype

Function *-u- Function.prototype
Function.prototype -u-> Object.prototype : ~_~_proto__

Object -u-> Function.prototype : ~_~_proto__
Function -u-> Object : ~_~_proto__
Object -u-> Function : ~_~_proto__

"Number/String/Date/RegExp" -u-> Function.prototype : ~_~_proto__

"Math" -u-> Object.prototype : ~_~_proto__

entity "const obj = {}" as obj
obj -u-> Object.prototype : ~_~_proto__

entity "function func () {}" as func
func -u-> Function.prototype : ~_~_proto__

class "function Func() {}" as Func
entity Func.prototype
Func *-u- Func.prototype
Func -u-> Function.prototype : ~_~_proto__
entity "const o = new Func()" as o
o -u-> Func.prototype : ~_~_proto__
@enduml
```

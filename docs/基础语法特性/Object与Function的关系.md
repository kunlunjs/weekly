```plantuml
@startuml
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
note right
  内置构造函数
end note

Object.prototype -> null : ~_~_proto__

Function.prototype -> Object.prototype : ~_~_proto__

Object -> Function.prototype : ~_~_proto__
Function -> Object : ~_~_proto__
Object -> Function : ~_~_proto__

"Number/String/Date/RegExp" -> Function.prototype : ~_~_proto__

class "const obj = {}" as obj
obj -> Object.prototype : ~_~_proto__

class "function func () {}" as func
func -> Function.prototype : ~_~_proto__
@enduml
```

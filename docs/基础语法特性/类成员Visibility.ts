/**
 * Class Member Visibility
 * 1. 类成员默认可见性是 public
 * 2. protected 只对类内部及其子类可见，对实例不可见
 * 3. private 不允许成员访问，包括子类，可在其内部 public 和 protected 方法中访问
 */
class VisibilityExample {
  public_attr = 0
  private private_attr = 1
  protected protected_attr = 2

  // 可以在 public 方法中访问 private 和 protected 的属性和方法：
  getPublicMethod() {
    console.log(
      this.private_attr,
      this.protected_attr,
      this.getPrivateMethod(),
      this.getProtectedMethod()
    )
  }

  // 可以在 private 方法中访问 protected 属性和方法
  private getPrivateMethod() {
    console.log(this.protected_attr, this.getProtectedMethod())
    return 'private method'
  }

  // 可以在 protected 方法中访问 private 属性和方法
  protected getProtectedMethod() {
    console.log(this.private_attr, this.getPrivateMethod())
    return 'protected method'
  }

  // 可以在公有方法中访问私有属性
  getPrivateAttr() {
    console.log(this.private_attr)
  }
}

const ve = new VisibilityExample()
// 可以随便访问默认的 public 属性或方法
console.log(ve.public_attr, ve.getPrivateAttr())
// ❌ 属性“private_attr”为私有属性，只能在类“PrivateExample”中访问。ts(2341)
// ve.private_attr
// ve.getPrivateMethod()
// ❌ 属性“getProtectedMethod”受保护，只能在类“VisibilityExample”及其子类中访问。
// ve.protected_attr
// ve.getProtectedMethod()

class ExtendsVisibilityExample extends VisibilityExample {
  getX() {
    console.log(this.public_attr, this.getPublicMethod())
    // ❌ 属性“private_attr”为私有属性，只能在类“VisibilityExample”中访问。t
    // console.log(this.private_attr, this.getPrivateMethod())

    // 子类中可以访问 protected 属性或方法
    console.log(this.protected_attr, this.getProtectedMethod())
  }
}

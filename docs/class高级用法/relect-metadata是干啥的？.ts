/**
 * reflect-metadata 是扩充原生 Reflect 对象上的方法的，
 * 可以方便通过装饰器或函数对 class 及其属性和方法进行元数据的存取
 */

/**
 * 源码结构
export {}
declare global {
  namespace Reflect {
    // 定义或改写类的方法
    function decorate(decorators: ClassDecorator[], target: Function): Function;
    // 定义或改写类的属性或方法，包括静态属性和方法
    function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: Object, propertyKey: string | symbol, attributes?: PropertyDescriptor): PropertyDescriptor;
    // 装饰器，可用于 class 或 method
    function metadata(metadataKey: any, metadataValue: any): {
      (target: Function): void;
      (target: Object, propertyKey: string | symbol): void;
    };
    // 定义元数据
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object): void;
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object, propertyKey: string | symbol): void;
    // 是否有某元数据，可向原型链上追溯
    function hasMetadata(metadataKey: any, target: Object): boolean;
    function hasMetadata(metadataKey: any, target: Object, propertyKey: string | symbol): boolean;
    // 自身是否有某元数据
    function hasOwnMetadata(metadataKey: any, target: Object): boolean;
    function hasOwnMetadata(metadataKey: any, target: Object, propertyKey: string | symbol): boolean;
    // 获取 target 的元数据，可向原型链上追溯
    function getMetadata(metadataKey: any, target: Object): any;
    function getMetadata(metadataKey: any, target: Object, propertyKey: string | symbol): any;
    // 获取自身的元数据
    function getOwnMetadata(metadataKey: any, target: Object): any;
    function getOwnMetadata(metadataKey: any, target: Object, propertyKey: string | symbol): any;
    // 获取所有元数据的 key 列表
    function getMetadataKeys(target: Object): any[];
    function getMetadataKeys(target: Object, propertyKey: string | symbol): any[];
    // 获取自身所有元数据的 key 列表
    function getOwnMetadataKeys(target: Object): any[];
    function getOwnMetadataKeys(target: Object, propertyKey: string | symbol): any[];
    // 删除元数据
    function deleteMetadata(metadataKey: any, target: Object): boolean;
    function deleteMetadata(metadataKey: any, target: Object, propertyKey: string | symbol): boolean;
  }
}
 */

// 使用方法，在项目入口 import 'reflect-metadata' 即可
import 'reflect-metadata'

/**
 * 案例1：测试通过 Reflect.decorate 改写一个 class 的方法
 * typescript/lib/lib.es5.d.ts
 * declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 */
const classDecorator: ClassDecorator = (target: any) => {
  target.prototype.sayName = () => console.log(`覆盖`)
  // 可不返回，因为 target 是引用，同时 ClassDecorator 返回值亦可以是 void
  // return target
}
class TestClassDecorator {
  // 自动赋值给实例值 name
  constructor(public name = '') {}

  sayName() {
    // 输出将会被通过 Reflect.decorate 改写的 sayName 覆盖
    console.log(this.name)
  }
}
// 函数签名：function decorate(decorators: ClassDecorator[], target: Function): Function;
Reflect.decorate([classDecorator], TestClassDecorator)
const t = new TestClassDecorator('nihao')
t.sayName() // '覆盖'

/**
 * 案例2：测试通过 Reflect.decorate 改写一个 class 的静态方法和实例方法
 */

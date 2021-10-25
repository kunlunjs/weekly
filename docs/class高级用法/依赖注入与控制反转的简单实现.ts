import 'reflect-metadata'

// 战士
interface Warrior {
  /* 动作 */
  // 战斗
  fight(): string
  // 逃跑
  sneak(): string
}
// 武器
interface Weapon {
  // 击打
  hit(): string
}
// 投掷武器
interface ThrowableWeapon {
  // 投掷
  throw(): string
}

/**
 * 定义两种武器，不同武器类的声明接口实现
 */
class Langyabang implements Weapon {
  hit() {
    console.log('击打!')
    return '击打!'
  }
}
class Gongnu implements ThrowableWeapon {
  throw() {
    console.log('发射!')
    return '发射!'
  }
}

/*------------------------ 非 IoC ------------------------*/

class ZhanshiOfNoIoC implements Warrior {
  private _langyabang: Weapon
  private _gongnu: ThrowableWeapon

  constructor() {
    /* 非依赖注入实现 */
    this._langyabang = new Langyabang()
    this._gongnu = new Gongnu()
  }

  fight() {
    return this._langyabang.hit()
  }

  sneak() {
    return this._gongnu.throw()
  }
}

/*------------------------ IoC ------------------------*/
const TYPES = {
  Warrior: Symbol.for('Warrior'),
  Weapon: Symbol.for('Weapon'),
  ThrowableWeapon: Symbol.for('ThrowableWeapon')
}

// 参数型装饰器，负责根据传参注入元数据
function Inject(serviceIdentifier: string | symbol) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const metadata = {
      key: 'Inject.tag',
      value: serviceIdentifier
    }
    // 向【构造函数参数】注入元数据，key 是 "custom:paramtypes" 加上参数序号
    Reflect.defineMetadata(
      `custom:paramtypes#${parameterIndex}`,
      metadata,
      target
    )
  }
}

class Zhanshi implements Warrior {
  private _langyabang: Weapon
  private _gongnu: ThrowableWeapon

  // 由 IoC 容器负责依赖类的实例化
  constructor(
    @Inject(TYPES.Weapon) langyabang: Weapon,
    @Inject(TYPES.ThrowableWeapon) gongnu: ThrowableWeapon
  ) {
    console.log('Zhanshi constructor: ', langyabang, gongnu)
    this._langyabang = langyabang
    this._gongnu = gongnu
  }

  fight() {
    return this._langyabang.hit()
  }

  sneak() {
    return this._gongnu.throw()
  }
}

// IoC 容器
type Constructor<T = any> = new (...args: any[]) => T

class Container {
  // 存放构造函数 {key: 构造函数} 的存储器
  bindTags: Record<string | symbol, Constructor> = {}

  bind<T>(tag: string | symbol) {
    return {
      to: (bindTarget: Constructor<T>) => {
        this.bindTags[tag] = bindTarget
      }
    }
  }

  get<T>(tag: string | symbol): T {
    const target = this.bindTags[tag]
    // 存放构造函数的地方
    const providers = []
    for (let index = 0; index < target.length; index++) {
      // 依次取出构造函数参数的元数据，见 Inject 中 Reflect.defineMetadata 的 metadata.value
      const paramtypes = Reflect.getMetadata(
        `custom:paramtypes#${index}`,
        target
      )
      // 取出由 Inject 注入的元数据的 value
      const provider = this.bindTags[paramtypes.value]

      providers.push(provider)
    }
    // 实例化该类
    return new target(...providers.map(provider => new provider()))
  }
}

const container = new Container()

container.bind<Weapon>(TYPES.Weapon).to(Langyabang)
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Gongnu)
container.bind<Warrior>(TYPES.Warrior).to(Zhanshi)

const ninja = container.get<Zhanshi>(TYPES.Warrior)

ninja.fight() // '击打!'
ninja.sneak() // '发射!'

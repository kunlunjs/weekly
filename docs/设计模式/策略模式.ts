/**
 * 策略模式
 */

/**
 * 上下文
 */
class Context {
  private strategy: Strategy

  /**
   * 初始化策略
   */
  constructor(strategy: Strategy) {
    this.strategy = strategy
  }

  /**
   * 运行时修改策略
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy
  }

  /**
   * 执行某项策略
   */
  public doSomeBusinessLogic(arr: string[]): void {
    console.log(`执行某项策略 (并不确定策略是什么？运行时确定)`)
    const result = this.strategy.doAlgorithm(arr)
    console.log('结果: ', result.join(','))
    // ...
  }
}

/**
 * 定义策略算法
 */
interface Strategy {
  doAlgorithm(data: string[]): string[]
}

/**
 * 策略的不同算法
 */

// 必须要实现声明接口或类
class ConcreteStrategyA implements Strategy {
  // 输入输出类型要保持一致
  public doAlgorithm(data: string[]): string[] {
    return data.sort()
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse()
  }
}

const context = new Context(new ConcreteStrategyA())
console.log('执行策略A')
context.doSomeBusinessLogic([
  '生',
  '老',
  '病',
  '死',
  '怨憎会',
  '爱别离',
  '求不得',
  '五阴盛'
])

console.log('---------------')

// 修改策略
context.setStrategy(new ConcreteStrategyB())
console.log('执行策略B')
context.doSomeBusinessLogic([
  '生',
  '老',
  '病',
  '死',
  '怨憎会',
  '爱别离',
  '求不得',
  '五阴盛'
])

// @ts-ignore
import semver from 'semver';

// demo
interface HttpClientInstance {}

// demo
interface ICommonConfig {}

interface IPluginContext {
  version: string
  // demo
  httpClient: HttpClientInstance
  // demo
  loadConfig: () => ICommonConfig
  // log: (content: string, logLevel?: LogLevel) => void
}

interface ActionX {}
interface ActionY {}

interface IPlugin {
  name: string
  version: string
  versionRange?: string
  onRegister: (ctx: {
    log: (content: any, logLevel?: LogLevel) => void
    // more...
  } & IPluginContext) => void
  onRegistered?: () => void
  onSomeAction?: (arg: ActionX) => void
  onAnotherAction?: (arg: ActionY) => void
  onBeforeUnregister?: () => void
  onUnregistered?: () => void
}

interface IPluginFunction {
  (ctx: IPluginContext): IPlugin
}

// type UnPlugFunction = () => void
interface UnPlugFunction {
  (): void
}

enum LogLevel {
  debug = 'debug',
  log = 'log',
  warn = 'warn',
  error = 'error',
}

function _log(origin: string, content: any, logLevel: LogLevel = LogLevel.log) {
  // 简单实现
  console[logLevel](`[${origin}]: `, content)
}

// 插件系统内部使用
function internalLog(context: any, logLevel?: LogLevel) {
  return _log('Internal', context, logLevel)
}

const _plugins: IPlugin[] = [];

const mockContext: IPluginContext = {
  version: '1.0.1',
  httpClient: {},
  loadConfig: () => ({})
}

export default async function addPlugin(arg: IPlugin | IPluginFunction): Promise<UnPlugFunction | void> {
  let plugin: IPlugin
  if (arg instanceof Function) {
    plugin = arg(mockContext)
  } else {
    plugin = arg
  }

  function log(content: any, logLevel?: LogLevel) {
    _log(plugin.name, content, logLevel)
  }

  if (!plugin.name) {
    log(`未提供插件名`, LogLevel.error)
    return
  }

  if (!plugin.version) {
    log(`未提供插件版本`, LogLevel.error)
    return
  }

  if (plugin.versionRange) {
    // 版本范围匹配
    if (!semver.satisfies(mockContext.version, plugin.versionRange)) {
      log(`当前应用版本 ${mockContext.version}，不符合插件版本 ${plugin.versionRange} 需求!`, LogLevel.error)
      return
    }
  } else {
    // 没有写范围就是全部适用
    log('未提供版本范围，可能有 API 兼容问题', LogLevel.warn)
  }

  // 注册插件
  internalLog(`准备注册插件 ${plugin.name}@${plugin.version}`, LogLevel.debug)
  try {
    // 如果需要返回值做某些事，这里需要接收处理
    await plugin.onRegister({
      log,
      ...mockContext
      // more...
    })
    _plugins.push(plugin)
    internalLog(`插件 ${plugin.name}@${plugin.version} 已注册`, LogLevel.debug)
  } catch (error) {
    log(`插件 ${plugin.name}@${plugin.version} 注册失败`, LogLevel.error)
    log(error, LogLevel.error)
  }

  function unregister() {
    internalLog(`准备卸载插件 ${plugin.name}@${plugin.version}`, LogLevel.debug)
    try {
      plugin.onBeforeUnregister?.()
    } catch (error) {
      internalLog(`插件 ${plugin.name}@${plugin.version} 卸载错误`, LogLevel.debug)
      log(error, LogLevel.error)
    }
    const index = _plugins.indexOf(plugin)
    if (index > -1) {
      _plugins.splice(index, 1)
    }
    // 如果还有其它的收集插件的监听事件、定时器等都需要在此销毁
    // more..
    try {
      plugin.onUnregistered?.()
    } catch (error) {
      internalLog(`插件 ${plugin.name}@${plugin.version} 卸载错误`, LogLevel.debug)
      log(error, LogLevel.error)
    }
  }
  return unregister
}

// 在某些业务处
function inSomeAction() {
  // 准备事件的参数
  const payload: ActionX = {}
  // 这里使用 forEach 的原因是为了让所有的插件同时执行，如果需要依次执行，可以用
  // for (let i = 0; i < _plugins.length; i++)
  // 或者 _plugins.reduce((prev, plugin) => (await prev; return somePromise), [Promise.resolve()])
  // 等方式实现
  _plugins.forEach(async (plugin) => {
    try {
      await plugin.onSomeAction?.(payload)
    } catch (error) {
      _log(plugin.name, error, LogLevel.error)
    }
  })
}

addPlugin((ctx) => {
  return {
    name: 'test',
    version: '1.0.1',
    onRegister() {
      // do something
    },
    onRegistered() {
      // do something
    },
    onSomeAction(arg: X) {
      // do something
    },
    onAnotherAction(arg: Y) {
      // do something
    },
    onBeforeUnregister() {
      // 清空数据，关闭定时器等等
    },
    onUnregistered() {
      // do something
    }
  }
})
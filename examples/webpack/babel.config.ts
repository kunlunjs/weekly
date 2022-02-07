export default ({
  isDevelopment = true,
  isReactProject = true,
  isTypeScriptProject = true,
  env = {
    useBuiltIns: 'entry',
    corejs: '3.20.3',
    targets: {
      chrome: '97'
    },
    bugfixes: false,
    loose: false,
    modules: 'auto',
    debug: false,
    include: [],
    exclude: [],
    forceAllTransforms: false,
    configPath: process.cwd(),
    ignoreBrowserslistConfig: false,
    browserslistEnv: undefined,
    shippedProposals: false
  },
  consoleRemove = false // { exclude: ['warn', 'error'] }
}: {
  isDevelopment?: boolean
  isReactProject?: boolean
  isTypeScriptProject?: boolean
  /**
   * @babel/preset-env 配置选项
   */
  env?: {
    /**
     * false 默认值，无视浏览器兼容性配置，引入所有 polyfill
     * entry 根据配置的浏览器兼容性，引入浏览器不兼容的 polyfill
     * useage 会根据配置的浏览器兼容性，以及代码中用到的 API 来进行 polyfill
     */
    useBuiltIns?: false | 'entry' | 'usage'
    corejs?: string | { version: string; proposals: boolean }
    targets?:
      | string
      | Array<string>
      | {
          esmodules?: boolean
          firefox?: string
          chrome?: string
          safari?: string
          opera?: string
          edge?: string
          ie?: string
          ios?: string
          android?: string
          electron?: string
          rhino?: string
          samsung?: string
          node?: string | 'current' | true
        }
    bugfixes?: boolean
    spec?: boolean
    loose?: boolean
    modules?: 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false
    debug?: boolean
    include?: Array<string | RegExp>
    exclude?: Array<string | RegExp>
    forceAllTransforms?: boolean
    configPath?: string
    ignoreBrowserslistConfig?: boolean
    browserslistEnv?: string
    shippedProposals?: boolean
  }
  // babel-plugin-transform-remove-console 配置项
  consoleRemove?: false | { exclude: ('warn' | 'error')[] }
}) => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          ...env
        }
      ],
      // Enable development transform of React with new automatic runtime
      isReactProject && [
        '@babel/preset-react',
        { development: isDevelopment, runtime: 'automatic' }
      ],
      isTypeScriptProject && '@babel/preset-typescript'
    ].filter(Boolean),
    plugins: [
      // Applies the react-refresh Babel plugin on non-production modes only
      isDevelopment && isReactProject && 'react-refresh/babel',
      consoleRemove === false
        ? 'transform-remove-console'
        : typeof consoleRemove === 'object'
        ? ['transform-remove-console', consoleRemove]
        : false
    ].filter(Boolean),
    sourceMaps: true
  }
}

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack'
import type { TSLoaderType } from '../loader-for-ts'
import { getTSLoader } from '../loader-for-ts'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const loaderForTS = getTSLoader({
  type: process.env.LOADER as TSLoaderType,
  isReactProject: false
})

const commonConfig = getCommonConfig({ name: 'webpack-typescript-example' })

const config: Configuration = {
  ...commonConfig,
  // target: 'web',
  // 可通过 webpack --mode development 传入
  // mode: 'development',
  /**
   * 可以是字符串/数组/对象，如果是数组则默认会合并为 main
   * @relativePath
   * @optional
   * @default src/index.js，如果 resolve: { extensions: ['.ts', '.js', '.json']} 中指定了 ts 等其它后缀也会去寻找
   * @attention 需要后缀名，如果是对象则会默认按 key 有多个输出
   * @example
   *   entry: './src/index.ts',
   *   entry: ['./src/index.ts', './src/render.ts'],
   *   entry: {
         main: './src/index.ts',
         render: './src/index.ts'
       },
   */
  entry: {
    main: './src/index.ts'
  },
  output: {
    /**
     * @absolutePath
     * @optional
     * @default dist
     */
    path: path.resolve(__dirname, 'dist'),
    /**
     * @optional
     * @default entry 为对象时的 key name 或者 main.js
     * @example
     */
    filename: 'bundle.js'
  },
  module: {
    rules: [...loaderForTS.module.rules]
  },
  plugins: [
    ...loaderForTS.plugins,
    /**
     * 如果使用了此插件，则会使用 output.path 中的 html
     * @see https://github.com/jantimon/html-webpack-plugin
     * @example
     *   new HtmlWebpackPlugin() 自动在 output.path 中输出一个 index.html
     */
    new HtmlWebpackPlugin({
      template: './template.html',
      /**
       * @default true，在 head 中
       */
      inject: 'body'
    })
  ],
  devServer: getDevServerConfig()
}

export default config

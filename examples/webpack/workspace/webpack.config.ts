import path from 'path'
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import type { Configuration } from 'webpack'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const context = process.cwd()

const commonConfig = getCommonConfig({ name: 'webpack-workspace-example' })

const config: Configuration = {
  ...commonConfig,
  devServer: getDevServerConfig(),
  context,
  entry: 'src/index',
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      /*...loaderForTS.module.rules*/
      ...(commonConfig?.module?.rules || [])
    ]
  },
  resolve: {
    ...commonConfig.resolve,
    modules: ['node_modules', path.resolve(__dirname)],
    plugins: [
      new TSConfigPathsPlugin({
        logLevel: 'INFO',
        mainFields: ['module', 'main'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      })
    ]
  },
  plugins: [
    ...(commonConfig?.plugins || [])
    // ...loaderForTS.plugins
  ].filter(Boolean)
}

export default config

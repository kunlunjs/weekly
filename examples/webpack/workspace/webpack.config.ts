import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import ReactRefreshTypeScript from 'react-refresh-typescript'
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import type { Configuration } from 'webpack'
import { getTSLoader } from '../ts-loader'
import { commonConfig } from '../webpack.common.config'
import { devServerConfig } from '../webpack.dev-server.config'

const context = process.cwd()
const __DEV__ = process.env.NODE_ENV !== 'production'
const LOADER = (process.env.LOADER as 'babel' | 'ts' | 'swc') || 'babel'
const loaderForTS = getTSLoader(LOADER)

const config: Configuration = {
  ...commonConfig,
  devServer: devServerConfig,
  context,
  entry: 'src/index',
  output: {
    path: context + '/dist',
    filename: '[name].js'
  },
  module: {
    rules: [...loaderForTS.module.rules]
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
    ...commonConfig.plugins,
    ...loaderForTS.plugins,
    new HtmlWebpackPlugin({
      templateContent: `
        <html>
          <body>
            <h1>workspace webpack example</h1>
            <div id="react-content"></div>
          </body>
        </html>
      `
    })
  ].filter(Boolean)
}

export default config

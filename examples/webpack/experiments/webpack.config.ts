import path from 'path'
// import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const configs: Configuration[] = [
  {
    name: 'top-level-await',
    entry: './top-level-await/index.ts',
    // TODO
    // resolve: {
    //   plugins: [
    //     new TSConfigPathsPlugin({
    //       extensions: ['.ts', '.tsx', '.js', '.jsx'],
    //       mainFields: ['main', 'module']
    //     })
    //   ]
    // },
    experiments: {
      topLevelAwait: true
    }
  },
  {
    name: 'css',
    entry: './css/index.ts',
    experiments: {
      css: true
    }
  }
]

export default configs.map(config =>
  merge<Configuration>(
    getCommonConfig({
      name: config.name as string,
      hasHtmlWebpackPlugin: false
    }),
    {
      devServer: configs.length > 1 ? undefined : getDevServerConfig()
    },
    config,
    {
      output: {
        path: path.resolve(__dirname, `dist-${config.name}`)
      }
    }
  )
)

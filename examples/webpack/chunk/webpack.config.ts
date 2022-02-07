import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const configs: Configuration[] = [
  {
    name: 'chunkhash',
    entry: {
      main: './chunk-hash/index.ts'
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunkhash.js'
    },
    optimization: {
      runtimeChunk: true
    }
  },
  {
    name: 'multiple-entry-points',
    entry: {
      pageA: './multiple-entry-points/pageA.ts',
      pageB: './multiple-entry-points/pageB.ts'
    },
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            minSize: 2
          }
        }
      }
    }
  }
]

export default configs.map(config =>
  merge<Configuration>(
    getCommonConfig({ name: config.name as string }),
    {
      devServer: configs.length > 1 ? undefined : getDevServerConfig()
    },
    config
  )
)

import path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
// import { getDevServerConfig } from '../webpack.dev-server.config'

const configs: Configuration[] = [
  {
    entry: {
      'app': {
        import: './app',
        dependOn: ['other-vendors']
      },
      'page': {
        import: './page',
        dependOn: ['app', 'react-vendors']
      },
      'react-vendors': ['react', 'react-dom', 'prop-types'],
      'other-vendors': './other-vendors.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      chunkIds: 'named'
    },
    stats: {
      chunks: true,
      chunkRelations: true
    }
  }
]

export default configs.map((config, index) =>
  merge<Configuration>(
    getCommonConfig({
      name: `code-splitting_${index}`,
      isBrowser: false
    }),
    {
      // devServer: getDevServerConfig({ open: false })
    },
    config
  )
)

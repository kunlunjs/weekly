import path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const configs: Configuration[] = [
  {
    name: 'depend-on-simple',
    entry: {
      'app': {
        import: './depend-on-simple/index.ts',
        dependOn: ['react-vendors']
      },
      'react-vendors': ['react', 'react-dom', 'prop-types']
    },
    optimization: {
      chunkIds: 'named'
    }
  },
  {
    name: 'depend-on-advanced',
    entry: {
      'app': {
        import: './depend-on-advanced/app',
        dependOn: ['other-vendors']
      },
      'page': {
        import: './depend-on-advanced/page',
        dependOn: ['app', 'react-vendors']
      },
      'react-vendors': ['react', 'react-dom', 'prop-types'],
      'other-vendors': './depend-on-advanced/other-vendors.ts'
    },
    optimization: {
      runtimeChunk: 'single',
      chunkIds: 'named'
    },
    stats: {
      chunks: true,
      chunkRelations: true
    }
  },
  {
    name: 'bundle-loader',
    entry: './bundle-loader/index.js',
    optimization: {
      chunkIds: 'deterministic'
    }
  }
]

export default configs.map((config, index) => {
  const name = config?.name || index
  return merge<Configuration>(
    getCommonConfig({
      name: `code-splitting:${name}`
    }),
    {
      devServer: configs.length > 1 ? undefined : getDevServerConfig()
    },
    config,
    {
      output: {
        path: path.resolve(__dirname, `dist-${name}`)
      }
    }
  )
})

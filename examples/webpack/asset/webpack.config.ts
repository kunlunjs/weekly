import path from 'path'
import svgToMinDataURI from 'mini-svg-data-uri'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
// import { getDevServerConfig } from '../webpack.dev-server.config'

const configs: Configuration[] = [
  {
    name: 'asset-simple',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist1'),
      assetModuleFilename: 'images/[hash][ext]'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|svg)$/,
          type: 'asset'
        }
      ]
    }
  },
  {
    name: 'asset-advanced',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist2'),
      assetModuleFilename: 'images/[hash][ext]'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|svg)$/,
          type: 'asset',
          generator: {
            dataUrl: content => {
              if (typeof content !== 'string') {
                content = content.toString()
              }
              return svgToMinDataURI(content)
            }
          }
        }
      ]
    }
  }
]

export default configs.map(config =>
  merge<Configuration>(
    getCommonConfig({ name: config.name as string }),
    {
      // TODO: [webpack-dev-middleware] ConcurrentCompilationError: You ran Webpack twice. Each instance only supports a single concurrent compilation at a time.
      // devServer: getDevServerConfig({ port: 8000 + index })
    },
    config,
    {
      output: {
        path: path.resolve(__dirname, `dist-${config.name}`)
      }
    }
  )
)

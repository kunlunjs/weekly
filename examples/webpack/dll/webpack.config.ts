import path from 'path'
import type { Configuration } from 'webpack'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const configs: Configuration[] = [
  {
    name: 'dll',
    entry: {
      alpha: ['./dll/alpha.ts', './dll/a.ts'],
      beta: ['./dll/beta.ts', './dll/b.ts', './dll/c.tsx']
    },
    output: {
      filename: 'MyDll.[name].js',
      library: '[name]_[fullhash]'
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(process.cwd(), `dist-dll`, '[name]-manifest.json'),
        name: '[name]_[fullhash]',
        // default=false
        format: true
      })
    ]
  },
  {
    name: 'dll-entry-only',
    entry: {
      dll: ['./dll-entry-only/index.ts']
    },
    output: {
      filename: '[name].js',
      library: '[name]_[fullhash]'
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(
          __dirname,
          `dist-dll-entry-only`,
          '[name]-manifest.json'
        ),
        name: '[name]_[fullhash]',
        // default=true
        entryOnly: true,
        // default=false
        format: true
      })
    ],
    optimization: {
      concatenateModules: true // this is enabled by default in production mode
    }
  }
]

export default configs.map(config => {
  // console.log(config?.plugins.map(i => i.constructor.name))
  return merge(
    getCommonConfig({
      name: config.name as string,
      hasHtmlWebpackPlugin: false
    }),
    {
      devServer:
        configs.length > 1
          ? undefined
          : getDevServerConfig({
              open: false,
              historyApiFallback: false
            })
    },
    config,
    {
      output: {
        path: path.resolve(process.cwd(), `dist-${config.name}`)
      }
    }
  )
})

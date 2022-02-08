import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'

/**
 * @see https://webpack.docschina.org/plugins/dll-plugin/
 */
const configs: Configuration[] = [
  {
    name: 'externals',
    entry: './index.ts',
    externals: [
      'add',
      {
        subtract: {
          root: 'subtract',
          commonjs2: './subtract',
          commonjs: ['./math', 'subtract'],
          amd: 'subtract'
        }
      }
    ]
  }
]

export default configs.map(config =>
  merge<Configuration>(
    getCommonConfig({
      name: config.name as string
    }),
    config
  )
)

import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'

const configs: Configuration[] = [
  {
    name: 'ES2015',
    entry: {
      ES2015: './ES2015.js'
      // ES2016: './ES2016.js',
      // ES2017: './ES2017.js',
      // ES2018: './ES2018.js',
      // ES2019: './ES2019.js',
      // ES2020: './ES2020.js'
    },
    optimization: {
      minimize: false
    }
  }
]

export default configs.map(config =>
  merge(
    getCommonConfig({
      name: config.name as string,
      plugins: { html: false }
    }),
    config
  )
)

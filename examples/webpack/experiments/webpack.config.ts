// import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'

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
      plugins: { html: false }
    }),
    config
  )
)

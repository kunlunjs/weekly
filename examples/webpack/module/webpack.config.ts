import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    /**
     * @see https://webpack.docschina.org/configuration/output/#outputmodule
     */
    module: true,
    library: {
      type: 'module'
    }
  },
  optimization: {
    usedExports: true,
    concatenateModules: true
  },
  experiments: {
    outputModule: true
  }
}

export default merge<Configuration>(
  getCommonConfig({
    name: 'module'
  }),
  config
)

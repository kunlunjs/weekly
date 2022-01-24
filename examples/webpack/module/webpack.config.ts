import path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'
import { getDevServerConfig } from '../webpack.dev-server.config'

const commonConfig = getCommonConfig({
  name: 'module'
})

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
  commonConfig,
  {
    devServer: getDevServerConfig({ open: false })
  },
  config
)

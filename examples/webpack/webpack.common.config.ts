import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack'
// import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import type { TSLoaderType } from './loader-for-ts'
import { getTSLoader } from './loader-for-ts'

export const getCommonConfig = ({
  name,
  tsLoaderType,
  isDevelopment = true,
  optimization = {
    chunkIds: 'deterministic'
  },
  hasHtmlWebpackPlugin = true
}: {
  name: string
  isDevelopment?: boolean
  tsLoaderType?: TSLoaderType
  hasHtmlWebpackPlugin?: boolean
  optimization?: Configuration['optimization']
}): Configuration => {
  const loaderForTS = getTSLoader({
    type: tsLoaderType,
    isDevelopment
  })

  return {
    output: {
      path: path.resolve(process.cwd(), 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    stats: {
      modules: true,
      chunks: true,
      chunkRelations: true
    },
    module: {
      rules: [...(loaderForTS?.module?.rules || [])]
    },
    plugins: [
      /**
       * 编译进度
       * 默认等效于 webpack --progress
       * @see [ProgressPlugin](https://webpack.js.org/plugins/progress-plugin/)
       */
      // new webpack.ProgressPlugin(),
      /**
       * webpack --progress 的增强
       */
      new WebpackBar({
        /**
         * @attention 默认会把首字母大写
         */
        name
      }),
      ...(loaderForTS.plugins || []),
      hasHtmlWebpackPlugin &&
        new HtmlWebpackPlugin({
          inject: 'body',
          minify: false,
          templateContent: `
        <html>
          <body>
            <h1>${name}</h1>
            <div id="root"></div>
          </body>
        </html>
      `
        }),
      /**
       * 可以在输出的 js 文件顶部添加注释
       * @see [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/)
       */
      // new webpack.BannerPlugin({
      //   // /*! Banner */
      //   banner: 'Banner'
      // }),
      /**
       * 编译前清空 output.path，如没有定义则此插件不生效
       * @see https://github.com/johnagan/clean-webpack-plugin
       */
      new CleanWebpackPlugin({
        /**
         * Always enabled when dry is true
         * @default false
         */
        // verbose: boolean
      })
      /**
       * @example 将 public 拷贝到 output.path 中
       * @see [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
       */
      // new CopyWebpackPlugin({
      //   patterns: [{ from: 'public' }]
      // })
      /**
       * TODO: FIXME 会导致 [DEP_WEBPACK_COMPILATION_NORMAL_MODULE_LOADER_HOOK] DeprecationWarning: Compilation.hooks.normalModuleLoader was moved to NormalModule.getCompilationHooks(compilation).loader
       * Generate Chrome profile file which includes timings of plugins execution.
       * @see [ProfilingPlugin](https://webpack.js.org/plugins/profiling-plugin/)
       */
      // new webpack.debug.ProfilingPlugin()
    ].filter(Boolean) as Configuration['plugins'],
    optimization: {
      ...optimization
    }
  }
}

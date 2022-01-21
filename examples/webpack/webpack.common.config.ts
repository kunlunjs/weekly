// import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import type { Configuration } from 'webpack'
// import webpack from 'webpack'
import WebpackBar from 'webpackbar'

export const commonConfig: Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  stats: {
    // modules: false
  },
  optimization: {
    chunkIds: 'deterministic'
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
      name: 'examples/webpack/typescript-with-ts-loader'
    })
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
     */
    // new CleanWebpackPlugin({
    //   /**
    //    * Always enabled when dry is true
    //    * @default false
    //    */
    //   // verbose: boolean
    // })
    // new ForkTSCheckerWebpackPlugin({
    // })
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
  ]
}

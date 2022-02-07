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
      path: path.resolve(process.cwd(), `dist-${name}`)
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // @see https://webpack.docschina.org/configuration/stats/
    stats: {
      // assets: true, // 告知 stats 是否展示资源信息
      // assetsSort: 'id', // 告知 stats 基于给定的字段对资源进行排序
      // builtAt: true, // 告知 stats 是否添加构建日期与时间信息
      // moduleAssets: true, // 告知 stats 是否添加模块内的资源信息
      // assetsSpace: 15, // 告诉 stats 应该显示多少个 asset 项目（将以组的方式折叠，以适应这个空间）
      // modulesSpace: 15, // 告诉 stats 应该显示多少个模块项目（将以组的方式折叠，以适应这个空间）
      // chunkModulesSpace: 10, // 告诉 stats 显示多少个 chunk 模块项目（将以组的方式折叠，以适应这个空间）
      nestedModules: true, // 告知 stats 是否添加嵌套在其他模块中的模块信息（比如模块联邦）
      // nestedModulesSpace: 10, // 告诉 stats 应该显示多少个嵌套模块的项目（将以组的方式折叠，以适应这个空间）
      // cached: false,
      // cachedModules: true, // 告诉 stats 是否要缓存（非内置）模块的信息
      // runtimeModules: true, // 告诉 stats 是否要添加运行时模块的信息
      dependentModules: true, // 告诉 stats 是否要展示该 chunk 依赖的其他模块的 chunk 模块
      groupAssetsByChunk: true, // 告诉 stats 是否按照 asset 与 chunk 的关系进行分组
      groupAssetsByEmitStatus: true, // 告诉 stats 是否按照 asset 的状态进行分组（emitted，对比 emit 或缓存）
      groupAssetsByExtension: true, // 告诉 stats 是否根据它们的拓展名聚合静态资源
      groupAssetsByInfo: true, // 告诉 stats 是否按照 asset 信息对 asset 进行分组（immutable，development。hotModuleReplacement 等）
      groupAssetsByPath: true, // 告诉 stats 是否根据它们的路径聚合静态资源
      groupModulesByAttributes: true, // 告诉 stats 是否按模块的属性进行分组（errors，warnings，assets，optional，orphan 或者 dependent）
      groupModulesByCacheStatus: true, // 告诉 stats 是否按模块的缓存状态进行分组（已缓存或者已构建并且可缓存）
      groupModulesByExtension: true, // 告诉 stats 是否按模块的拓展名进行分组
      groupModulesByLayer: true, // 告诉 stats 是否按模块的 layer 进行分组
      groupModulesByPath: true, // 告诉 stats 是否按模块的路径进行分组
      groupModulesByType: true, // 告诉 stats 是否按模块的类型进行分组
      // groupReasonsByOrigin: true, // Group reasons by their origin module to avoid large set of reasons
      // cachedAssets: true, // 告知 stats 是否添加关于缓存资源的信息
      // children: true, // 告知 stats 是否添加关于子模块的信息
      // chunks: true, // 告知 stats 是否添加关于 chunk 的信息
      // chunkGroups: true, // 告知 stats 是否添加关于 namedChunkGroups 的信息
      // chunkModules: true, // 告知 stats 是否添加关于已构建模块和关于 chunk 的信息
      // chunkOrigins: true, // 告知 stats 是不添加关于 chunks 的来源和 chunk 合并的信息
      // chunksSort: 'id', // 告知 stats 基于给定的字段给 chunks 排序
      // context: '../src', // 设置上下文目录用以将文件请求信息变短
      colors: true, // 告知 stats 是否输出不同的颜色
      depth: true, // 告知 stats 是否展示每个模块与入口文件的距离
      // entrypoints: true, // 告知 stats 是否展示入口文件与对应的文件 bundles
      env: true, // 告知 stats 是否展示 --env 信息
      // orphanModules: false, // 告知 stats 是否隐藏 孤儿(orphan) 模块
      // errors: true, // 告知 stats 是否展示错误
      // errorDetails: 'auto', // 告知 stats 是否添加错误的详情
      // errorStack: true, // 告知 stats 是否展示错位的栈追踪信息
      // excludeAssets: [], // 告知 stats 排除掉匹配的资源信息
      // excludeModules: [], // 告知 stats 排除掉匹配的资源信息
      // exclude: [],
      // hash: true, // 告知 stats 是否添加关于编译哈希值的信息
      // logging: 'log', // 告知 stats 是否添加日志输出
      // loggingDebug: false, // 告知 stats 去包括特定的日志工具调试信息比如插件或加载器的日志工具
      // loggingTrace: true, // 启用错误，告警与追踪的日志输出中的堆栈追踪
      // modules: true, // 告知 stats 是否添加关于构建模块的信息
      // modulesSort: 'id', // 告知 stats 基于给定的字段对资源进行排序
      // moduleTrace: true, // 告知 stats 展示依赖和告警/错误的来源
      // optimizationBailout: true, // 告诉 stats 展示模块优化失效的原因
      // outputPath: true, // 告知 stats 展示 outputPath
      // performance: true, // 告知 stats 当文件大小超过 performance.maxAssetSize配置值时，展示性能提性
      // preset: false, // 为展示的信息类型设置 预设值。这对扩展统计信息行为非常有用
      providedExports: true, // 告知 stats 去展示模块的导出
      // errorsCount: true, // 添加展示 errors 个数
      // warningsCount: true, // 添加展示 warnings 个数
      // publicPath: true // 告知 stats 展示 publicPath
      // reasons: true // 告知 stats 添加关于模块被引用的原因信息
      // reasonsSpace: number // Space to display reasons (groups will be collapsed to fit this space)
      // relatedAssets: false, // 告诉 stats 是否需添加与其他 assets 相关的信息（例如 assets 的 SourceMaps）
      // source: false, // 告知 stats 去添加模块的源码
      // timings: true, // 告知 stats 添加时间信息
      // ids: false, // 通知 stats 给 module 和 chunk 添加 id
      usedExports: true, // 告知 stats 是否展示模块用了哪些导出
      // version: true, // 告知 stats 添加关于 webpack 版本的信息
      // chunkGroupAuxiliary: true, // 在 chunk 组中展示辅助 asset
      // chunkGroupChildren: true, // 显示 chunk 组的子 chunk
      // chunkGroupMaxAssets: number // chunk 组中的 asset 数上限
      // warnings: true, // 告知 stats 添加告警
      // warningsFilter: [], // 告知 stats 排除掉匹配的告警信息
      chunkRelations: true // 告知 stats 展示 chunk 的父 chunk，孩子 chunk 和兄弟 chunk
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

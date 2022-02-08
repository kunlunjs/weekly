import svgToMinDataURI from 'mini-svg-data-uri'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { getCommonConfig } from '../webpack.common.config'

/**
 * [ext] 自带 .
 */
const configs: Configuration[] = [
  {
    name: 'asset-simple',
    entry: './src/index.tsx',
    output: {
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
      assetModuleFilename: 'images/[hash][ext]'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|svg)$/,
          type: 'asset',
          generator: {
            dataUrl: (content: any) => {
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
  // FIXME
  // {
  //   name: 'asset-@svgr/webpack',
  //   entry: './src/index.tsx',
  //   output: {
  //     assetModuleFilename: 'images/[hash][ext]'
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(png|jpe?g|gif|bmp)$/,
  //         type: 'asset'
  //       },
  //       {
  //         test: /\.svg$/,
  //         use: [
  //           {
  //             loader: '@svgr/webpack',
  //             options: {
  //               native: true
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }
]

export default configs.map(config =>
  merge<Configuration>(getCommonConfig({ name: config.name as string }), config)
)

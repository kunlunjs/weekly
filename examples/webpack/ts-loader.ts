import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import type { Configuration } from 'webpack'

const __DEV__ = process.env.NODE_ENV !== 'production'

/**
 * @dependencies babel-loader
 */
export const babelLoader: (REACT?: boolean) => Configuration = (
  REACT = true
) => ({
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader')
        }
      }
    ]
  },
  plugins: [
    __DEV__ && REACT && new ReactRefreshPlugin(),
    new ForkTSCheckerWebpackPlugin()
  ].filter(Boolean)
})

/**
 * @dependencies ts-loader
 */
export const tsLoader: (REACT?: boolean) => Configuration = (REACT = true) => ({
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('ts-loader'),
          options: {
            // configFile: __DEV__ ? 'tsconfig.dev.json' : 'tsconfig.json',
            transpileOnly: true, // Set to true if you are using fork-ts-checker-webpack-plugin
            projectReferences: true,
            ...(__DEV__ && {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()]
              })
            })
          }
        }
      }
    ]
  },
  plugins: [
    __DEV__ && REACT && new ReactRefreshPlugin(),
    new ForkTSCheckerWebpackPlugin()
  ].filter(Boolean)
})

/**
 * @dependencies @swc/core swc-loader
 */
export const swcLoader: (REACT?: boolean) => Configuration = (
  REACT = true
) => ({
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('swc-loader'),
          options: {
            env: { mode: 'usage' },
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                dynamicImport: true
              },
              transform: {
                react: {
                  // swc-loader will check whether webpack mode is 'development'
                  // and set this automatically starting from 0.1.13. You could also set it yourself.
                  // swc won't enable fast refresh when development is false
                  runtime: 'automatic',
                  // development: __DEV__,
                  refresh: __DEV__
                }
              }
            }
          }
        }
      }
    ]
  },
  plugins: [
    __DEV__ && REACT && new ReactRefreshPlugin(),
    new ForkTSCheckerWebpackPlugin()
  ].filter(Boolean)
})

const loaders = { babel: babelLoader, swc: swcLoader, ts: tsLoader }

export function getTSLoader(
  parser: 'babel' | 'ts' | 'swc',
  REACT = true
): Configuration {
  return loaders[parser](REACT)
}

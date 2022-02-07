import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import glob from 'glob'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import type { Configuration } from 'webpack'
import getBabelConfig from './babel.config'

const isTypeScriptProject = !!glob.sync(`${process.cwd()}/**/*.ts`, {}).length
const isTypeScriptReactProject = !!glob.sync(`${process.cwd()}/**/*.tsx`, {})
  .length

/**
 * @dependencies babel-loader
 */
export const babelLoader: ({
  isDevelopment
}: {
  isDevelopment?: boolean
}) => Configuration = ({
  isDevelopment = process.env.NODE_ENV !== 'production'
}) => {
  const isReactProject = isTypeScriptReactProject
  return {
    module: {
      rules: [
        {
          test: /\.(mjs|[jt]sx?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              ...getBabelConfig({
                isDevelopment,
                isReactProject,
                isTypeScriptProject
              })
            }
          }
        }
      ]
    },
    plugins: [
      isDevelopment && isReactProject && new ReactRefreshPlugin(),
      isTypeScriptProject &&
        new ForkTSCheckerWebpackPlugin({
          logger: {
            infrastructure: 'silent',
            issues: 'silent',
            devServer: false
          }
        })
    ].filter(Boolean) as Configuration['plugins']
  }
}

/**
 * @dependencies ts-loader
 */
export const tsLoader: ({
  isDevelopment
}: {
  isDevelopment?: boolean
}) => Configuration = ({
  isDevelopment = process.env.NODE_ENV !== 'production'
}) => {
  const isReactProject = isTypeScriptReactProject
  return {
    module: {
      rules: [
        {
          test: /\.(mjs|[jt]sx?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              // configFile: isDevelopment ? 'tsconfig.dev.json' : 'tsconfig.json',
              transpileOnly: true, // Set to true if you are using fork-ts-checker-webpack-plugin
              projectReferences: true,
              ...(isDevelopment && {
                getCustomTransformers: () => ({
                  before: [isReactProject && ReactRefreshTypeScript()].filter(
                    Boolean
                  )
                })
              })
            }
          }
        }
      ]
    },
    plugins: [
      isDevelopment && isReactProject && new ReactRefreshPlugin(),
      isTypeScriptProject &&
        new ForkTSCheckerWebpackPlugin({
          logger: {
            infrastructure: 'silent',
            issues: 'silent',
            devServer: false
          }
        })
    ].filter(Boolean) as Configuration['plugins']
  }
}

/**
 * @dependencies @swc/core swc-loader
 */
export const swcLoader: ({
  isDevelopment
}: {
  isDevelopment?: boolean
}) => Configuration = ({
  isDevelopment = process.env.NODE_ENV !== 'production'
}) => {
  const isReactProject = isTypeScriptReactProject
  return {
    module: {
      rules: [
        {
          test: /\.(mjs|[jt]sx?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              env: { mode: 'usage' },
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true
                },
                transform: {
                  react: isReactProject
                    ? {
                        // swc-loader will check whether webpack mode is 'development'
                        // and set this automatically starting from 0.1.13. You could also set it yourself.
                        // swc won't enable fast refresh when development is false
                        runtime: 'automatic',
                        // development: isDevelopment,
                        refresh: isDevelopment
                      }
                    : {}
                }
              }
            }
          }
        }
      ]
    },
    plugins: [
      isDevelopment && isReactProject && new ReactRefreshPlugin(),
      isTypeScriptProject &&
        new ForkTSCheckerWebpackPlugin({
          logger: {
            infrastructure: 'silent',
            issues: 'silent',
            devServer: false
          }
        })
    ].filter(Boolean) as Configuration['plugins']
  }
}

const loaders = { babel: babelLoader, swc: swcLoader, ts: tsLoader }

type Loader = keyof typeof loaders

export type TSLoaderType =
  | 'babel'
  | 'ts'
  | 'swc'
  | 'babel-loader'
  | 'ts-loader'
  | 'swc-loader'

export function getTSLoader({
  type = 'babel',
  isDevelopment = true
}: {
  type?: TSLoaderType
  isDevelopment?: boolean
  isReactProject?: boolean
}): Configuration {
  return loaders[(type.split('-') as string[])[0] as Loader]({
    isDevelopment
  }) as Pick<Configuration, 'module' | 'plugins'>
}

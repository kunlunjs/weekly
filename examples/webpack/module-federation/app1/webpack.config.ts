import path from 'path'
// import ExternalTemplateRemotesPlugin from 'external-remotes-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack'
import webpack from 'webpack'
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
// import { getTSLoader } from '../../loader-for-ts'
// import { getCommonConfig } from '../../webpack.common.config'
// import { getDevServerConfig } from '../../webpack.dev-server.config'

// const loaderForTS = getTSLoader({})

// const commonConfig = getCommonConfig({ name: 'webpack:module-federation:app1' })

const config: Configuration & {
  devServer: WebpackDevServerConfiguration
} = {
  // ...commonConfig,
  devServer: {
    // ...getDevServerConfig(),
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3001
  },
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
    // ...commonConfig.resolve,
    // modules: ['node_modules', path.resolve(__dirname)],
    // plugins: [
    //   new TSConfigPathsPlugin({
    //     logLevel: 'INFO',
    //     // mainFields: ['module', 'main'],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    //   })
    // ]
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript']
        }
      }
      // ...loaderForTS.module.rules
    ]
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
      // shared: { 'react': { singleton: true }, 'react-dom': { singleton: true } }
    }),
    // new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

export default config

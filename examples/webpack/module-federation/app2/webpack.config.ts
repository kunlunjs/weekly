import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack'
import webpack from 'webpack'
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
// import getBabelConfig from '../../babel.config'
// import { getTSLoader } from '../../loader-for-ts'
// import { getCommonConfig } from '../../webpack.common.config'
// import { devServerConfig } from '../../webpack.dev-server.config'

const isDevelopment = process.env.NODE_ENV !== 'production'
// const loaderForTS = getTSLoader({})

// const commonConfig = getCommonConfig({ name: 'webpack:module-federation:app2' })

const config: Configuration & {
  devServer: WebpackDevServerConfiguration
} = {
  // ...commonConfig,
  devServer: {
    // ...devServerConfig,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3002
  },
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto'
  },
  resolve: {
    // ...commonConfig.resolve
    extensions: ['.ts', '.tsx', '.js', '.jsx']
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
      // {
      //   test: /\.[jt]sx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: require.resolve('babel-loader'),
      //     options: {
      //       ...getBabelConfig({ isDevelopment })
      //     }
      //   }
      // }
      // loaderForTS.module.rules[0] as Configuration['module']['rules'][number]
    ]
  },
  plugins: [
    // ...(commonConfig.plugins || []),
    // ...(loaderForTS.plugins || []),
    new webpack.container.ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        // './App': './src/App',
        './Button': './src/Button.tsx'
      },
      shared: ['react', 'react-dom']
      // shared: { 'react': { singleton: true }, 'react-dom': { singleton: true } }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

export default config

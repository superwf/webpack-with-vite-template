import { join } from 'path'

import { DefinePlugin } from 'webpack'
import CopyWebpackPlugin = require('copy-webpack-plugin')
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import { HtmlWebpackInjectExternalsPlugin } from 'html-webpack-inject-externals-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { Configuration } from 'webpack'

import { externals, packages, unpkgHost } from './config/externals'
import { resolveAppRoot } from './script/resolveAppRoot'
import { devServer, proxy } from './config/server'

type NodeEnv = 'production' | 'development'

const NODE_ENV: NodeEnv = (process.env.NODE_ENV as NodeEnv) || 'development'
const isEnvProduction = NODE_ENV === 'production'

const styleLoader = isEnvProduction
  ? MiniCssExtractPlugin.loader
  : {
      loader: 'style-loader',
      options: {
        injectType: 'singletonStyleTag',
      },
    }
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
}
const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
    lessOptions: {
      javascriptEnabled: true,
    },
  },
}

export default async () => {
  const config: Configuration = {
    entry: {
      index: [resolveAppRoot('src/index.tsx')],
    },
    output: {
      filename: 'index.js',
      publicPath: '/',
      path: resolveAppRoot('dist'),
    },
    externals,
    devServer: {
      historyApiFallback: true,
      inline: true,
      hot: true,
      hotOnly: true,
      compress: true,
      clientLogLevel: 'none',
      injectClient: true,
      quiet: false,
      disableHostCheck: true,
      contentBase: './public',
      proxy,
      ...devServer,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: [resolveAppRoot('src')],
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            compact: isEnvProduction,
          },
        },
        {
          test: /\.module\.less$/,
          use: [styleLoader, cssLoader, lessLoader],
          include: [resolveAppRoot('src')],
        },
        {
          test: /\.less$/,
          use: [styleLoader, cssLoader, lessLoader],
          exclude: [/\.module\.less$/],
        },
        {
          test: /\.css$/,
          use: [styleLoader, cssLoader],
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '/images/[hash:8][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '/fonts/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: `"${NODE_ENV}"`,
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
        publicPath: '/',
      }),
      new HtmlWebpackInjectExternalsPlugin({
        host: unpkgHost,
        packages,
      }),
    ],
    devtool: isEnvProduction ? false : 'source-map',
  }

  if (isEnvProduction) {
    config.plugins!.push(
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: './public/static/',
          to: join(__dirname, '/dist'),
        },
      ]),
    )
  } else {
    config.plugins!.push(
      // 检查类型
      new ForkTsCheckerWebpackPlugin({
        tsconfig: resolveAppRoot('tsconfig.json'),
        reportFiles: ['src/**/*.{ts,tsx}'],
        silent: false,
        async: !isEnvProduction,
        useTypescriptIncrementalApi: true,
        // 必须为false，否则不会报类型错误
        checkSyntacticErrors: false,
      }),
      // 热加载
      new ReactRefreshWebpackPlugin({
        // 不让显示overlay，否则一些接口报错太麻烦
        overlay: false,
      }),
    )
  }

  if (process.env.ANALYZE) {
    config.plugins!.push(new BundleAnalyzerPlugin())
  }

  return config
}

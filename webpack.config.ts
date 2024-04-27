import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { resolve as _resolve } from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'

import 'webpack-dev-server'

type Mode = 'production' | 'development'

interface EnvVariables {
  mode: Mode
  port: number
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development'
  const isProd = env.mode === 'production'

  const config: webpack.Configuration = {
    mode: env.mode,
    entry: _resolve(__dirname, 'src', 'main.tsx'),
    output: {
      path: _resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
    },
    devServer: isDev
      ? {
          open: false,
          port: env.port ?? 8080,
          host: 'localhost',
        }
      : undefined,
    devtool: isDev ? 'source-map' : false,
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: _resolve(__dirname, 'public', 'index.html'),
      }),
      isProd ? new MiniCssExtractPlugin() : undefined,

      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env']],
              },
            },
            'ts-loader',
          ],
          exclude: ['/node_modules/'],
        },
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
  }

  return config
}

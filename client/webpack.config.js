const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

// Load .env variables from client/.env
const envFilePath = path.resolve(__dirname, '.env');
const env = dotenv.config({ path: envFilePath }).parsed || {};

// Convert to key-value pairs for DefinePlugin
const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'development',
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys), // 👈 inject env vars into client bundle
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

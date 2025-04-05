const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file (if it exists)
const envFilePath = path.resolve(__dirname, '.env');
const localEnv = dotenv.config({ path: envFilePath }).parsed || {};

// Merge Vercel's injected env (process.env) with local .env
const combinedEnv = {
  ...process.env,     // <-- supports Vercel's injected vars
  ...localEnv         // <-- fallback for local development
};

// Transform to DefinePlugin format
const envKeys = Object.keys(combinedEnv).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(combinedEnv[key]);
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
    new webpack.DefinePlugin(envKeys), // ✅ Inject env vars from both local and Vercel
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

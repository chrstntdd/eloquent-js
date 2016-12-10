var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  entry: {
    ch7: './src/ch7/scripts.js',
    ch10: './src/ch10/problem2/scripts.js'
  },
  output: {
    path: __dirname + '/src/webpack-bundles',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};
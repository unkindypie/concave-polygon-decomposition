const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const distDir = path.resolve(__dirname, './dist');

module.exports = {
  entry: path.resolve(__dirname, './src', 'index.js'),
  mode: 'development',
  output: {
    path: distDir,
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: distDir,
    historyApiFallback: true,
  },
};

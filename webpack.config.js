

var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname); 
var APP_PATH = path.resolve(ROOT_PATH, 'app'); 
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {

  entry: APP_PATH,

  output: {

    path: BUILD_PATH,
    publicPath: '/',
    filename: 'bundle.js'

  },
  module: { 
    loaders: [  
      { 
        test: /\.css$/, 
        loaders: ['style', 'css'], 
        include: APP_PATH 
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },
      { test: /\.jsx?$/, 
        loader: 'babel', 
        include: APP_PATH, 
        query: { 
          presets: ['es2015', 'react'],
        } 
      }
    ] 
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: '0.0.0.0'
  },
}
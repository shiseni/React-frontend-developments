const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
      // your stuff
    filename: 'navigation.js',
    path: path.resolve(__dirname, '../../static/js'),
  },
  module:{
      rules:[
          {
              test:/\.js$/,
              exclude:/node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env','@babel/preset-react']
                }
              }
          }
      ]
  }
};

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  devServer : {
    static: '../',
    open: ['/gallery.html']
  },
  
  entry: './src/index.js',
  output: {
      filename: 'gallery.js',
      path: path.resolve(__dirname, '../../static/js'),
  },
  plugins:[
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: './gallery.html',
         inject: true 
      }),
  ],
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

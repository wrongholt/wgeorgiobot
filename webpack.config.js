/*jshint esversion: 8 */

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  module:{
      rules:[
        {
          test: /\.js$/,
          exclude:/node_modules/,
          use:{
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use:[
            {
            loader: "html-loader",
            options:{minimize:true}
          }
        ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use:[
            'file-loader'
          ]
        },
        {
          test: /\.scss$/,
          use:[
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template:"./src/index.html",
      filename:"./index.html"
    }),
    new MiniCssExtractPlugin({
      filename:"[name].css",
      chunkFilename: "[id].css"
    })
  ],
  entry:'./src/index.js',
  output: {
    filename: 'main.js',
    path:path.resolve(__dirname, `dist`)
  }
};
